import React, { useState } from 'react';
import { Calendar, Check, X, Search } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function Attendance() {
  const [selectedClass, setSelectedClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-futura text-dark">Control de Asistencia</h1>
        <p className="text-gray-600">Registra la asistencia de tus alumnos</p>
      </div>

      {/* Selector de Clase */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700">
          Seleccionar Clase
        </label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">Selecciona una clase...</option>
          <option value="1">Clase 1 - Lunes 15:00</option>
          <option value="2">Clase 2 - Martes 16:30</option>
          <option value="3">Clase 3 - Miércoles 14:00</option>
        </select>
      </div>

      {selectedClass && (
        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Clase {selectedClass}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <Button variant="primary">
                Guardar Asistencia
              </Button>
            </div>
          </div>

          {/* Lista de Estudiantes */}
          <div className="p-4">
            <div className="relative rounded-md mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Buscar estudiantes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      Estudiante {i}
                    </p>
                    <p className="text-sm text-gray-500">
                      Asistencia: 90%
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:bg-green-50"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}