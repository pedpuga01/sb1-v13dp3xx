import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useStudents } from '@/hooks/use-students';

const studentSchema = z.object({
  full_name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormProps {
  onClose: () => void;
  studentId?: string;
}

export function StudentForm({ onClose, studentId }: StudentFormProps) {
  const [loading, setLoading] = useState(false);
  const { addStudent } = useStudents();
  const { register, handleSubmit, formState: { errors } } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: StudentFormData) => {
    try {
      setLoading(true);
      await addStudent({
        ...data,
        role: 'student',
      });
      onClose();
    } catch (error) {
      console.error('Error al crear estudiante:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-medium mb-4">
          {studentId ? 'Editar Estudiante' : 'Nuevo Estudiante'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre Completo
            </label>
            <Input
              {...register('full_name')}
              className="mt-1"
              error={errors.full_name?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              {...register('email')}
              className="mt-1"
              error={errors.email?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <Input
              type="tel"
              {...register('phone')}
              className="mt-1"
              error={errors.phone?.message}
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
              {studentId ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}