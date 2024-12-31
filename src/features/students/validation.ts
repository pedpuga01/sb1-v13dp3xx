import { z } from 'zod';
import { emailSchema, phoneSchema } from '../../utils/validation';

export const studentSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido: z.string().min(1, 'El apellido es requerido'),
  email: emailSchema,
  telefono: phoneSchema.optional(),
  rut: z.string().min(1, 'El RUT es requerido'),
  estado: z.enum(['activo', 'inactivo']),
  direccion: z.object({
    calle: z.string().min(1, 'La calle es requerida'),
    numero: z.string().min(1, 'El número es requerido'),
    comuna: z.string().min(1, 'La comuna es requerida'),
    ciudad: z.string().min(1, 'La ciudad es requerida'),
    region: z.string().min(1, 'La región es requerida')
  }).optional()
});