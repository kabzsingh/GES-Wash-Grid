import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Hardcoded intentionally — see auth-middleware.ts for why (a stale/wrong
// Vercel dashboard environment variable was silently overriding these).
const SUPABASE_URL = "https://ctadjptuulfezdbsklhj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_okBtsH4wEIqaW8eXEywDcg_A6FGTG98";

function createSupabaseClient() {
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    }
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
