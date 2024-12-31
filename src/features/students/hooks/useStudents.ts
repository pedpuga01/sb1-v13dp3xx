import { useCallback, useState } from 'react';
import { useAsync } from '../../../hooks/useAsync';
import { useToast } from '../../../hooks/useToast';
import { studentService } from '../services/studentService';
import type { Student, StudentFilters } from '../types';

export function useStudents(academyId: string) {
  const [filters, setFilters] = useState<StudentFilters>({});
  const { execute, data: students, loading, error } = useAsync<Student[]>();
  const toast = useToast();

  const loadStudents = useCallback(async () => {
    try {
      const data = await execute(studentService.getByAcademy(academyId, filters));
      return data;
    } catch (error) {
      toast.error('Error al cargar estudiantes');
      throw error;
    }
  }, [academyId, filters, execute, toast]);

  const createStudent = useCallback(async (data: Omit<Student, 'id'>) => {
    try {
      await studentService.create(data);
      toast.success('Estudiante creado exitosamente');
      await loadStudents();
    } catch (error) {
      toast.error('Error al crear estudiante');
      throw error;
    }
  }, [loadStudents, toast]);

  return {
    students,
    loading,
    error,
    filters,
    setFilters,
    loadStudents,
    createStudent
  };
}