import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useClasses } from '@/hooks/use-classes';

const classSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  type: z.enum(['individual', 'group']),
  capacity: z.number().min(1, 'La capacidad debe ser al menos 1'),
  schedule: z.object({
    day: z.string().min(1, 'El día es requerido'),
    start_time: z.string().min(1, 'La hora de inicio es requerida'),
    end_time: z.string().min(1, 'La hora de fin es requerida')
  }),
  room_id: z.string().optional()
});

type ClassFormData = z.infer<typeof classSchema>;

interface ClassFormProps {
  onClose: () => void;
  classId?: string;
}

const days = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];

export function ClassForm({ onClose, classId }: ClassFormProps) {
  const [loading, setLoading] = useState(false);
  const { addClass } = useClasses('academy-id'); // TODO: Get from context
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      type: 'individual',
      capacity: 1
    }
  });

  const classType = watch('type');

  const onSubmit = async (data: ClassFormData) => {
    try {
      setLoading(true);
      await addClass({
        ...data,
        teacher_id: 'teacher-id', // TODO: Get from context or selection
        academy_id: 'academy-id' // TODO: Get from context
      });
      onClose();
    } catch (error) {
      console.error('Error al crear clase:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-lg font-medium mb-4">
          {classId ? 'Editar Clase' : 'Nueva Clase'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre de la Clase
              </label>
              <Input
                {...register('name')}
                className="mt-1"
                error={errors.name?.message}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Clase
              </label>
              <select
                {...register('type')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="individual">Individual</option>
                <option value="group">Grupal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacidad
              </label>
              <Input
                type="number"
                {...register('capacity', { valueAsNumber: true })}
                min={classType === 'individual' ? 1 : 2}
                className="mt-1"
                error={errors.capacity?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Día
              </label>
              <select
                {...register('schedule.day')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hora de Inicio
              </label>
              <Input
                type="time"
                {...register('schedule.start_time')}
                className="mt-1"
                error={errors.schedule?.start_time?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hora de Fin
              </label>
              <Input
                type="time"
                {...register('schedule.end_time')}
                className="mt-1"
                error={errors.schedule?.end_time?.message}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sala
              </label>
              <select
                {...register('room_id')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="">Sin sala asignada</option>
                {/* TODO: Add rooms from context/API */}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={loading}
            >
              {classId ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}