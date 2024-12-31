import { useCallback } from 'react';
import { useStore } from '../stores/store';
import { useToast } from './useToast';
import { Class } from '../types/models';
import { handleError } from '../utils/errors';

export function useClasses() {
  const store = useStore();
  const toast = useToast();

  const loadClasses = useCallback(async (academyId: string) => {
    try {
      await store.fetchClasses(academyId);
    } catch (error) {
      const appError = handleError(error);
      toast.error(appError.message);
      throw appError;
    }
  }, [store, toast]);

  const loadTeacherClasses = useCallback(async (teacherId: string) => {
    try {
      await store.fetchTeacherClasses(teacherId);
    } catch (error) {
      const appError = handleError(error);
      toast.error(appError.message);
      throw appError;
    }
  }, [store, toast]);

  return {
    classes: store.classes,
    selectedClass: store.selectedClass,
    loading: store.loading,
    error: store.error,
    loadClasses,
    loadTeacherClasses,
    createClass: store.addClass,
    updateClass: store.updateClass,
    selectClass: store.selectClass
  };
}