import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button';
import type { Class } from '../../stores/classStore';
import { useRoomStore } from '../../stores/roomStore';
import { useUserStore } from '../../stores/userStore';

const classSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  descripcion: z.string().optional(),
  capacidad: z.number().min(1, 'La capacidad debe ser al menos 1'),
  profesor: z.string().min(1, 'El profesor es requerido'),
  horario: z.object({
    dia: z.string().min(1, 'El día es requerido'),
    horaInicio: z.string().min(1, 'La hora de inicio es requerida'),
    horaFin: z.string().min(1, 'La hora de fin es requerida'),
  }),
  tipo: z.enum(['individual', 'grupal']),
  sala: z.string().optional()
});

type ClassFormData = z.infer<typeof classSchema>;

interface ClassFormProps {
  onSubmit: (data: ClassFormData) => void;
  onCancel: () => void;
  initialData?: Class;
}

export default function ClassForm({ onSubmit, onCancel, initialData }: ClassFormProps) {
  const { rooms } = useRoomStore();
  const { users } = useUserStore();
  const availableRooms = rooms.filter(room => room.estado === 'disponible');
  const availableProfessors = users.filter(user => 
    user.estado === 'activo' && (user.rol === 'profesor' || user.rol === 'admin')
  );

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ClassFormData>({
    defaultValues: initialData || {
      tipo: 'individual',
      horario: {
        dia: 'lunes',
      },
    },
  });

  const selectedTipo = watch('tipo');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-dark">
            Nombre de la Clase
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

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-dark">
            Descripción
          </label>
          <textarea
            {...register('descripcion')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark">
            Profesor
          </label>
          <select
            {...register('profesor')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">Seleccionar profesor...</option>
            {availableProfessors.map(professor => (
              <option key={professor.id} value={professor.id}>
                {professor.nombre} {professor.apellido}
              </option>
            ))}
          </select>
          {errors.profesor && (
            <p className="mt-1 text-sm text-red-600">{errors.profesor.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-dark">
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
          <label className="block text-sm font-medium text-dark">
            Sala
          </label>
          <select
            {...register('sala')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">Seleccionar sala...</option>
            {availableRooms
              .filter(room => 
                selectedTipo === 'individual' ? room.capacidad >= 1 : room.capacidad >= 2
              )
              .map(room => (
                <option key={room.id} value={room.id}>
                  {room.nombre} (Cap: {room.capacidad})
                </option>
              ))
            }
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark">
            Tipo de Clase
          </label>
          <select
            {...register('tipo')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="individual">Individual</option>
            <option value="grupal">Grupal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark">
            Día
          </label>
          <select
            {...register('horario.dia')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="lunes">Lunes</option>
            <option value="martes">Martes</option>
            <option value="miercoles">Miércoles</option>
            <option value="jueves">Jueves</option>
            <option value="viernes">Viernes</option>
            <option value="sabado">Sábado</option>
            <option value="domingo">Domingo</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark">
            Hora de Inicio
          </label>
          <input
            type="time"
            {...register('horario.horaInicio')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark">
            Hora de Fin
          </label>
          <input
            type="time"
            {...register('horario.horaFin')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {initialData ? 'Actualizar' : 'Crear'} Clase
        </Button>
      </div>
    </form>
  );
}