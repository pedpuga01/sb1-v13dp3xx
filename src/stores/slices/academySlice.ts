import { StateCreator } from 'zustand';
import { Academy } from '../../types/models';
import { supabase } from '../../lib/supabase/client';
import { AppError } from '../../utils/errors';

export interface AcademySlice {
  currentAcademy: Academy | null;
  loading: boolean;
  error: string | null;
  fetchAcademy: (id: string) => Promise<void>;
  updateAcademy: (id: string, data: Partial<Academy>) => Promise<void>;
}

export const createAcademySlice: StateCreator<AcademySlice> = (set) => ({
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

      if (error) throw new AppError(error.message, 'FETCH_ERROR');
      set({ currentAcademy: data as Academy, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al cargar academia', loading: false });
      throw error;
    }
  },

  updateAcademy: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('academies')
        .update(data)
        .eq('id', id);

      if (error) throw new AppError(error.message, 'UPDATE_ERROR');
      
      set(state => ({
        currentAcademy: state.currentAcademy && {
          ...state.currentAcademy,
          ...data
        },
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al actualizar academia', loading: false });
      throw error;
    }
  }
});