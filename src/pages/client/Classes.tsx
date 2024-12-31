import React, { useState } from 'react';
import { Plus, Calendar, List, Grid } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function Classes() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-futura text-dark">Clases</h1>
          <p className="text-gray-600">Gestiona las clases y horarios</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex rounded-md shadow-sm">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Clase
          </Button>
        </div>
      </div>

      {/* Grid de Clases */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-dark">Clase {i}</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Lunes y Miércoles • 15:00 - 16:30
                </div>
                <div className="text-sm text-gray-500">
                  Profesor: Juan Pérez
                </div>
                <div className="text-sm text-gray-500">
                  Sala: Sala 1
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  8/10 estudiantes
                </span>
                <Button variant="outline" size="sm">
                  Ver Detalles
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}