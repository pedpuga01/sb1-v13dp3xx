import { StateCreator } from 'zustand';
import { Class } from '../../types/models';
import { classService } from '../../services/classes';
import { AppError } from '../../utils/errors';

export interface ClassState {
  classes: Class[];
  selectedClass: Class | null;
  loading: boolean;
  error: string | null;
}

export interface ClassActions {
  fetchClasses: (academyId: string) => Promise<void>;
  fetchTeacherClasses: (teacherId: string) => Promise<void>;
  selectClass: (id: string) => void;
  addClass: (classData: Omit<Class, 'id'>) => Promise<void>;
  updateClass: (id: string, data: Partial<Class>) => Promise<void>;
}

export type ClassSlice = ClassState & ClassActions;

export const createClassSlice: StateCreator<ClassSlice> = (set, get) => ({
  classes: [],
  selectedClass: null,
  loading: false,
  error: null,

  fetchClasses: async (academyId) => {
    try {
      set({ loading: true, error: null });
      const classes = await classService.getByAcademy(academyId);
      set({ classes, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al cargar clases', loading: false });
      throw error;
    }
  },

  fetchTeacherClasses: async (teacherId) => {
    try {
      set({ loading: true, error: null });
      const classes = await classService.getByTeacher(teacherId);
      set({ classes, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al cargar clases del profesor', loading: false });
      throw error;
    }
  },

  selectClass: (id) => {
    const selectedClass = get().classes.find(c => c.id === id) || null;
    set({ selectedClass });
  },

  addClass: async (classData) => {
    try {
      set({ loading: true, error: null });
      const newClass = await classService.create(classData);
      set(state => ({
        classes: [...state.classes, newClass],
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al crear clase', loading: false });
      throw error;
    }
  },

  updateClass: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const updatedClass = await classService.update(id, data);
      set(state => ({
        classes: state.classes.map(c => c.id === id ? updatedClass : c),
        selectedClass: state.selectedClass?.id === id ? updatedClass : state.selectedClass,
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al actualizar clase', loading: false });
      throw error;
    }
  }
});