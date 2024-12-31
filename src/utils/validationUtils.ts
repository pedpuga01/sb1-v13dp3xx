import { validateRut } from './rutValidator';
import { format, parse, isValid } from 'date-fns';

export function validateStudentData(data: any) {
  const errors: string[] = [];

  // Validar campos requeridos
  if (!data.nombre) errors.push('El nombre es requerido');
  if (!data.apellido) errors.push('El apellido es requerido');
  if (!data.rut) errors.push('El RUT es requerido');
  if (!data.email) errors.push('El email es requerido');
  if (!data.fechaNacimiento) errors.push('La fecha de nacimiento es requerida');

  // Validar formato de RUT
  if (data.rut && !validateRut(data.rut)) {
    errors.push('RUT inválido');
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Email inválido');
  }

  // Validar formato de teléfono si existe
  if (data.telefono) {
    const phoneRegex = /^\+\d{1,3}\d{9}$/;
    if (!phoneRegex.test(data.telefono)) {
      errors.push('Formato de teléfono inválido');
    }
  }

  // Validar fecha de nacimiento
  if (data.fechaNacimiento) {
    try {
      const parsedDate = parse(data.fechaNacimiento, 'dd-MM-yyyy', new Date());
      if (!isValid(parsedDate)) {
        errors.push('Formato de fecha inválido (debe ser DD-MM-AAAA)');
      }
    } catch {
      errors.push('Formato de fecha inválido (debe ser DD-MM-AAAA)');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}