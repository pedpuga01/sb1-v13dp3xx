import { createClient } from '@supabase/supabase-js';
import { APP_CONFIG } from '../config/app';

if (!APP_CONFIG.supabaseUrl || !APP_CONFIG.supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase');
}

export const supabase = createClient(APP_CONFIG.supabaseUrl, APP_CONFIG.supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: window.localStorage
  },
  global: {
    headers: {
      'x-application-name': APP_CONFIG.name
    }
  }
});