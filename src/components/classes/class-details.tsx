import { useState } from 'react';
import { Clock, Users, MapPin, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Class } from '@/modules/classes/types';
import { ClassStudentManager } from './class-student-manager';

interface ClassDetailsProps {
  class_: Class;
  onClose: () => void;
  onEdit: () => void;
}

export function ClassDetails({ class_, onClose, onEdit }: ClassDetailsProps) {
  const [showStudentManager, setShowStudentManager] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-medium text-gray-900">{class_.name}</h2>
              <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                class_.type === 'individual'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {class_.type === 'individual' ? 'Individual' : 'Grupal'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {class_.description && (
            <p className="text-gray-600 mb-6">{class_.description}</p>
          )}

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Horario</p>
                <p className="text-gray-900">
                  {class_.schedule.day} • {class_.schedule.start_time} - {class_.schedule.end_time}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Capacidad</p>
                <p className="text-gray-900">
                  {/* TODO: Get enrolled students count */}
                  0/{class_.capacity} estudiantes
                </p>
              </div>
            </div>

            {class_.room_id && (
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Sala</p>
                  <p className="text-gray-900">
                    {/* TODO: Get room name */}
                    Sala {class_.room_id}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Estudiantes</h3>
            <Button onClick={() => setShowStudentManager(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Gestionar Estudiantes
            </Button>
          </div>

          {/* Lista de estudiantes */}
          <div className="space-y-2">
            {/* TODO: Implement students list */}
            <p className="text-sm text-gray-500">No hay estudiantes inscritos</p>
          </div>
        </div>
      </div>

      {showStudentManager && (
        <ClassStudentManager
          classId={class_.id}
          onClose={() => setShowStudentManager(false)}
        />
      )}
    </div>
  );
}