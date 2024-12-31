import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import { useTaskStore } from '../../stores/taskStore';
import { useAuthStore } from '../../stores/authStore';

const taskSchema = z.object({
  titulo: z.string().min(1, 'El título es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  fechaVencimiento: z.string().min(1, 'La fecha de vencimiento es requerida'),
  horaVencimiento: z.string().min(1, 'La hora de vencimiento es requerida'),
  prioridad: z.enum(['baja', 'media', 'alta']),
  tipo: z.enum(['administrativa', 'academica'])
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onClose: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const { addTask } = useTaskStore();
  const { userData } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>();

  const onSubmit = (data: TaskFormData) => {
    const fechaVencimiento = new Date(`${data.fechaVencimiento}T${data.horaVencimiento}`);
    
    addTask({
      titulo: data.titulo,
      descripcion: data.descripcion,
      fechaVencimiento: fechaVencimiento.toISOString(),
      estado: 'pendiente',
      prioridad: data.prioridad,
      tipo: data.tipo,
      asignadoPor: userData?.uid || '',
      asignadoA: [userData?.uid || '']
    });
    
    onClose();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Nueva Tarea</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            {...register('titulo')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {errors.titulo && (
            <p className="mt-1 text-sm text-red-600">{errors.titulo.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            {...register('descripcion')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {errors.descripcion && (
            <p className="mt-1 text-sm text-red-600">{errors.descripcion.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Vencimiento
            </label>
            <input
              type="date"
              {...register('fechaVencimiento')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hora de Vencimiento
            </label>
            <input
              type="time"
              {...register('horaVencimiento')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prioridad
            </label>
            <select
              {...register('prioridad')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo
            </label>
            <select
              {...register('tipo')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="administrativa">Administrativa</option>
              <option value="academica">Académica</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Crear Tarea
          </Button>
        </div>
      </form>
    </div>
  );
}