import React, { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

// Mock user data
const mockUser = {
  id: '1',
  email: 'admin@ucansing.cl',
  role: 'admin',
  user_metadata: {
    name: 'Admin',
  }
} as User;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Always return mock user
  const value = {
    user: mockUser,
    loading: false,
    error: null,
    signIn: async () => {},
    signOut: async () => {}
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);