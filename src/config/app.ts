export const APP_CONFIG = {
  name: 'Lidia',
  url: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
};