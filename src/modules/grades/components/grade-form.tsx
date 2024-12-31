```typescript
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { format } from 'date-fns';

const gradeSchema = z.object({
  student_id: z.string().min(1, 'El estudiante es requerido'),
  class_id: z.string().min(1, 'La clase es requerida'),
  module_id: z.string().optional(),
  score: z.number()
    .min(1, 'La nota debe ser mayor o igual a 1.0')
    .max(7, 'La nota debe ser menor o igual a 7.0'),
  evaluation_type: z.enum(['exam', 'assignment', 'project']),
  evaluation_date: z.string().min(1, 'La fecha es requerida'),
  notes: z.string().optional()
});

type GradeFormData = z.infer<typeof gradeSchema>;

interface GradeFormProps {
  onSubmit: (data: GradeFormData) => Promise<void>;
  onClose: () => void;
  students: Array<{ id: string; full_name: string }>;
  classes: Array<{ id: string; name: string }>;
  modules?: Array<{ id: string; name: string }>;
  initialData?: Partial<GradeFormData>;
}

export function GradeForm({
  onSubmit,
  onClose,
  students,
  classes,
  modules,
  initialData
}: GradeFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<GradeFormData>({
    resolver: zodResolver(gradeSchema),
    defaultValues: initialData
  });

  const handleFormSubmit = async (data: GradeFormData) => {
    try {
      setLoading(true);
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Error al guardar calificación:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            {initialData ? 'Editar Calificación' : 'Nueva Calificación'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estudiante
            </label>
            <select
              {...register('student_id')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="">Seleccionar estudiante...</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.full_name}
                </option>
              ))}
            </select>
            {errors.student_id && (
              <p className="mt-1 text-sm text-red-600">{errors.student_id.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Clase
            </label>
            <select
              {...register('class_id')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="">Seleccionar clase...</option>
              {classes.map(class_ => (
                <option key={class_.id} value={class_.id}>
                  {class_.name}
                </option>
              ))}
            </select>
            {errors.class_id && (
              <p className="mt-1 text-sm text-red-600">{errors.class_id.message}</p>
            )}
          </div>

          {modules && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Módulo (opcional)
              </label>
              <select
                {...register('module_id')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="">Seleccionar módulo...</option>
                {modules.map(module => (
                  <option key={module.id} value={module.id}>
                    {module.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Calificación (1.0 - 7.0)
            </label>
            <Input
              type="number"
              step="0.1"
              min="1.0"
              max="7.0"
              {...register('score', { valueAsNumber: true })}
              className="mt-1"
              error={errors.score?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Evaluación
            </label>
            <select
              {...register('evaluation_type')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="exam">Examen</option>
              <option value="assignment">Tarea</option>
              <option value="project">Proyecto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Evaluación
            </label>
            <Input
              type="date"
              {...register('evaluation_date')}
              max={format(new Date(), 'yyyy-MM-dd')}
              className="mt-1"
              error={errors.evaluation_date?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notas (opcional)
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
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
              {initialData ? 'Actualizar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
```