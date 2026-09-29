import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseAdmin, type Env } from "@/lib/supabase";
import { getRuntimeEnv } from "@/lib/runtime-env";

// Deletes archived report files older than REPORT_RETENTION_DAYS from
// Supabase Storage. This is separate from the readings cleanup (which runs
// as a pg_cron job directly in Postgres) because Storage files need the
// actual storage API to delete properly — deleting rows from the
// storage.objects table directly isn't a reliable way to remove the
// underlying file. Triggered daily by the same GitHub Actions workflow
// that already runs hourly report checks (see hourly-reports.yml).

const REPORT_RETENTION_DAYS = 90;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

export const Route = createFileRoute("/api/public/hooks/cleanup-reports")({
  server: {
    handlers: {
      POST: async () => {
        const env = getRuntimeEnv() as unknown as Env;
        if (!env?.SUPABASE_URL || !env?.SUPABASE_SERVICE_ROLE_KEY) {
          return json({ error: "Server configuration missing" }, 500);
        }
        const db = getSupabaseAdmin(env);

        const { data: sites, error: sitesErr } = await db.from("sites").select("id");
        if (sitesErr) return json({ error: sitesErr.message }, 500);

        const cutoff = Date.now() - REPORT_RETENTION_DAYS * 24 * 60 * 60 * 1000;
        let deleted = 0;
        const errors: string[] = [];

        for (const site of sites ?? []) {
          const { data: files, error: listErr } = await db.storage.from("reports").list(site.id);
          if (listErr) {
            errors.push(`${site.id}: ${listErr.message}`);
            continue;
          }
          const toDelete = (files ?? [])
            .filter((f) => f.created_at && new Date(f.created_at).getTime() < cutoff)
            .map((f) => `${site.id}/${f.name}`);

          if (toDelete.length > 0) {
            const { error: removeErr } = await db.storage.from("reports").remove(toDelete);
            if (removeErr) {
              errors.push(`${site.id}: ${removeErr.message}`);
            } else {
              deleted += toDelete.length;
            }
          }
        }

        return json({ ok: true, deleted, errors });
      },
    },
  },
});
