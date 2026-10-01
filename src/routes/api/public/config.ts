import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseAdmin, type Env } from "@/lib/supabase";
import { getApiKeyByHash } from "@/lib/db";
import { getRuntimeEnv } from "@/lib/runtime-env";

// Lets an ESP32 check in periodically and pull its current settings,
// instead of every setting (poll interval, etc.) being permanently baked
// into the sketch at flash time. A device calls this with its existing
// API key; changes made in Admin take effect on the device's next
// check-in, with no reflash needed.

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
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

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

export const Route = createFileRoute("/api/public/config")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders() }),
      GET: async ({ request }) => {
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

        if (keyRow.revoked) return json({ error: "Key revoked" }, 401);

        // keyRow.sites comes back as an array, not a single object (same
        // isOneToOne: false quirk as in ingest.ts) — without this fix,
        // site.poll_interval_seconds was always undefined, meaning this
        // whole remote config check-in silently never worked at all.
        const site = Array.isArray((keyRow as any).sites) ? (keyRow as any).sites[0] : (keyRow as any).sites;
        if (!site) return json({ error: "Site not found" }, 404);

        return json({
          poll_interval_seconds: site.poll_interval_seconds ?? 15,
          site_name: site.name,
        });
      },
    },
  },
});
