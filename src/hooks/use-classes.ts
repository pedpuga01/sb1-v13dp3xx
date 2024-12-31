import { useState, useEffect } from 'react';
import { classApi } from '@/modules/classes/api';
import type { Class, ClassFilters } from '@/modules/classes/types';

export function useClasses(academyId: string) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const data = await classApi.getAll(academyId);
        setClasses(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [academyId]);

  const addClass = async (classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newClass = await classApi.create(classData);
      setClasses(prev => [...prev, newClass]);
      return newClass;
    } catch (err) {
      throw err;
    }
  };

  const updateClass = async (id: string, classData: Partial<Class>) => {
    try {
      const updatedClass = await classApi.update(id, classData);
      setClasses(prev => prev.map(c => c.id === id ? updatedClass : c));
      return updatedClass;
    } catch (err) {
      throw err;
    }
  };

  const deleteClass = async (id: string) => {
    try {
      await classApi.delete(id);
      setClasses(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    classes,
    loading,
    error,
    addClass,
    updateClass,
    deleteClass
  };
}