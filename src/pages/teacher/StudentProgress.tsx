import React, { useState } from 'react';
import { Search, Star, TrendingUp, MessageSquare } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function StudentProgress() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-futura text-dark">Progreso de Estudiantes</h1>
        <p className="text-gray-600">Seguimiento y evaluación de alumnos</p>
      </div>

      {/* Búsqueda */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="relative rounded-md">
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
        </div>

        {/* Lista de Estudiantes */}
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Estudiante {i}
                  </h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      4.5/5
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                      Progreso: 75%
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<MessageSquare className="h-4 w-4" />}
                  >
                    Agregar Nota
                  </Button>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              </div>

              {/* Últimas Notas */}
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-900">
                  Últimas Notas
                </h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    Excelente progreso en la última clase. Mejoró significativamente
                    en técnica y expresión.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Hace 2 días
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}