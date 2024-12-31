import { createClient } from '@/lib/supabase/auth';
import type { Class, ClassEnrollment } from './types';

export const classApi = {
  getAll: async (academyId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        teacher:users!teacher_id(full_name),
        room:rooms(name),
        enrollments:class_enrollments(*)
      `)
      .eq('academy_id', academyId);

    if (error) throw error;

    return data.map(d => ({
      ...d,
      enrolled_count: d.enrollments?.length || 0
    }));
  },

  create: async (classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('classes')
      .insert([classData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  update: async (id: string, classData: Partial<Class>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('classes')
      .update(classData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('classes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Métodos para inscripciones
  enrollStudent: async (classId: string, studentId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('class_enrollments')
      .insert([{ class_id: classId, student_id: studentId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  unenrollStudent: async (classId: string, studentId: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('class_enrollments')
      .delete()
      .match({ class_id: classId, student_id: studentId });

    if (error) throw error;
  },

  getEnrollments: async (classId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('class_enrollments')
      .select(`
        *,
        student:users!student_id(*)
      `)
      .eq('class_id', classId);

    if (error) throw error;
    return data;
  }
};