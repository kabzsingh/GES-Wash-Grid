function getSupabaseProjectRef() {
  const url = "https://lbrpxdlgloudnywdlzdi.supabase.co";
  const match = url.match(/https:\/\/([^.]+)\.supabase\.co/);
  return match?.[1] ?? null;
}
function getSupabaseDashboardTablesUrl() {
  const ref = getSupabaseProjectRef();
  if (!ref) return null;
  return `https://supabase.com/dashboard/project/${ref}/editor`;
}
export {
  getSupabaseProjectRef as a,
  getSupabaseDashboardTablesUrl as g
};
