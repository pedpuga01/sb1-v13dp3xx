import { z } from 'zod';
import { ValidationError } from './errors';

export function validateData<T>(schema: z.ZodType<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors[0].message);
    }
    throw error;
  }
}

// Esquemas de validación comunes
export const emailSchema = z.string().email('Email inválido');
export const passwordSchema = z.string().min(8, 'La contraseña debe tener al menos 8 caracteres');
export const phoneSchema = z.string().regex(/^\+\d{1,3}\d{9}$/, 'Formato de teléfono inválido');

export const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  full_name: z.string().min(1, 'El nombre es requerido'),
  role: z.enum(['superadmin', 'admin', 'teacher', 'student']),
  academy_id: z.string().optional()
});