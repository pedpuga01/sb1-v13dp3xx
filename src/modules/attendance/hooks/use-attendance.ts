```typescript
import { useState, useCallback } from 'react';
import { attendanceApi } from '../api';
import type { AttendanceStatus, AttendanceStats } from '../types';

export function useAttendance(classId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const markAttendance = useCallback(async (
    studentId: string,
    date: string,
    status: AttendanceStatus,
    notes?: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      return await attendanceApi.markAttendance({
        class_id: classId,
        student_id: studentId,
        date,
        status,
        notes,
        marked_by: 'current-user-id' // TODO: Get from auth context
      });
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [classId]);

  const getAttendance = useCallback(async (date: string) => {
    try {
      setLoading(true);
      setError(null);
      return await attendanceApi.getByClass(classId, date);
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [classId]);

  const getStudentStats = useCallback(async (
    studentId: string,
    filters?: { start_date?: string; end_date?: string }
  ): Promise<AttendanceStats> => {
    try {
      setLoading(true);
      setError(null);
      return await attendanceApi.getStudentStats(studentId, {
        class_id: classId,
        ...filters
      });
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [classId]);

  return {
    loading,
    error,
    markAttendance,
    getAttendance,
    getStudentStats
  };
}
```