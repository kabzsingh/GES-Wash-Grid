import { c as createServerRpc } from "./createServerRpc-DH6-atDD.mjs";
import { createServerFn } from "./index.mjs";
import { r as requireSupabaseAuth, c as createApiKey, e as getSmtpSettings$1, u as upsertSmtpSettings, b as createSite, a as createMeter, f as getUserRole } from "./db-BkCXe06b.mjs";
import { g as getRuntimeEnv, b as getSupabaseAdmin } from "./runtime-env-B3DY4n68.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, e as enumType, n as numberType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
async function assertAdmin(supabase, userId) {
  const {
    data,
    error
  } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (error) throw new Error(error.message || "Admin check failed");
  if (!data) throw new Response("Forbidden", {
    status: 403
  });
}
async function sha256(message) {
  const msgUint8 = new TextEncoder().encode(message);
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj?.subtle) {
    throw new Error("Web Crypto Subtle API is not available.");
  }
  const hashBuffer = await cryptoObj.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function bootstrapViaRpc(supabase) {
  try {
    const {
      data,
      error
    } = await supabase.rpc("bootstrap_first_admin");
    if (error) throw error;
    const row = data;
    return {
      granted: row?.granted ?? false,
      isAdmin: row?.is_admin ?? false
    };
  } catch (e) {
    console.warn("[Bootstrap] RPC method failed, might not be installed:", e.message);
    return {
      granted: false,
      isAdmin: false
    };
  }
}
async function bootstrapViaServiceRole(env, userId) {
  const dbAdmin = getSupabaseAdmin(env);
  const {
    count,
    error: cErr
  } = await dbAdmin.from("user_roles").select("*", {
    count: "exact",
    head: true
  }).eq("role", "admin");
  if (cErr) throw new Error("Database error while checking admins: " + cErr.message);
  if ((count ?? 0) > 0) {
    const roleRow = await getUserRole(dbAdmin, userId);
    return {
      granted: false,
      isAdmin: roleRow?.role === "admin"
    };
  }
  const {
    error
  } = await dbAdmin.from("user_roles").insert({
    user_id: userId,
    role: "admin"
  });
  if (error) throw new Error("Failed to grant admin role: " + error.message);
  return {
    granted: true,
    isAdmin: true
  };
}
const createSiteApiKey_createServerFn_handler = createServerRpc({
  id: "7792bc1832e99c5c6a6fb3ca01d4a437b85dfb099009847db3e135dca20eba87",
  name: "createSiteApiKey",
  filename: "src/lib/admin.functions.ts"
}, (opts) => createSiteApiKey.__executeServer(opts));
const createSiteApiKey = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  siteId: stringType(),
  label: stringType().max(60).optional()
}).parse(data)).handler(createSiteApiKey_createServerFn_handler, async ({
  data,
  context
}) => {
  const parsed = data;
  await assertAdmin(context.supabase, context.userId);
  const {
    siteId,
    label
  } = parsed;
  const bytes = new Uint8Array(24);
  globalThis.crypto.getRandomValues(bytes);
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  const raw = "ws_live_" + hex;
  const hash = await sha256(raw);
  const prefix = raw.slice(0, 12);
  await createApiKey(context.supabase, {
    site_id: siteId,
    key_hash: hash,
    key_prefix: prefix,
    label: label || "ESP32"
  });
  return {
    apiKey: raw,
    prefix
  };
});
const getSmtpSettings_createServerFn_handler = createServerRpc({
  id: "1ad5a0235a6b4641d679f8746acd98d84616d2ec66833663d1c4fb85ce7de5e9",
  name: "getSmtpSettings",
  filename: "src/lib/admin.functions.ts"
}, (opts) => getSmtpSettings.__executeServer(opts));
const getSmtpSettings = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getSmtpSettings_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  return await getSmtpSettings$1(context.supabase);
});
const updateSmtpSettings_createServerFn_handler = createServerRpc({
  id: "40bd0446e1a9930ad03c98862e1f9c5f4e6af7d52ae33a4622175ae593ac3c35",
  name: "updateSmtpSettings",
  filename: "src/lib/admin.functions.ts"
}, (opts) => updateSmtpSettings.__executeServer(opts));
const updateSmtpSettings = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  host: stringType(),
  port: numberType(),
  user_email: stringType().email(),
  password: stringType(),
  from_name: stringType(),
  from_email: stringType().email(),
  encryption: enumType(["tls", "ssl", "none"])
}).parse(data)).handler(updateSmtpSettings_createServerFn_handler, async ({
  data,
  context
}) => {
  const parsed = data;
  await assertAdmin(context.supabase, context.userId);
  await upsertSmtpSettings(context.supabase, {
    ...parsed,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  });
  return {
    ok: true
  };
});
const grantAdminBootstrap_createServerFn_handler = createServerRpc({
  id: "7bebfef9be062a84fde06bb909efd22ef3af6d7a0f787c8ea15abccdae412ddf",
  name: "grantAdminBootstrap",
  filename: "src/lib/admin.functions.ts"
}, (opts) => grantAdminBootstrap.__executeServer(opts));
const grantAdminBootstrap = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => data).handler(grantAdminBootstrap_createServerFn_handler, async ({
  context
}) => {
  const env = getRuntimeEnv();
  try {
    return await bootstrapViaServiceRole(env, context.userId);
  } catch (svcErr) {
    console.warn("[Admin] Service role bootstrap failed, trying RPC:", svcErr.message);
    return await bootstrapViaRpc(context.supabase);
  }
});
const seedDemoData_createServerFn_handler = createServerRpc({
  id: "07cc230b8ff3fc4fb98b2ea4e3e53b03835cdf7028f66357d34608903a02b98f",
  name: "seedDemoData",
  filename: "src/lib/admin.functions.ts"
}, (opts) => seedDemoData.__executeServer(opts));
const seedDemoData = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(seedDemoData_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  const {
    data: existing
  } = await context.supabase.from("sites").select("id").limit(1);
  if (existing && existing.length > 0) return {
    seeded: false
  };
  const sitesToCreate = [{
    name: "North Bay Wash",
    location: "Manchester, UK"
  }, {
    name: "Riverside Auto",
    location: "Bristol, UK"
  }];
  for (const s of sitesToCreate) {
    const site = await createSite(context.supabase, s);
    if (site) {
      await context.supabase.from("user_access").insert({
        user_id: context.userId,
        site_id: site.id
      });
    }
    const meters = [{
      meter_type: "wash",
      name: "Wash bay",
      unit: "count",
      device_key: "wash",
      position: 0,
      capacity: null,
      low_threshold: null
    }, {
      meter_type: "chemical",
      name: "Soap",
      unit: "L",
      device_key: "chem1",
      position: 2,
      capacity: 200,
      low_threshold: 40
    }];
    for (const m of meters) {
      await createMeter(context.supabase, {
        ...m,
        site_id: site.id
      });
    }
  }
  return {
    seeded: true
  };
});
const listAllUsers_createServerFn_handler = createServerRpc({
  id: "b3ef54427b9b6abe19b4e7fee6274e09e2e5a3e2f0432f352a6e602ed202cfc3",
  name: "listAllUsers",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listAllUsers.__executeServer(opts));
const listAllUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((data) => data).handler(listAllUsers_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  const env = getRuntimeEnv();
  const admin = getSupabaseAdmin(env);
  const {
    data: authList,
    error: aErr
  } = await admin.auth.admin.listUsers({
    perPage: 200
  });
  if (aErr) throw new Error(aErr.message);
  const {
    data: roles
  } = await admin.from("user_roles").select("user_id, role");
  const rolesByUser = /* @__PURE__ */ new Map();
  (roles ?? []).forEach((r) => {
    const arr = rolesByUser.get(r.user_id) ?? [];
    arr.push(r.role);
    rolesByUser.set(r.user_id, arr);
  });
  return authList.users.map((u) => ({
    id: u.id,
    email: u.email ?? "",
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at ?? null,
    roles: rolesByUser.get(u.id) ?? []
  }));
});
const setUserRole_createServerFn_handler = createServerRpc({
  id: "db980dd7fbef43d3fc13d10ddc5f8ed5aae0f52362aa36d741670b7c62aab77f",
  name: "setUserRole",
  filename: "src/lib/admin.functions.ts"
}, (opts) => setUserRole.__executeServer(opts));
const setUserRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  userId: stringType().uuid(),
  role: enumType(["admin", "operator", "none"])
}).parse(data)).handler(setUserRole_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  const env = getRuntimeEnv();
  const admin = getSupabaseAdmin(env);
  const {
    error: delErr
  } = await admin.from("user_roles").delete().eq("user_id", data.userId);
  if (delErr) throw new Error(delErr.message);
  if (data.role !== "none") {
    const {
      error: insErr
    } = await admin.from("user_roles").insert({
      user_id: data.userId,
      role: data.role
    });
    if (insErr) throw new Error(insErr.message);
  }
  return {
    ok: true
  };
});
const deleteUser_createServerFn_handler = createServerRpc({
  id: "5f15d9c6194c3264109b1c81741c60a8654b66a5caffc1ee319315a3a983394e",
  name: "deleteUser",
  filename: "src/lib/admin.functions.ts"
}, (opts) => deleteUser.__executeServer(opts));
const deleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => objectType({
  userId: stringType().uuid()
}).parse(data)).handler(deleteUser_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  if (data.userId === context.userId) {
    throw new Error("You cannot delete your own account");
  }
  const env = getRuntimeEnv();
  const admin = getSupabaseAdmin(env);
  const {
    error
  } = await admin.auth.admin.deleteUser(data.userId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  createSiteApiKey_createServerFn_handler,
  deleteUser_createServerFn_handler,
  getSmtpSettings_createServerFn_handler,
  grantAdminBootstrap_createServerFn_handler,
  listAllUsers_createServerFn_handler,
  seedDemoData_createServerFn_handler,
  setUserRole_createServerFn_handler,
  updateSmtpSettings_createServerFn_handler
};
