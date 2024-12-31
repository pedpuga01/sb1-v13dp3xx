import React from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

interface Student {
  id: string;
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  telefono?: string;
  estado: 'activo' | 'inactivo';
}

interface StudentTableProps {
  students: Student[];
  onEdit: (studentId: string) => void;
  onDelete: (studentId: string) => void;
  onRowClick: (studentId: string) => void;
}

export default function StudentTable({ students, onEdit, onDelete, onRowClick }: StudentTableProps) {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                  Nombre
                </th>
                <th scope="col" className="hidden sm:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                  RUT
                </th>
                <th scope="col" className="hidden sm:table-cell px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                  Contacto
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                  Estado
                </th>
                <th scope="col" className="relative px-3 py-3 sm:px-6">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr 
                  key={student.id}
                  onClick={() => onRowClick(student.id)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-3 py-4 whitespace-nowrap sm:px-6">
                    <div className="text-sm font-medium text-gray-900">
                      {student.nombre} {student.apellido}
                    </div>
                    <div className="sm:hidden text-sm text-gray-500">{student.rut}</div>
                  </td>
                  <td className="hidden sm:table-cell px-3 py-4 whitespace-nowrap sm:px-6">
                    <div className="text-sm text-gray-900">{student.rut}</div>
                  </td>
                  <td className="hidden sm:table-cell px-3 py-4 whitespace-nowrap sm:px-6">
                    <div className="text-sm text-gray-900">{student.email}</div>
                    {student.telefono && (
                      <div className="text-sm text-gray-500">{student.telefono}</div>
                    )}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap sm:px-6">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.estado === 'activo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium sm:px-6">
                    <div className="flex justify-end space-x-2" onClick={e => e.stopPropagation()}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(student.id)}
                        className="hidden sm:inline-flex"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(student.id)}
                        className="hidden sm:inline-flex"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="sm:hidden"
                        onClick={() => {
                          const menu = document.createElement('div');
                          menu.innerHTML = `
                            <div class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                              <div class="py-1">
                                <button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onclick="onEdit('${student.id}')">
                                  Editar
                                </button>
                                <button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onclick="onDelete('${student.id}')">
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          `;
                        }}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}