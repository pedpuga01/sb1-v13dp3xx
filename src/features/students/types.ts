import { BaseModel } from '../../types/models';

export interface Student extends BaseModel {
  user_id: string;
  academy_id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  rut: string;
  estado: 'activo' | 'inactivo';
  direccion?: {
    calle: string;
    numero: string;
    comuna: string;
    ciudad: string;
    region: string;
  };
}

export interface StudentFilters {
  search?: string;
  estado?: Student['estado'];
  sort?: keyof Student;
  order?: 'asc' | 'desc';
}