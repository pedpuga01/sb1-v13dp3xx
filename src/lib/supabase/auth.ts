import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type Database } from '@/types/database';

export type AuthError = {
  message: string;
  status: number;
};

export async function signIn(email: string, password: string) {
  const supabase = createClientComponentClient<Database>();
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.message || 'Error de autenticación',
        status: error.status || 500
      } as AuthError
    };
  }
}

export async function signOut() {
  const supabase = createClientComponentClient<Database>();
  return await supabase.auth.signOut();
}

export async function resetPassword(email: string) {
  const supabase = createClientComponentClient<Database>();
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });
}

export async function getCurrentUser() {
  const supabase = createClientComponentClient<Database>();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    return { user: null, error };
  }

  return { user: session.user, error: null };
}