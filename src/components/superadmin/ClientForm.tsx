import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button';
import { validateRut, formatRut } from '../../utils/rutValidator';

const clientSchema = z.object({
  // Academia
  academyName: z.string().min(1, 'El nombre de la academia es requerido'),
  businessType: z.string().min(1, 'El tipo de negocio es requerido'),
  rut: z.string()
    .min(1, 'El RUT es requerido')
    .refine(
      (val) => validateRut(val),
      'RUT inválido'
    ),
  phone: z.string().min(1, 'El teléfono es requerido'),
  website: z.string().optional(),
  address: z.object({
    street: z.string().min(1, 'La dirección es requerida'),
    number: z.string().min(1, 'El número es requerido'),
    city: z.string().min(1, 'La ciudad es requerida'),
    region: z.string().min(1, 'La región es requerida')
  }),
  
  // Administrador
  adminFirstName: z.string().min(1, 'El nombre es requerido'),
  adminLastName: z.string().min(1, 'El apellido es requerido'),
  adminEmail: z.string().email('Email inválido'),
  adminPhone: z.string().min(1, 'El teléfono es requerido'),
  adminPosition: z.string().min(1, 'El cargo es requerido'),
  
  // Plan
  subscriptionPlan: z.string().min(1, 'El plan es requerido')
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => void;
  onCancel: () => void;
  plans: Array<{ id: string; name: string; maxStudents: number }>;
}

const businessTypes = [
  'Academia de Música',
  'Academia de Danza',
  'Academia de Idiomas',
  'Centro Deportivo',
  'Centro de Artes',
  'Otro'
];

export default function ClientForm({ onSubmit, onCancel, plans }: ClientFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ClientFormData>();

  const handleRutBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const formatted = formatRut(e.target.value);
    setValue('rut', formatted);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Información de la Academia */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información de la Academia</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la Academia
            </label>
            <input
              type="text"
              {...register('academyName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            {errors.academyName && (
              <p className="mt-1 text-sm text-red-600">{errors.academyName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Negocio
            </label>
            <select
              {...register('businessType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="">Seleccionar tipo...</option>
              {businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.businessType && (
              <p className="mt-1 text-sm text-red-600">{errors.businessType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              RUT
            </label>
            <input
              type="text"
              {...register('rut')}
              onBlur={handleRutBlur}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="12.345.678-9"
            />
            {errors.rut && (
              <p className="mt-1 text-sm text-red-600">{errors.rut.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sitio Web (opcional)
            </label>
            <input
              type="url"
              {...register('website')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Dirección</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  {...register('address.street')}
                  placeholder="Calle"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                />
                {errors.address?.street && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  {...register('address.number')}
                  placeholder="Número"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                />
                {errors.address?.number && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.number.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información del Administrador */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Administrador</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              {...register('adminFirstName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            {errors.adminFirstName && (
              <p className="mt-1 text-sm text-red-600">{errors.adminFirstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              {...register('adminLastName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            {errors.adminLastName && (
              <p className="mt-1 text-sm text-red-600">{errors.adminLastName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register('adminEmail')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            {errors.adminEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.adminEmail.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              {...register('adminPhone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            {errors.adminPhone && (
              <p className="mt-1 text-sm text-red-600">{errors.adminPhone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cargo
            </label>
            <input
              type="text"
              {...register('adminPosition')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Director, Gerente, etc."
            />
            {errors.adminPosition && (
              <p className="mt-1 text-sm text-red-600">{errors.adminPosition.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Plan de Suscripción
            </label>
            <select
              {...register('subscriptionPlan')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="">Seleccionar plan...</option>
              {plans.map(plan => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} (hasta {plan.maxStudents} estudiantes)
                </option>
              ))}
            </select>
            {errors.subscriptionPlan && (
              <p className="mt-1 text-sm text-red-600">{errors.subscriptionPlan.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Crear Academia
        </Button>
      </div>
    </form>
  );
}