import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseAdmin, type Env } from "@/lib/supabase";
import { getRuntimeEnv } from "@/lib/runtime-env";

// Catches anything Pulse sends BELOW the Pulse link (e.g. if it adds a path
// like /readings to the end), which the main link wouldn't match. Nothing is
// processed here; it's only recorded so it can be diagnosed.
async function record({ request, params }: { request: Request; params: { token: string; _splat?: string } }) {
  try {
    const env = getRuntimeEnv() as unknown as Env;
    const db = getSupabaseAdmin(env);
    const headers: Record<string, string> = {};
    request.headers.forEach((v, k) => {
      if (!["cookie", "authorization", "x-site-api-key"].includes(k.toLowerCase())) headers[k] = v;
    });
    const bodyText = request.method === "GET" || request.method === "HEAD" ? "" : await request.text().catch(() => "");
    await db.from("pulse_inbound").insert({
      site_id: null,
      headers: { ...headers, _method: request.method, _key_prefix: (params.token || "").slice(0, 12), _key_length: String((params.token || "").length), _extra_path: params._splat ?? "" },
      body_text: bodyText.slice(0, 20000),
      result: `rejected: extra path after link (/${params._splat ?? ""})`,
    });
  } catch { /* never let logging break the response */ }
  return new Response(JSON.stringify({ ok: false, error: "Send to the link exactly as given, without anything added" }), {
    status: 404, headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/public/pulse/$token/$")({
  server: { handlers: { GET: record, POST: record, PUT: record, PATCH: record } },
});
