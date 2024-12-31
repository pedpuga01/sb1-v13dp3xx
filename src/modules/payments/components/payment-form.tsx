```typescript
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { format } from 'date-fns';

const paymentSchema = z.object({
  student_id: z.string().min(1, 'El estudiante es requerido'),
  amount: z.number().min(1, 'El monto debe ser mayor a 0'),
  due_date: z.string().min(1, 'La fecha de vencimiento es requerida'),
  payment_method: z.enum(['cash', 'transfer', 'card']),
  notes: z.string().optional()
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => Promise<void>;
  onClose: () => void;
  students: Array<{ id: string; full_name: string }>;
}

export function PaymentForm({ onSubmit, onClose, students }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema)
  });

  const handleFormSubmit = async (data: PaymentFormData) => {
    try {
      setLoading(true);
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Error al crear pago:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Nuevo Pago</h2>
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
              Monto
            </label>
            <Input
              type="number"
              {...register('amount', { valueAsNumber: true })}
              className="mt-1"
              error={errors.amount?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Vencimiento
            </label>
            <Input
              type="date"
              {...register('due_date')}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="mt-1"
              error={errors.due_date?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Método de Pago
            </label>
            <select
              {...register('payment_method')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="cash">Efectivo</option>
              <option value="transfer">Transferencia</option>
              <option value="card">Tarjeta</option>
            </select>
            {errors.payment_method && (
              <p className="mt-1 text-sm text-red-600">{errors.payment_method.message}</p>
            )}
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
              Crear Pago
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
```