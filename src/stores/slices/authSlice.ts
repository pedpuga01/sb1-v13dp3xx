import { StateCreator } from 'zustand';
import { supabase } from '../../lib/supabase/client';
import { User } from '../../types/models';
import { AuthError } from '../../utils/errors';

export interface AuthSlice {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  loading: false,
  error: null,

  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw new AuthError(error.message);
      set({ user: data.user as User, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error de autenticación', loading: false });
      throw error;
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw new AuthError(error.message);
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al cerrar sesión', loading: false });
      throw error;
    }
  },

  resetPassword: async (email) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw new AuthError(error.message);
      set({ loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al restablecer contraseña', loading: false });
      throw error;
    }
  }
});