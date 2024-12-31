export type Role = 'superadmin' | 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  role: Role;
  academy_id?: string;
  profile?: {
    full_name?: string;
    phone?: string;
    avatar_url?: string;
    preferences?: Record<string, any>;
  };
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface Permission {
  id: string;
  code: string;
  description: string;
}

export interface RolePermission {
  role: Role;
  permissions: Permission[];
}