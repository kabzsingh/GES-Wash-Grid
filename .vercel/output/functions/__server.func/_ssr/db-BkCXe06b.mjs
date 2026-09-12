import { createMiddleware } from "./index.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const FALLBACK_URL = "https://lbrpxdlgloudnywdlzdi.supabase.co";
const FALLBACK_KEY = "sb_publishable_DCDr5jYe_QxV6Rdglz0JcQ_YAQ2D7M9";
const requireSupabaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next, data }) => {
    const SUPABASE_URL = typeof process !== "undefined" && (process.env?.SUPABASE_URL || process.env?.VITE_SUPABASE_URL) || FALLBACK_URL;
    const SUPABASE_PUBLISHABLE_KEY = typeof process !== "undefined" && (process.env?.SUPABASE_PUBLISHABLE_KEY || process.env?.SUPABASE_ANON_KEY || process.env?.VITE_SUPABASE_PUBLISHABLE_KEY) || FALLBACK_KEY;
    const token = data?.__token;
    if (!token) throw new Error("This endpoint requires a valid Bearer token");
    const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { storage: void 0, persistSession: false, autoRefreshToken: false }
    });
    const { data: claimsData, error } = await supabase.auth.getClaims(token);
    if (error || !claimsData?.claims) throw new Error("Unauthorized: Invalid or expired session");
    if (!claimsData.claims.sub) throw new Error("Unauthorized: No user ID in token");
    return next({ context: { supabase, userId: claimsData.claims.sub, claims: claimsData.claims } });
  }
);
async function getUserRole(db, userId) {
  const { data, error } = await db.from("user_roles").select("*").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data;
}
async function createSite(db, site) {
  const { data, error } = await db.from("sites").insert(site).select().single();
  if (error) throw error;
  return data;
}
async function getMetersForSite(db, siteId) {
  const { data, error } = await db.from("site_meters").select("*").eq("site_id", siteId).order("position");
  if (error) throw error;
  return data;
}
async function createMeter(db, meter) {
  const { data, error } = await db.from("site_meters").insert(meter).select().single();
  if (error) throw error;
  return data;
}
async function getApiKeyByHash(db, hash) {
  const { data, error } = await db.from("site_api_keys").select("*, sites(*)").eq("key_hash", hash).single();
  if (error) throw error;
  return data;
}
async function createApiKey(db, entry) {
  const { data, error } = await db.from("site_api_keys").insert(entry).select().single();
  if (error) throw error;
  return data;
}
async function getSmtpSettings(db) {
  const { data, error } = await db.from("smtp_settings").select("*").eq("id", true).maybeSingle();
  if (error) throw error;
  return data;
}
async function upsertSmtpSettings(db, settings) {
  const { data, error } = await db.from("smtp_settings").upsert({ ...settings, id: true }).select().single();
  if (error) throw error;
  return data;
}
export {
  createMeter as a,
  createSite as b,
  createApiKey as c,
  getMetersForSite as d,
  getSmtpSettings as e,
  getUserRole as f,
  getApiKeyByHash as g,
  requireSupabaseAuth as r,
  upsertSmtpSettings as u
};
