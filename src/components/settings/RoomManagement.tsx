import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Music, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useRoomStore } from '../../stores/roomStore';
import RoomForm from './RoomForm';

export default function RoomManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const { rooms, deleteRoom } = useRoomStore();

  const handleEdit = (roomId: string) => {
    setEditingRoom(roomId);
    setShowForm(true);
  };

  const handleDelete = (roomId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta sala?')) {
      deleteRoom(roomId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-dark">Gestión de Salas</h2>
        <Button
          variant="primary"
          onClick={() => {
            setEditingRoom(null);
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Sala
        </Button>
      </div>

      {showForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <RoomForm
            roomId={editingRoom}
            onClose={() => {
              setShowForm(false);
              setEditingRoom(null);
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Music className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-medium text-dark">{room.nombre}</h3>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    room.estado === 'disponible'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {room.estado === 'disponible' ? 'Disponible' : 'Mantenimiento'}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <p className="text-sm text-gray-600">{room.descripcion}</p>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Capacidad</p>
                    <p className="text-sm text-gray-600">{room.capacidad} personas</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">Equipamiento</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {room.equipamiento.map((equipo, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {equipo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(room.id)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(room.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}