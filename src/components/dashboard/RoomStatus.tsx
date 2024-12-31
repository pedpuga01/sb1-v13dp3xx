import React from 'react';
import { Home, Check, AlertTriangle } from 'lucide-react';
import { useRoomStore } from '../../stores/roomStore';
import { useClassStore } from '../../stores/classStore';

export default function RoomStatus() {
  const { rooms } = useRoomStore();
  const { classes } = useClassStore();

  const getRoomOccupancy = (roomId: string) => {
    const today = new Date().getDay();
    const currentTime = new Date().toLocaleTimeString('es-CL', { hour12: false });
    const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

    const currentClasses = classes.filter(c => {
      if (c.sala !== roomId) return false;
      if (c.horario.dia.toLowerCase() !== dias[today]) return false;
      
      const classStart = c.horario.horaInicio;
      const classEnd = c.horario.horaFin;
      return currentTime >= classStart && currentTime <= classEnd;
    });

    return currentClasses.length > 0;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Estado de Salas
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rooms.map((room) => {
            const isOccupied = getRoomOccupancy(room.id);
            const isAvailable = room.estado === 'disponible';

            return (
              <div
                key={room.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Home className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <h4 className="font-medium text-gray-900">{room.nombre}</h4>
                      <p className="text-sm text-gray-500">
                        Capacidad: {room.capacidad} personas
                      </p>
                    </div>
                  </div>
                  {isAvailable ? (
                    <div className={`flex items-center ${
                      isOccupied ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {isOccupied ? (
                        <>
                          <AlertTriangle className="h-5 w-5 mr-1" />
                          <span className="text-sm font-medium">En uso</span>
                        </>
                      ) : (
                        <>
                          <Check className="h-5 w-5 mr-1" />
                          <span className="text-sm font-medium">Disponible</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <AlertTriangle className="h-5 w-5 mr-1" />
                      <span className="text-sm font-medium">Mantenimiento</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}