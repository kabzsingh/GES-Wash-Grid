import { createMiddleware } from '@tanstack/react-start'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const FALLBACK_URL = "https://lbrpxdlgloudnywdlzdi.supabase.co";
const FALLBACK_KEY = "sb_publishable_DCDr5jYe_QxV6Rdglz0JcQ_YAQ2D7M9";

export const requireSupabaseAuth = createMiddleware({ type: 'function' }).server(
  async ({ next, data }) => {
    const SUPABASE_URL = (typeof process !== 'undefined' && (process.env?.SUPABASE_URL || process.env?.VITE_SUPABASE_URL)) || FALLBACK_URL;
    const SUPABASE_PUBLISHABLE_KEY = (typeof process !== 'undefined' && (process.env?.SUPABASE_PUBLISHABLE_KEY || process.env?.SUPABASE_ANON_KEY || process.env?.VITE_SUPABASE_PUBLISHABLE_KEY)) || FALLBACK_KEY;
    const token = (data as any)?.__token as string | undefined;
    if (!token) throw new Error('This endpoint requires a valid Bearer token');
    const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    });
    // getUser() calls Supabase Auth's /user endpoint directly with the given
    // token — more universally compatible than getClaims(), which verifies
    // JWTs via the project's configured signing-key setup and can behave
    // differently across projects depending on that configuration.
    const { data: userData, error } = await supabase.auth.getUser(token);
    if (error || !userData?.user) throw new Error('Unauthorized: Invalid or expired session');
    return next({ context: { supabase, userId: userData.user.id, claims: userData.user } });
  },
);
