import { create } from 'zustand';
import { supabase } from '../lib/supabase/client';

export interface Student {
  id: string;
  user_id: string;
  academy_id: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

interface StudentState {
  students: Student[];
  loading: boolean;
  error: string | null;
  fetchStudents: (academyId: string) => Promise<void>;
  addStudent: (data: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateStudent: (id: string, data: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  students: [],
  loading: false,
  error: null,

  fetchStudents: async (academyId: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('academy_id', academyId);

      if (error) throw error;
      set({ students: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addStudent: async (data) => {
    try {
      set({ loading: true, error: null });
      const { data: newStudent, error } = await supabase
        .from('students')
        .insert([data])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        students: [...state.students, newStudent],
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateStudent: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('students')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        students: state.students.map(student =>
          student.id === id ? { ...student, ...data } : student
        ),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteStudent: async (id) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        students: state.students.filter(student => student.id !== id),
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  }
}));