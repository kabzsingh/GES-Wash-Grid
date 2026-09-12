import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
function anonKey(env) {
  return env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY;
}
function serviceKey(env) {
  return env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_KEY;
}
function getSupabase(env) {
  return createClient(env.SUPABASE_URL, anonKey(env), {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
function getSupabaseAdmin(env) {
  return createClient(env.SUPABASE_URL, serviceKey(env), {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}
const __vite_import_meta_env__ = {};
function getRuntimeEnv() {
  const url = typeof process !== "undefined" && (process.env?.SUPABASE_URL || process.env?.VITE_SUPABASE_URL) || typeof import.meta !== "undefined" && (__vite_import_meta_env__?.SUPABASE_URL || "https://lbrpxdlgloudnywdlzdi.supabase.co") || "https://lbrpxdlgloudnywdlzdi.supabase.co";
  const pub = typeof process !== "undefined" && (process.env?.SUPABASE_PUBLISHABLE_KEY || process.env?.VITE_SUPABASE_PUBLISHABLE_KEY) || typeof import.meta !== "undefined" && (__vite_import_meta_env__?.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_DCDr5jYe_QxV6Rdglz0JcQ_YAQ2D7M9") || "sb_publishable_DCDr5jYe_QxV6Rdglz0JcQ_YAQ2D7M9";
  const svc = typeof process !== "undefined" && process.env?.SUPABASE_SERVICE_ROLE_KEY || typeof import.meta !== "undefined" && __vite_import_meta_env__?.SUPABASE_SERVICE_ROLE_KEY || "";
  return {
    SUPABASE_URL: url,
    SUPABASE_PUBLISHABLE_KEY: pub,
    SUPABASE_SERVICE_ROLE_KEY: svc,
    NODE_ENV: typeof process !== "undefined" && "production" || "production"
  };
}
export {
  getSupabase as a,
  getSupabaseAdmin as b,
  getRuntimeEnv as g
};
