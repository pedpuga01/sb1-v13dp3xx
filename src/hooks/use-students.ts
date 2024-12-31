'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/auth';
import type { Database } from '@/types/database';

type Student = Database['public']['Tables']['users']['Row'];

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'student');

        if (error) throw error;
        setStudents(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = async (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('users')
        .insert([studentData])
        .select()
        .single();

      if (error) throw error;
      setStudents(prev => [...prev, data]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    students,
    loading,
    error,
    addStudent
  };
}