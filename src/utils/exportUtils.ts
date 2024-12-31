import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Student } from '../stores/studentStore';

export const exportStudentsTemplate = () => {
  const csvContent = [
    'nombre,apellido,rut,email,telefono,fechaNacimiento,comuna,ciudad,region',
    'Juan,Pérez,12.345.678-9,juan@email.com,+56912345678,01-01-2000,Las Condes,Santiago,Metropolitana'
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'plantilla_estudiantes.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportStudentsData = (students: Student[]) => {
  const headers = [
    'nombre',
    'apellido',
    'rut',
    'email',
    'telefono',
    'fechaNacimiento',
    'comuna',
    'ciudad',
    'region'
  ];

  const rows = students.map(student => {
    const fechaNacimiento = student.fechaNacimiento ? 
      format(new Date(student.fechaNacimiento), 'dd-MM-yyyy', { locale: es }) : '';

    return [
      student.nombre,
      student.apellido,
      student.rut,
      student.email,
      student.telefono || '',
      fechaNacimiento,
      student.direccion?.comuna || '',
      student.direccion?.ciudad || '',
      student.direccion?.region || ''
    ].map(value => `"${value}"`).join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'estudiantes.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};