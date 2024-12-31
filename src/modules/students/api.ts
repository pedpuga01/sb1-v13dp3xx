```typescript
import { supabase } from '@/lib/supabase/client';
import type { Student } from './types';

export const studentApi = {
  getAll: async (academyId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        classes:class_enrollments(
          class_id,
          status,
          enrolled_at
        ),
        progress:student_progress(*)
      `)
      .eq('role', 'student')
      .eq('academy_id', academyId);

    if (error) throw error;
    return data as Student[];
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        classes:class_enrollments(
          class_id,
          status,
          enrolled_at
        ),
        progress:student_progress(*),
        notes:student_notes(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Student;
  },

  create: async (student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('users')
      .insert([{ ...student, role: 'student' }])
      .select()
      .single();

    if (error) throw error;
    return data as Student;
  },

  update: async (id: string, student: Partial<Student>) => {
    const { data, error } = await supabase
      .from('users')
      .update(student)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Student;
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Métodos para notas
  addNote: async (studentId: string, note: { content: string; type: string }) => {
    const { data, error } = await supabase
      .from('student_notes')
      .insert([{ ...note, student_id: studentId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Métodos para progreso
  updateProgress: async (studentId: string, moduleId: string, progress: any) => {
    const { data, error } = await supabase
      .from('student_progress')
      .upsert([{
        student_id: studentId,
        module_id: moduleId,
        ...progress
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
```