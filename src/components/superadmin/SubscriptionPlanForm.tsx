import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { X } from 'lucide-react';
import Button from '../ui/Button';

const planSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  price: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
  billingPeriod: z.enum(['monthly', 'yearly']),
  maxStudents: z.number().min(1, 'La cantidad máxima de estudiantes debe ser mayor a 0'),
  features: z.array(z.string()),
  isPopular: z.boolean().optional(),
  status: z.enum(['active', 'inactive'])
});

type PlanFormData = z.infer<typeof planSchema>;

interface SubscriptionPlanFormProps {
  onSubmit: (data: PlanFormData) => void;
  onClose: () => void;
  initialData?: PlanFormData;
}

export default function SubscriptionPlanForm({ onSubmit, onClose, initialData }: SubscriptionPlanFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PlanFormData>({
    defaultValues: initialData || {
      billingPeriod: 'monthly',
      status: 'active',
      features: [''],
      isPopular: false
    }
  });

  const features = watch('features');

  const addFeature = () => {
    setValue('features', [...features, '']);
  };

  const removeFeature = (index: number) => {
    setValue('features', features.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Nombre del Plan
          </label>
          <input
            type="text"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="ej. Plan Profesional"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Describe las características principales del plan"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              {...register('price', { valueAsNumber: true })}
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="0.00"
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Período de Facturación
          </label>
          <select
            {...register('billingPeriod')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="monthly">Mensual</option>
            <option value="yearly">Anual</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Máximo de Estudiantes
          </label>
          <input
            type="number"
            {...register('maxStudents', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {errors.maxStudents && (
            <p className="mt-1 text-sm text-red-600">{errors.maxStudents.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Características
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFeature}
            >
              Agregar
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {features.map((_, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  {...register(`features.${index}`)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  placeholder="ej. Hasta 100 estudiantes"
                />
                {features.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('isPopular')}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Marcar como plan más popular
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {initialData ? 'Actualizar' : 'Crear'} Plan
        </Button>
      </div>
    </form>
  );
}