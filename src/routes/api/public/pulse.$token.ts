import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseAdmin, type Env } from "@/lib/supabase";
import { getApiKeyByHash } from "@/lib/db";
import { getRuntimeEnv } from "@/lib/runtime-env";

// Link for Werner's Pulse to send readings in ("Forward to Washgrid" in
// Pulse). Pulse takes a single link, so the site's API key is part of the
// URL: /api/public/pulse/<api key>. Only keys marked forward_to_pulse = false
// (issued to Pulse) are accepted here, so data sent in is never sent back.
//
// Every request is saved as received in pulse_inbound, so Pulse's real
// format and signature can be checked. If the body is already in the
// dashboard's own format ({ ts?, readings: [{ device_key, value }] }), it is
// passed straight to the normal ingest. Anything else is stored and answered
// with 200, so Pulse doesn't keep retrying while the mapping is set up.

async function sha256(message: string) {
  const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(message));
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

async function keyFor(db: any, token: string) {
  if (!token || token.length > 128) return null;
  try {
    const row: any = await getApiKeyByHash(db, await sha256(token));
    if (!row || row.revoked || row.forward_to_pulse !== false) return null;
    return row;
  } catch {
    return null;
  }
}

// Records an attempt that wasn't accepted (wrong/revoked key, unexpected
// method), so a misconfigured Pulse link can be diagnosed. Only the first 12
// characters of the key are kept.
async function logRejected(db: any, request: Request, token: string, reason: string) {
  try {
    const headers: Record<string, string> = {};
    request.headers.forEach((v, k) => {
      if (!["cookie", "authorization", "x-site-api-key"].includes(k.toLowerCase())) headers[k] = v;
    });
    const bodyText = request.method === "GET" || request.method === "HEAD" ? "" : await request.text().catch(() => "");
    await db.from("pulse_inbound").insert({
      site_id: null,
      headers: { ...headers, _method: request.method, _key_prefix: (token || "").slice(0, 12), _key_length: String((token || "").length) },
      body_text: bodyText.slice(0, 20000),
      result: `rejected: ${reason}`,
    });
  } catch { /* never let logging break the response */ }
}

async function rejectOther({ request, params }: { request: Request; params: { token: string } }) {
  const env = getRuntimeEnv() as unknown as Env;
  await logRejected(getSupabaseAdmin(env), request, params.token, `method ${request.method} not supported`);
  return json({ ok: false, error: "Use POST" }, 405);
}

export const Route = createFileRoute("/api/public/pulse/$token")({
  server: {
    handlers: {
      // Lets the link be checked from a browser: shows which site it's for.
      GET: async ({ params }: { params: { token: string } }) => {
        const env = getRuntimeEnv() as unknown as Env;
        const db = getSupabaseAdmin(env);
        const row = await keyFor(db, params.token);
        if (!row) return json({ ok: false, error: "Invalid or revoked link" }, 401);
        const site = Array.isArray(row.sites) ? row.sites[0] : row.sites;
        return json({ ok: true, site: site?.name ?? null, accepts: "POST" });
      },

      PUT: rejectOther,
      PATCH: rejectOther,
      POST: async ({ request, params }: { request: Request; params: { token: string } }) => {
        const env = getRuntimeEnv() as unknown as Env;
        if (!env?.SUPABASE_URL || !env?.SUPABASE_SERVICE_ROLE_KEY) {
          return json({ error: "Server configuration missing" }, 500);
        }
        const db = getSupabaseAdmin(env);
        const row = await keyFor(db, params.token);
        if (!row) {
          await logRejected(db, request, params.token, "invalid or revoked key");
          return json({ ok: false, error: "Invalid or revoked link" }, 401);
        }

        const bodyText = await request.text();
        let bodyJson: any = null;
        try { bodyJson = JSON.parse(bodyText); } catch { /* not JSON: stored as text */ }

        const headers: Record<string, string> = {};
        request.headers.forEach((v, k) => {
          if (!["cookie", "authorization", "x-site-api-key"].includes(k.toLowerCase())) headers[k] = v;
        });

        const { data: saved } = await db.from("pulse_inbound").insert({
          site_id: row.site_id,
          headers,
          body_text: bodyText.slice(0, 100000),
          body_json: bodyJson,
        }).select("id").single();

        // Already in the dashboard's own format? Pass it to the normal ingest.
        if (bodyJson && Array.isArray(bodyJson.readings)) {
          const res = await fetch(new URL("/api/public/ingest", request.url), {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-site-api-key": params.token },
            body: bodyText,
          });
          const resultText = await res.text().catch(() => "");
          if (saved?.id) {
            await db.from("pulse_inbound").update({ processed: res.ok, result: `${res.status} ${resultText.slice(0, 500)}` }).eq("id", saved.id);
          }
          return json({ ok: res.ok, stored: true, processed: res.ok }, res.ok ? 200 : 202);
        }

        if (saved?.id) {
          await db.from("pulse_inbound").update({ result: "stored; format not mapped yet" }).eq("id", saved.id);
        }
        await db.from("site_api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", row.id);
        return json({ ok: true, stored: true, processed: false });
      },
    },
  },
});
