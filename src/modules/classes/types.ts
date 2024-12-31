export interface Class {
  id: string;
  name: string;
  description?: string;
  teacher_id: string;
  schedule: {
    day: string;
    start_time: string;
    end_time: string;
  };
  capacity: number;
  type: 'individual' | 'group';
  room_id?: string;
  academy_id: string;
  created_at: string;
  updated_at: string;
}

export interface ClassEnrollment {
  id: string;
  class_id: string;
  student_id: string;
  status: 'active' | 'inactive';
  enrolled_at: string;
  created_at: string;
  updated_at: string;
}

export interface ClassWithEnrollments extends Class {
  enrollments: ClassEnrollment[];
  enrolled_count: number;
}

export interface ClassFilters {
  search?: string;
  teacher_id?: string;
  type?: 'individual' | 'group';
  day?: string;
}