import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseAdmin, type Env } from "@/lib/supabase";
import { getApiKeyByHash, getMetersForSite } from "@/lib/db";
import { getRuntimeEnv } from "@/lib/runtime-env";
import { z } from "zod";

const PayloadSchema = z.object({
  // When the readings were TAKEN, as Unix time in seconds (what the ESP32's
  // NTP-synced clock gives). Lets readings saved on the device during a
  // network outage land at their real time instead of their arrival time.
  ts: z.number().int().positive().optional(),
  readings: z.array(z.object({
    device_key: z.string().min(1).max(64),
    value: z.number().finite(),
    type: z.enum(['total', 'today', 'level', 'event']).default('total').optional(),
    recorded_at: z.string().datetime().optional(),
    ts: z.number().int().positive().optional(),
  })).min(1).max(200),
});

// Readings timestamped further ahead than this are clamped to "now"
// (device clock slightly off), older than MAX_BACKFILL are discarded.
const MAX_FUTURE_MS = 5 * 60 * 1000;
const MAX_BACKFILL_MS = 30 * 24 * 60 * 60 * 1000;
// Cumulative meters: these only ever count up, so going backwards within
// BACKWARDS_WINDOW of a newer reading means it's an old reading re-sent.
const CUMULATIVE_TYPES = new Set(["wash", "fresh_water"]);
const BACKWARDS_WINDOW_MS = 30 * 60 * 1000;

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-site-api-key, authorization",
  };
}

async function sha256(message: string) {
  const msgUint8 = new TextEncoder().encode(message);
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj?.subtle) {
    throw new Error("Web Crypto Subtle API is not available.");
  }
  const hashBuffer = await cryptoObj.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const Route = createFileRoute("/api/public/ingest")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders() }),
      POST: async ({ request }) => {
        const env = getRuntimeEnv() as unknown as Env;

        if (!env?.SUPABASE_URL || !env?.SUPABASE_SERVICE_ROLE_KEY) {
          return json({ error: "Server configuration missing" }, 500);
        }

        const db = getSupabaseAdmin(env);

        const apiKey =
          request.headers.get("x-site-api-key") ||
          request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
        if (!apiKey) return json({ error: "Missing x-site-api-key" }, 401);

        const hash = await sha256(apiKey);

        let keyRow;
        try {
          keyRow = await getApiKeyByHash(db, hash);
        } catch (e: any) {
          if (e.code === 'PGRST116') return json({ error: "Invalid key" }, 401);
          return json({ error: e.message }, 500);
        }

        if (!keyRow || keyRow.revoked) return json({ error: "Invalid key" }, 401);

        let body: unknown;
        try { body = await request.json(); }
        catch { return json({ error: "Invalid JSON" }, 400); }

        const parsed = PayloadSchema.safeParse(body);
        if (!parsed.success) return json({ error: "Invalid payload", issues: parsed.error.flatten() }, 400);

        const meters = await getMetersForSite(db, keyRow.site_id);
        const map = new Map(meters.map((m) => [m.device_key, { id: m.id, type: m.meter_type, sensorType: (m as any).sensor_type }]));
        const siteRow = Array.isArray((keyRow as any).sites) ? (keyRow as any).sites[0] : (keyRow as any).sites;

        // ---- When was each reading taken? ----
        const nowMs = Date.now();
        const nowIso = new Date(nowMs).toISOString();
        const payloadTs = parsed.data.ts;
        let explicitlyTimed = false;
        let stale = 0;
        const timeFor = (r: { recorded_at?: string; ts?: number }): string | null => {
          let ms: number | null = null;
          if (r.recorded_at) ms = Date.parse(r.recorded_at);
          else if (r.ts ?? payloadTs) ms = (r.ts ?? payloadTs)! * 1000;
          if (ms === null || Number.isNaN(ms)) return nowIso;   // no time sent: arrival time
          explicitlyTimed = true;
          if (ms > nowMs + MAX_FUTURE_MS) return nowIso;          // clock ahead: clamp
          if (ms < nowMs - MAX_BACKFILL_MS) return null;          // too old: discard
          return new Date(Math.min(ms, nowMs)).toISOString();
        };
        const timed = parsed.data.readings.map((r) => ({ ...r, at: timeFor(r) }));

        // ---- Safety net for boards that DON'T send a time ----
        // Old firmware sends saved readings with no time, so a backlog (or a
        // board stuck re-sending its whole queue, like Engen Rembrandt on
        // 12 Oct) would be stored at arrival time and wreck daily figures.
        // Drop a time-less send if it arrives too soon after the previous
        // one, or if a running total has gone backwards. Answer 200 so the
        // device treats it as delivered and doesn't keep retrying.
        if (!explicitlyTimed) {
          const pollSec = Number(siteRow?.poll_interval_seconds) || 600;
          const minGapMs = Math.max(5, pollSec * 0.5) * 1000;
          const { data: latest } = await db.rpc("latest_readings_for_site" as any, { p_site_id: keyRow.site_id });
          const latestRows = (latest as any[] | null) ?? [];
          const latestByMeter = new Map(latestRows.map((l) => [l.meter_id, l]));
          const newestMs = latestRows.reduce((mx, l) => Math.max(mx, Date.parse(l.recorded_at)), 0);

          let wentUp = false, wentBack = false;
          for (const r of parsed.data.readings) {
            const info = map.get(r.device_key);
            if (!info || !CUMULATIVE_TYPES.has(info.type)) continue;
            const prev = latestByMeter.get(info.id);
            if (!prev) continue;
            if (r.value > Number(prev.value)) wentUp = true;
            if (r.value < Number(prev.value) && nowMs - Date.parse(prev.recorded_at) < BACKWARDS_WINDOW_MS) wentBack = true;
          }
          let dropReason: string | null = null;
          if (wentBack) dropReason = "running_total_went_backwards";
          // A genuinely new reading in a burst has a higher total, so only
          // treat "too soon" as a re-send when nothing has gone up.
          else if (newestMs && nowMs - newestMs < minGapMs && !wentUp) dropReason = "too_soon_after_previous";
          if (dropReason) {
            await db.from("site_api_keys").update({ last_used_at: nowIso }).eq("key_hash", hash);
            return json({ ok: true, accepted: 0, dropped: dropReason });
          }
        }

        // Separate readings by type
        const readings: any[] = [];
        const chemicalSwitchReadings: any[] = [];
        const chemicalCounterReadings: any[] = [];
        const unknown: string[] = [];

        for (const r of timed) {
          if (r.at === null) { stale++; continue; }
          const meterInfo = map.get(r.device_key);
          if (!meterInfo) { 
            unknown.push(r.device_key); 
            continue; 
          }

          // Chemical meters are routed by their ACTUAL configured sensor_type
          // in Admin, not by the payload's own "type" field — the ESP32
          // firmware sends plain {device_key, value} with no "type" at all
          // (defaults to 'total'), so relying on r.type === 'level' meant
          // real hardware never triggered chemical low-tracking at all.
          //
          // - "switch": a binary 0/1 float-switch signal
          // - "counter": the PLC already maintains a running "washes since
          //   low" count itself (increments while low, resets to 0 on
          //   top-up) — the value IS the count, no reconstruction needed
          // - "probe": continuous liters-remaining reading, stored as a
          //   regular reading like any other meter (not routed here)
          const isSwitchChemical = meterInfo.type === "chemical" && (meterInfo.sensorType === "switch" || meterInfo.sensorType == null);
          const isCounterChemical = meterInfo.type === "chemical" && meterInfo.sensorType === "counter";

          if (r.type === 'level' || isSwitchChemical) {
            chemicalSwitchReadings.push({
              device_key: r.device_key,
              meter_id: meterInfo.id,
              site_id: keyRow.site_id,
              state: Math.round(r.value), // 0 or 1
              recorded_at: r.at,
            });
            // Also record it as a regular reading — the dashboard's simple
            // "latest value >= 1 means low" check reads from the readings
            // table directly, so this needs to land there too, not just
            // feed the separate low-event-tracking system above.
            readings.push({
              site_id: keyRow.site_id,
              meter_id: meterInfo.id,
              value: r.value,
              reading_type: 'total',
              recorded_at: r.at,
            });
            continue;
          }

          if (isCounterChemical) {
            chemicalCounterReadings.push({
              meter_id: meterInfo.id,
              site_id: keyRow.site_id,
              counter: Math.round(r.value),
              recorded_at: r.at,
            });
            readings.push({
              site_id: keyRow.site_id,
              meter_id: meterInfo.id,
              value: r.value,
              reading_type: 'total',
              recorded_at: r.at,
            });
            continue;
          }

          // Regular reading (total, today, event)
          if (r.type !== 'event') {
            readings.push({
              site_id: keyRow.site_id,
              meter_id: meterInfo.id,
              value: r.value,
              reading_type: r.type || 'total',
              recorded_at: r.at,
            });
          }
        }

        if (readings.length === 0 && chemicalSwitchReadings.length === 0 && chemicalCounterReadings.length === 0) {
          if (stale > 0) return json({ ok: true, accepted: 0, stale });
          return json({ error: "No matching meters", unknown }, 400);
        }

        // Insert regular readings
        if (readings.length > 0) {
          // Same meter + same time = already stored (a timed backlog re-sent).
          const { error: insErr } = await db.from("readings")
            .upsert(readings, { onConflict: "meter_id,recorded_at", ignoreDuplicates: true });
          if (insErr) return json({ error: insErr.message }, 500);
        }

        // Process chemical state changes and track low events
        let chemicalEvents = 0;
        for (const chem of chemicalSwitchReadings) {
          // Find the wash meter for this site to get current wash count
          const washMeter = meters.find((m) => m.meter_type === "wash");
          
          try {
            const { data } = await db.rpc('handle_chemical_state_change', {
              p_site_id: chem.site_id,
              p_meter_id: chem.meter_id,
              p_new_state: chem.state,
              p_wash_meter_id: washMeter?.id || null,
              p_now: chem.recorded_at,
            });
            if (data?.event !== 'no_change') chemicalEvents++;
          } catch (e) {
            console.error(`Failed to handle chemical state for meter ${chem.meter_id}:`, e);
          }
        }

        for (const chem of chemicalCounterReadings) {
          try {
            const { data } = await db.rpc('handle_chemical_counter_change', {
              p_site_id: chem.site_id,
              p_meter_id: chem.meter_id,
              p_counter_value: chem.counter,
              p_now: chem.recorded_at,
            });
            if (data?.event !== 'no_change') chemicalEvents++;
          } catch (e) {
            console.error(`Failed to handle chemical counter for meter ${chem.meter_id}:`, e);
          }
        }

        await db.from("site_api_keys")
          .update({ last_used_at: new Date().toISOString() })
          .eq("key_hash", hash);

        // Optional server-to-server forward to a third-party system (Pulse),
        // configured per-site via sites.pulse_forward_url. The device itself
        // never knows about this — it only ever talks to this one endpoint,
        // exactly as before.
        //
        // IMPORTANT: this used to await the actual forward inline, which was
        // a real mistake — a slow or unresponsive Pulse endpoint could delay
        // OUR response to the ESP32 well past its own 8-second timeout,
        // which likely caused the watchdog freeze/reboot loop seen on
        // Europcar Jetpark's device. A third party's reliability must never
        // be able to affect the actual equipment data pipeline.
        //
        // Now this just queues the payload (a fast, local insert) and
        // responds to the device immediately. A separate process
        // (flush-pulse-queue, called by GitHub Actions) does the actual
        // sending to Pulse on its own schedule, completely decoupled from
        // any ESP32's request.
        const pulseUrl = siteRow?.pulse_forward_url as string | null | undefined;
        if (pulseUrl) {
          // Wrapped: this insert must NEVER be able to affect the response
          // below. The readings themselves are already safely saved by
          // this point — a problem queuing a Pulse forward is a reason to
          // log and move on, not a reason to fail the whole request back
          // to a physical device that has nothing to do with Pulse at all.
          try {
            await db.from("pulse_forward_queue").insert({
              site_id: keyRow.site_id,
              // Same format Pulse has always received: device_key + value
              // only. The new "ts" fields are left out until Werner confirms
              // Pulse accepts them, so nothing changes on his side.
              payload: { readings: parsed.data.readings.map(({ device_key, value }) => ({ device_key, value })) },
            });
          } catch (e: any) {
            console.error(`Failed to queue Pulse forward for site ${keyRow.site_id}:`, e?.message || e);
          }
        }

        return json({ 
          ok: true, 
          accepted: readings.length,
          stale, 
          chemical_events: chemicalEvents,
          unknown 
        });
      },
    },
  },
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}
