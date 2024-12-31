```typescript
import { useState } from 'react';
import { attendanceApi } from '@/modules/attendance/api';
import type { Attendance, AttendanceStatus } from '@/modules/attendance/types';

export function useAttendance(classId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const markAttendance = async (
    studentId: string,
    date: string,
    status: AttendanceStatus,
    notes?: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const attendance = await attendanceApi.markAttendance({
        class_id: classId,
        student_id: studentId,
        date,
        status,
        notes,
        marked_by: 'current-user-id' // TODO: Get from auth context
      });

      return attendance;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAttendance = async (date: string) => {
    try {
      setLoading(true);
      setError(null);
      return await attendanceApi.getByClass(classId, date);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    markAttendance,
    getAttendance
  };
}
```