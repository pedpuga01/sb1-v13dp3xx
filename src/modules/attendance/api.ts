```typescript
import { createClient } from '@/lib/supabase/auth';
import type { Attendance, AttendanceFilters } from './types';

export const attendanceApi = {
  getByClass: async (classId: string, date: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        student:users!student_id(
          id,
          full_name,
          email
        )
      `)
      .eq('class_id', classId)
      .eq('date', date);

    if (error) throw error;
    return data;
  },

  markAttendance: async (attendance: Omit<Attendance, 'id' | 'created_at' | 'updated_at'>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('attendance')
      .upsert([attendance])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getStudentStats: async (studentId: string, filters?: AttendanceFilters) => {
    const supabase = createClient();
    let query = supabase
      .from('attendance')
      .select('*')
      .eq('student_id', studentId);

    if (filters?.start_date) {
      query = query.gte('date', filters.start_date);
    }
    if (filters?.end_date) {
      query = query.lte('date', filters.end_date);
    }
    if (filters?.class_id) {
      query = query.eq('class_id', filters.class_id);
    }

    const { data, error } = await query;
    if (error) throw error;

    const total = data.length;
    const present = data.filter(a => a.status === 'present').length;
    const late = data.filter(a => a.status === 'late').length;
    const absent = data.filter(a => a.status === 'absent').length;

    return {
      total_classes: total,
      present_count: present,
      absent_count: absent,
      late_count: late,
      attendance_rate: total > 0 ? ((present + late) / total) * 100 : 0
    };
  }
};
```