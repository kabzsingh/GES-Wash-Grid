import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseAdmin, type Env } from "@/lib/supabase";
import { getRuntimeEnv } from "@/lib/runtime-env";

// Processes queued Pulse forwards (see pulse_forward_queue), completely
// independent of any ESP32's own request/response cycle — this is what
// ingest.ts used to do inline, which was a real mistake: a slow or
// unresponsive Pulse endpoint could delay the response back to a device
// well past its own timeout, which likely caused a watchdog freeze/reboot
// loop on Europcar Jetpark's hardware. Called periodically by GitHub
// Actions (hourly-reports.yml), same pattern as the other scheduled hooks.

const MAX_ATTEMPTS = 5;
const FETCH_TIMEOUT_MS = 10_000;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export const Route = createFileRoute("/api/public/hooks/flush-pulse-queue")({
  server: {
    handlers: {
      POST: async () => {
        const env = getRuntimeEnv() as unknown as Env;
        if (!env?.SUPABASE_URL || !env?.SUPABASE_SERVICE_ROLE_KEY) {
          return json({ error: "Server configuration missing" }, 500);
        }
        const db = getSupabaseAdmin(env);

        const { data: pending, error: fetchErr } = await db
          .from("pulse_forward_queue")
          .select("id, site_id, payload, attempts")
          .eq("status", "pending")
          .lt("attempts", MAX_ATTEMPTS)
          .order("created_at", { ascending: true })
          .limit(100);
        if (fetchErr) return json({ error: fetchErr.message }, 500);
        if (!pending || pending.length === 0) return json({ ok: true, processed: 0 });

        const siteIds = [...new Set(pending.map((p) => p.site_id))];
        const { data: sites, error: sitesErr } = await db
          .from("sites")
          .select("id, pulse_forward_url")
          .in("id", siteIds);
        if (sitesErr) return json({ error: sitesErr.message }, 500);
        const urlBySite = new Map((sites ?? []).map((s) => [s.id, s.pulse_forward_url]));

        let sent = 0, failed = 0;

        for (const item of pending) {
          const pulseUrl = urlBySite.get(item.site_id);
          if (!pulseUrl) {
            // Site no longer has forwarding configured — nothing to do with it.
            await db.from("pulse_forward_queue").update({ status: "failed", last_error: "No pulse_forward_url configured" }).eq("id", item.id);
            failed++;
            continue;
          }

          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
            const res = await fetch(pulseUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(item.payload),
              signal: controller.signal,
            });
            clearTimeout(timeout);

            const ok = res.status >= 200 && res.status < 300;
            if (ok) {
              await db.from("pulse_forward_queue").update({ status: "sent", sent_at: new Date().toISOString() }).eq("id", item.id);
              sent++;
            } else {
              const errText = await res.text().catch(() => "");
              const newAttempts = item.attempts + 1;
              await db.from("pulse_forward_queue").update({
                attempts: newAttempts,
                last_error: `HTTP ${res.status}: ${errText.slice(0, 300)}`,
                status: newAttempts >= MAX_ATTEMPTS ? "failed" : "pending",
              }).eq("id", item.id);
              failed++;
            }
          } catch (e: any) {
            const newAttempts = item.attempts + 1;
            await db.from("pulse_forward_queue").update({
              attempts: newAttempts,
              last_error: e?.message?.slice(0, 300) || String(e),
              status: newAttempts >= MAX_ATTEMPTS ? "failed" : "pending",
            }).eq("id", item.id);
            failed++;
          }
        }

        return json({ ok: true, processed: pending.length, sent, failed });
      },
    },
  },
});
