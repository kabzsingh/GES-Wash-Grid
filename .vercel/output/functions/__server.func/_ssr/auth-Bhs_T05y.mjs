import { c as createServerRpc } from "./createServerRpc-DH6-atDD.mjs";
import { createServerFn, getCookie, setCookie$1, deleteCookie$1 } from "./index.mjs";
import { g as getRuntimeEnv, b as getSupabaseAdmin, a as getSupabase } from "./runtime-env-B3DY4n68.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
function getServerContext() {
  const env = getRuntimeEnv();
  return {
    env,
    supabase: getSupabase(env),
    supabaseAdmin: getSupabaseAdmin(env),
    getCookie,
    setCookie: setCookie$1,
    deleteCookie: deleteCookie$1
  };
}
const TOKEN_COOKIE_NAME = "sb-access-token";
const REFRESH_COOKIE_NAME = "sb-refresh-token";
const getSession_createServerFn_handler = createServerRpc({
  id: "8d7f24c3687ad1408d854b37dc5edf2d3a510b4baf76498b108805ad6fce6f0c",
  name: "getSession",
  filename: "src/lib/auth.ts"
}, (opts) => getSession.__executeServer(opts));
const getSession = createServerFn({
  method: "GET"
}).handler(getSession_createServerFn_handler, async () => {
  const {
    supabase
  } = getServerContext();
  const accessToken = getCookie(TOKEN_COOKIE_NAME);
  const refreshToken = getCookie(REFRESH_COOKIE_NAME);
  if (!accessToken) {
    return {
      session: null
    };
  }
  const {
    data,
    error
  } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken || ""
  });
  if (error || !data.session) {
    return {
      session: null
    };
  }
  return {
    session: data.session
  };
});
const signIn_createServerFn_handler = createServerRpc({
  id: "600f8bfbba8479142f4e053530bf73429a7c4605f126101c81fcfe0af5d16585",
  name: "signIn",
  filename: "src/lib/auth.ts"
}, (opts) => signIn.__executeServer(opts));
const signIn = createServerFn({
  method: "POST"
}).inputValidator((d) => d).handler(signIn_createServerFn_handler, async ({
  data
}) => {
  const isProd = true;
  setCookie$1(TOKEN_COOKIE_NAME, data.accessToken, {
    path: "/",
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7
  });
  if (data.refreshToken) {
    setCookie$1(REFRESH_COOKIE_NAME, data.refreshToken, {
      path: "/",
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30
    });
  }
  return {
    success: true
  };
});
const signOut_createServerFn_handler = createServerRpc({
  id: "2ebab109cf2a30c0cf504179c4ac08c940ffdcf80725116fefa68023748a7a67",
  name: "signOut",
  filename: "src/lib/auth.ts"
}, (opts) => signOut.__executeServer(opts));
const signOut = createServerFn({
  method: "POST"
}).handler(signOut_createServerFn_handler, async () => {
  deleteCookie$1(TOKEN_COOKIE_NAME, {
    path: "/"
  });
  deleteCookie$1(REFRESH_COOKIE_NAME, {
    path: "/"
  });
  return {
    success: true
  };
});
export {
  getSession_createServerFn_handler,
  signIn_createServerFn_handler,
  signOut_createServerFn_handler
};
