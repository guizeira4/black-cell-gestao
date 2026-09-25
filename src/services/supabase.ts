/**
 * Remote persistence configuration point.
 * For a shared production database, install @supabase/supabase-js and replace
 * the localStorage operations in main.tsx with this client after setting the
 * two public variables in Vercel. Keep server keys out of the frontend.
 */
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined,
}
export const isRemoteDatabaseConfigured = Boolean(supabaseConfig.url && supabaseConfig.anonKey)
