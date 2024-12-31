import { useCallback } from 'react';
import { useStore } from '../stores/store';
import { useToast } from './useToast';
import { Student } from '../types/models';
import { handleError } from '../utils/errors';

export function useStudents() {
  const store = useStore();
  const toast = useToast();

  const loadStudents = useCallback(async (academyId: string) => {
    try {
      await store.fetchStudents(academyId);
    } catch (error) {
      const appError = handleError(error);
      toast.error(appError.message);
      throw appError;
    }
  }, [store, toast]);

  const createStudent = useCallback(async (data: Omit<Student, 'id'>) => {
    try {
      await store.addStudent(data);
      toast.success('Estudiante creado exitosamente');
    } catch (error) {
      const appError = handleError(error);
      toast.error(appError.message);
      throw appError;
    }
  }, [store, toast]);

  return {
    students: store.students,
    selectedStudent: store.selectedStudent,
    loading: store.loading,
    error: store.error,
    loadStudents,
    createStudent,
    updateStudent: store.updateStudent,
    deleteStudent: store.deleteStudent,
    selectStudent: store.selectStudent
  };
}