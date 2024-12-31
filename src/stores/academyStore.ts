import { create } from 'zustand';
import { supabase } from '../lib/supabase/client';

interface Academy {
  id: string;
  name: string;
  business_type: string;
  status: 'active' | 'trial' | 'inactive';
  subscription_plan?: string;
  configuration: {
    working_days: string[];
    schedule: {
      start: string;
      end: string;
    };
    locations?: {
      id: string;
      name: string;
      address: string;
    }[];
  };
}

interface AcademyStore {
  currentAcademy: Academy | null;
  loading: boolean;
  error: string | null;
  fetchAcademy: (id: string) => Promise<void>;
  updateAcademy: (id: string, data: Partial<Academy>) => Promise<void>;
  addLocation: (academyId: string, location: { name: string; address: string }) => Promise<void>;
  removeLocation: (academyId: string, locationId: string) => Promise<void>;
}

export const useAcademyStore = create<AcademyStore>((set, get) => ({
  currentAcademy: null,
  loading: false,
  error: null,

  fetchAcademy: async (id) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('academies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      set({ currentAcademy: data as Academy, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateAcademy: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('academies')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      // Actualizar estado local
      const currentAcademy = get().currentAcademy;
      if (currentAcademy && currentAcademy.id === id) {
        set({
          currentAcademy: { ...currentAcademy, ...data },
          loading: false
        });
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  addLocation: async (academyId, location) => {
    try {
      set({ loading: true, error: null });
      const currentAcademy = get().currentAcademy;
      if (!currentAcademy) throw new Error('Academia no encontrada');

      const newLocation = {
        id: crypto.randomUUID(),
        ...location
      };

      const updatedLocations = [
        ...(currentAcademy.configuration.locations || []),
        newLocation
      ];

      await get().updateAcademy(academyId, {
        configuration: {
          ...currentAcademy.configuration,
          locations: updatedLocations
        }
      });

    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  removeLocation: async (academyId, locationId) => {
    try {
      set({ loading: true, error: null });
      const currentAcademy = get().currentAcademy;
      if (!currentAcademy) throw new Error('Academia no encontrada');

      const updatedLocations = currentAcademy.configuration.locations?.filter(
        loc => loc.id !== locationId
      ) || [];

      await get().updateAcademy(academyId, {
        configuration: {
          ...currentAcademy.configuration,
          locations: updatedLocations
        }
      });

    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  }
}));