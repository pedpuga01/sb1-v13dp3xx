import Papa from 'papaparse';
import { format, parse } from 'date-fns';

interface CSVStudent {
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  telefono?: string;
  fechanacimiento?: string;
  calle?: string;
  comuna?: string;
  ciudad?: string;
  region?: string;
  pais?: string;
}

interface ParseResult {
  data: any[];
  errors: string[];
}

export async function parseCSV(csvText: string): Promise<ParseResult> {
  return new Promise((resolve) => {
    Papa.parse<CSVStudent>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      complete: (results) => {
        const errors: string[] = [];
        
        if (results.errors.length > 0) {
          results.errors.forEach(error => {
            errors.push(`Error en línea ${error.row + 2}: ${error.message}`);
          });
        }

        const data = results.data.map((row) => {
          const student: any = {
            nombre: row.nombre,
            apellido: row.apellido,
            rut: row.rut,
            email: row.email,
            telefono: row.telefono,
            fechaNacimiento: row.fechanacimiento,
            direccion: {
              calle: row.calle,
              comuna: row.comuna,
              ciudad: row.ciudad,
              region: row.region,
              pais: row.pais
            }
          };

          // Convertir formato de fecha
          if (student.fechaNacimiento) {
            try {
              const parsedDate = parse(student.fechaNacimiento, 'dd-MM-yyyy', new Date());
              student.fechaNacimiento = format(parsedDate, 'yyyy-MM-dd');
            } catch (error) {
              errors.push(`Error en la fecha de nacimiento: ${student.fechaNacimiento}`);
            }
          }

          // Limpiar campos vacíos
          Object.keys(student).forEach(key => {
            if (student[key] === '') {
              delete student[key];
            }
          });

          if (Object.keys(student.direccion).every(k => !student.direccion[k])) {
            delete student.direccion;
          }

          return student;
        });

        resolve({ data, errors });
      }
    });
  });
}