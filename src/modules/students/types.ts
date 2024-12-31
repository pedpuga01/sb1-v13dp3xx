```typescript
export interface Student {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
  role: 'student';
  academy_id: string;
  created_at: string;
  updated_at: string;
  // Información adicional
  birth_date?: string;
  address?: {
    street: string;
    number: string;
    city: string;
    state: string;
    zip: string;
  };
  emergency_contact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  // Información académica
  classes: string[];
  progress?: {
    module_id: string;
    status: 'not_started' | 'in_progress' | 'completed';
    completion_percentage: number;
    last_activity: string;
  }[];
  notes?: {
    id: string;
    date: string;
    content: string;
    type: 'academic' | 'behavioral' | 'general';
    created_by: string;
  }[];
}

export interface StudentFilters {
  search?: string;
  status?: 'active' | 'inactive';
  class_id?: string;
  sort_by?: keyof Student;
  sort_order?: 'asc' | 'desc';
}
```