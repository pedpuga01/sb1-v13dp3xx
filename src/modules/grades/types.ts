```typescript
export interface Grade {
  id: string;
  student_id: string;
  class_id: string;
  module_id?: string;
  score: number;
  evaluation_type: 'exam' | 'assignment' | 'project';
  evaluation_date: string;
  notes?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface GradeStats {
  average_score: number;
  total_evaluations: number;
}

export interface StudentProgress {
  total_evaluations: number;
  completed_evaluations: number;
  average_score: number;
  progress_percentage: number;
}

export interface GradeFilters {
  student_id?: string;
  class_id?: string;
  module_id?: string;
  evaluation_type?: Grade['evaluation_type'];
  start_date?: string;
  end_date?: string;
}
```