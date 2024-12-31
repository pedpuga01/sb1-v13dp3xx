```typescript
import { useState } from 'react';
import { BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Student } from '@/modules/students/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface StudentProgressProps {
  student: Student;
}

export function StudentProgress({ student }: StudentProgressProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Resumen de Progreso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-blue-500" />
            <p className="ml-2 text-sm font-medium text-blue-900">Módulos Activos</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-blue-900">
            {student.progress?.filter(p => p.status === 'in_progress').length || 0}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p className="ml-2 text-sm font-medium text-green-900">Módulos Completados</p>
          </div>
          <p className="mt-2 text-2xl font-semibold text-green-900">
            {student.progress?.filter(p => p.status === 'completed').length || 0}
          </p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-yellow-500" />
            <p className="ml-2 text-sm font-medium text-yellow-900">Próxima Evaluación</p>
          </div>
          <p className="mt-2 text-sm font-medium text-yellow-900">
            {/* TODO: Implementar próxima evaluación */}
            No programada
          </p>
        </div>
      </div>

      {/* Lista de Módulos */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Módulos</h3>
        
        {student.progress && student.progress.length > 0 ? (
          <div className="space-y-4">
            {student.progress.map((progress) => (
              <div
                key={progress.module_id}
                className={`
                  p-4 rounded-lg border transition-colors cursor-pointer
                  ${selectedModule === progress.module_id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50'}
                `}
                onClick={() => setSelectedModule(progress.module_id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {/* TODO: Obtener nombre del módulo */}
                      Módulo {progress.module_id}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Última actividad: {format(new Date(progress.last_activity), 'PPP', { locale: es })}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${progress.completion_percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {progress.completion_percentage}%
                    </span>
                  </div>
                </div>

                {selectedModule === progress.module_id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {/* TODO: Mostrar detalles del módulo */}
                    <p className="text-sm text-gray-500">
                      Detalles del módulo y progreso específico...
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No hay módulos asignados</p>
            <Button className="mt-4">
              Asignar Módulo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
```