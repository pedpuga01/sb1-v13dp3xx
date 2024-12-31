```typescript
import { createClient } from '@/lib/supabase/auth';
import type { Grade, GradeStats, StudentProgress, GradeFilters } from './types';

export const gradesApi = {
  getGrades: async (filters: GradeFilters) => {
    const supabase = createClient();
    let query = supabase
      .from('grades')
      .select(`
        *,
        student:users!student_id(
          id,
          full_name,
          email
        ),
        class:classes(
          id,
          name
        ),
        module:modules(
          id,
          name
        )
      `);

    // Aplicar filtros
    if (filters.student_id) {
      query = query.eq('student_id', filters.student_id);
    }
    if (filters.class_id) {
      query = query.eq('class_id', filters.class_id);
    }
    if (filters.module_id) {
      query = query.eq('module_id', filters.module_id);
    }
    if (filters.evaluation_type) {
      query = query.eq('evaluation_type', filters.evaluation_type);
    }
    if (filters.start_date) {
      query = query.gte('evaluation_date', filters.start_date);
    }
    if (filters.end_date) {
      query = query.lte('evaluation_date', filters.end_date);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  addGrade: async (grade: Omit<Grade, 'id' | 'created_at' | 'updated_at'>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('grades')
      .insert([grade])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateGrade: async (id: string, grade: Partial<Grade>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('grades')
      .update(grade)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteGrade: async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('grades')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  getStudentAverage: async (studentId: string, classId?: string, moduleId?: string): Promise<GradeStats> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .rpc('get_student_average', {
        p_student_id: studentId,
        p_class_id: classId,
        p_module_id: moduleId
      });

    if (error) throw error;
    return data;
  },

  getStudentProgress: async (studentId: string, classId?: string): Promise<StudentProgress> => {
    const supabase = createClient();
    const { data, error } = await supabase
      .rpc('get_student_progress', {
        p_student_id: studentId,
        p_class_id: classId
      });

    if (error) throw error;
    return data;
  }
};
```