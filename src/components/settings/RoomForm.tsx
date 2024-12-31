import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button';
import { useRoomStore } from '../../stores/roomStore';

const equipamientoOptions = [
  'Piano',
  'Piano de Cola',
  'Sistema de Audio',
  'Micrófonos',
  'Atriles',
  'Espejos',
  'Instrumentos de Percusión',
  'Pizarra',
  'Proyector',
  'Amplificadores'
];

const roomSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  capacidad: z.number().min(1, 'La capacidad debe ser al menos 1'),
  descripcion: z.string().optional(),
  estado: z.enum(['disponible', 'mantenimiento']),
  equipamiento: z.array(z.string())
});

type RoomFormData = z.infer<typeof roomSchema>;

interface RoomFormProps {
  roomId?: string | null;
  onClose: () => void;
}

export default function RoomForm({ roomId, onClose }: RoomFormProps) {
  const { rooms, addRoom, updateRoom } = useRoomStore();
  const editingRoom = roomId ? rooms.find(r => r.id === roomId) : null;

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RoomFormData>({
    defaultValues: editingRoom || {
      estado: 'disponible',
      equipamiento: []
    }
  });

  const onSubmit = (data: RoomFormData) => {
    if (editingRoom) {
      updateRoom(editingRoom.id, data);
    } else {
      addRoom(data);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Nombre de la Sala
          </label>
          <input
            type="text"
            {...register('nombre')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {errors.nombre && (
            <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Capacidad
          </label>
          <input
            type="number"
            {...register('capacidad', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {errors.capacidad && (
            <p className="mt-1 text-sm text-red-600">{errors.capacidad.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            {...register('estado')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="disponible">Disponible</option>
            <option value="mantenimiento">En Mantenimiento</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            {...register('descripcion')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equipamiento
          </label>
          <div className="grid grid-cols-2 gap-4">
            {equipamientoOptions.map((equipo) => (
              <label key={equipo} className="flex items-center">
                <input
                  type="checkbox"
                  value={equipo}
                  {...register('equipamiento')}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600">{equipo}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {editingRoom ? 'Actualizar' : 'Crear'} Sala
        </Button>
      </div>
    </form>
  );
}