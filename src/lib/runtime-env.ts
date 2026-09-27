/**
 * runtime-env.ts
 *
 * Cloudflare Workers does NOT populate process.env at runtime.
 * Instead, env vars arrive as the `env` argument in the fetch handler.
 *
 * server.ts calls setRuntimeEnv(env) on every request so that server
 * functions (createServerFn) can call getRuntimeEnv() to get the live vars.
 *
 * URL and publishable key are hardcoded directly (not read from env at
 * all) — these are meant to be public anyway, and a stale/wrong Vercel
 * dashboard environment variable (e.g. from an auto-connected integration
 * pointing at a different project) was silently overriding them and
 * breaking auth entirely. Only the service role key (genuinely sensitive,
 * can't be hardcoded) still comes from the environment.
 */

import type { Env } from "./supabase";

const SUPABASE_URL = "https://sdgkvuasrzdlhblloafp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_HwkbnBNfmCiiIR8PaVvPiQ_CTVfcBSb";

let _runtimeEnv: Env | null = null;

export function setRuntimeEnv(env: Env) {
  _runtimeEnv = {
    ...env,
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    SUPABASE_SERVICE_ROLE_KEY: env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY || "",
  };
}


export function getRuntimeEnv(): Env {
  if (_runtimeEnv) return _runtimeEnv;

  const svc =
    (typeof process !== "undefined" && (
      process.env?.SUPABASE_SERVICE_ROLE_KEY
    )) ||
    (typeof import.meta !== "undefined" && (
      (import.meta as any).env?.SUPABASE_SERVICE_ROLE_KEY
    )) ||
    "";

  return {
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    SUPABASE_SERVICE_ROLE_KEY: svc,
    NODE_ENV: (typeof process !== "undefined" && process.env?.NODE_ENV) || "production",
  };
}
