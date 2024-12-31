export interface BaseModel {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface Academy extends BaseModel {
  name: string;
  business_type: string;
  status: 'active' | 'trial' | 'inactive';
  subscription_plan?: string;
}

export interface User extends BaseModel {
  email: string;
  full_name?: string;
  role: 'superadmin' | 'admin' | 'teacher' | 'student';
  academy_id?: string;
}

export interface Student extends BaseModel {
  user_id: string;
  academy_id: string;
  status: 'active' | 'inactive';
}

export interface Class extends BaseModel {
  academy_id: string;
  name: string;
  teacher_id: string;
  type: 'individual' | 'group';
  capacity: number;
}

export interface Module extends BaseModel {
  academy_id: string;
  name: string;
  description?: string;
  level: 'basic' | 'intermediate' | 'advanced';
}