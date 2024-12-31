import { useCallback } from 'react';
import { useStore } from '../../../stores/store';
import { useToast } from '../../../hooks/useToast';
import { authService } from '../services/authService';
import type { LoginCredentials } from '../types';

export function useAuth() {
  const store = useStore();
  const toast = useToast();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const { user } = await authService.login(credentials);
      
      // Si el usuario es admin o profesor, cargar su academia
      if (user?.academy_id && ['admin', 'teacher'].includes(user.role)) {
        await store.fetchAcademy(user.academy_id);
      }
      
      toast.success('Inicio de sesión exitoso');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al iniciar sesión');
      throw error;
    }
  }, [store, toast]);

  return {
    user: store.user,
    loading: store.loading,
    error: store.error,
    login,
    logout: store.signOut
  };
}