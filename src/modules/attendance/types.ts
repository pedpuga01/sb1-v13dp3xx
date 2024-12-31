```typescript
export type AttendanceStatus = 'present' | 'absent' | 'late';

export interface Attendance {
  id: string;
  class_id: string;
  student_id: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  marked_by: string;
  created_at: string;
  updated_at: string;
}

export interface AttendanceFilters {
  class_id?: string;
  student_id?: string;
  start_date?: string;
  end_date?: string;
  status?: AttendanceStatus;
}

export interface AttendanceStats {
  total_classes: number;
  present_count: number;
  absent_count: number;
  late_count: number;
  attendance_rate: number;
}
```