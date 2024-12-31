```typescript
import { useState, useEffect } from 'react';
import { studentApi } from '../api';
import type { Student, StudentFilters } from '../types';

export function useStudents(academyId: string) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<StudentFilters>({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await studentApi.getAll(academyId);
        
        // Aplicar filtros
        let filteredData = [...data];
        
        if (filters.search) {
          const search = filters.search.toLowerCase();
          filteredData = filteredData.filter(student => 
            student.full_name?.toLowerCase().includes(search) ||
            student.email.toLowerCase().includes(search)
          );
        }

        if (filters.status) {
          filteredData = filteredData.filter(student => 
            student.status === filters.status
          );
        }

        if (filters.sort) {
          filteredData.sort((a, b) => {
            const aValue = a[filters.sort!];
            const bValue = b[filters.sort!];
            const order = filters.order === 'desc' ? -1 : 1;
            return aValue < bValue ? -1 * order : 1 * order;
          });
        }

        setStudents(filteredData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [academyId, filters]);

  const addStudent = async (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newStudent = await studentApi.create(studentData);
      setStudents(prev => [...prev, newStudent]);
      return newStudent;
    } catch (err) {
      throw err;
    }
  };

  const updateStudent = async (id: string, studentData: Partial<Student>) => {
    try {
      const updatedStudent = await studentApi.update(id, studentData);
      setStudents(prev => prev.map(s => s.id === id ? updatedStudent : s));
      return updatedStudent;
    } catch (err) {
      throw err;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await studentApi.delete(id);
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    students,
    loading,
    error,
    filters,
    setFilters,
    addStudent,
    updateStudent,
    deleteStudent
  };
}
```