'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import type { Academy } from '@/types/models';

interface AcademyContextType {
  academy: Academy | null;
  loading: boolean;
  error: Error | null;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export function AcademyProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [academy, setAcademy] = useState<Academy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadAcademy = async () => {
      if (!user?.academy_id) {
        setLoading(false);
        return;
      }

      try {
        // Cargar academia
        setLoading(true);
        const { data, error } = await supabase
          .from('academies')
          .select('*')
          .eq('id', user.academy_id)
          .single();

        if (error) throw error;
        setAcademy(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadAcademy();
  }, [user?.academy_id]);

  return (
    <AcademyContext.Provider value={{ academy, loading, error }}>
      {children}
    </AcademyContext.Provider>
  );
}

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (context === undefined) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};