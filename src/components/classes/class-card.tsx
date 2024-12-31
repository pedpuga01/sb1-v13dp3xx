import { useState } from 'react';
import { Clock, Users, MapPin, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Class } from '@/modules/classes/types';

interface ClassCardProps {
  class_: Class;
}

export function ClassCard({ class_ }: ClassCardProps) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{class_.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            class_.type === 'individual'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-purple-100 text-purple-800'
          }`}>
            {class_.type === 'individual' ? 'Individual' : 'Grupal'}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            {class_.schedule.day} • {class_.schedule.start_time} - {class_.schedule.end_time}
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            {/* TODO: Get enrolled students count */}
            0/{class_.capacity} estudiantes
          </div>

          {class_.room_id && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              {/* TODO: Get room name */}
              Sala {class_.room_id}
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 flex justify-end">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowActions(!showActions)}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>

          {showActions && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    // TODO: Implement view details
                    setShowActions(false);
                  }}
                >
                  Ver Detalles
                </button>
                <button
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    // TODO: Implement edit
                    setShowActions(false);
                  }}
                >
                  Editar
                </button>
                <button
                  className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    // TODO: Implement delete
                    setShowActions(false);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}