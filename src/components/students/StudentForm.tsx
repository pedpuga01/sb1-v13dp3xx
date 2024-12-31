import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button';
import { regions, getComunasByRegion } from '../../data/locations';
import { PhoneInput } from '../ui/PhoneInput';
import { format } from 'date-fns';

const studentSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido: z.string().min(1, 'El apellido es requerido'),
  rut: z.string().min(1, 'El RUT es requerido'),
  email: z.string().email('Email inválido'),
  telefono: z.string().optional(),
  fechaNacimiento: z.string(),
  tieneApoderado: z.boolean().default(false),
  direccion: z.object({
    calle: z.string().min(1, 'La dirección es requerida'),
    numero: z.string().min(1, 'El número es requerido'),
    regionId: z.string().min(1, 'La región es requerida'),
    comunaId: z.string().min(1, 'La comuna es requerida'),
    departamento: z.string().optional(),
  }),
  apoderado: z.object({
    nombre: z.string().optional(),
    telefono: z.string().optional(),
    email: z.string().email('Email inválido').optional(),
  }).optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormProps {
  onSubmit: (data: StudentFormData) => void;
  onCancel: () => void;
  initialData?: StudentFormData;
}

export default function StudentForm({ onSubmit, onCancel, initialData }: StudentFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<StudentFormData>({
    defaultValues: initialData || {
      tieneApoderado: false,
      direccion: {
        regionId: '13',
        comunaId: '',
      },
    }
  });

  const selectedRegionId = watch('direccion.regionId');
  const tieneApoderado = watch('tieneApoderado');
  const comunasDisponibles = selectedRegionId ? getComunasByRegion(selectedRegionId) : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Datos Personales */}
        <div className="sm:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Datos Personales</h3>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Nombre
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

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Apellido
          </label>
          <input
            type="text"
            {...register('apellido')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {errors.apellido && (
            <p className="mt-1 text-sm text-red-600">{errors.apellido.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            RUT
          </label>
          <input
            type="text"
            {...register('rut')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="12.345.678-9"
          />
          {errors.rut && (
            <p className="mt-1 text-sm text-red-600">{errors.rut.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            {...register('fechaNacimiento')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {errors.fechaNacimiento && (
            <p className="mt-1 text-sm text-red-600">{errors.fechaNacimiento.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <PhoneInput
            value={watch('telefono')}
            onChange={(value) => setValue('telefono', value)}
            className="mt-1"
          />
        </div>

        {/* Dirección */}
        <div className="sm:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Dirección</h3>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Región
          </label>
          <select
            {...register('direccion.regionId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            onChange={(e) => {
              setValue('direccion.regionId', e.target.value);
              setValue('direccion.comunaId', '');
            }}
          >
            {regions.map(region => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Comuna
          </label>
          <select
            {...register('direccion.comunaId')}
            disabled={!selectedRegionId}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">Seleccione Comuna</option>
            {comunasDisponibles.map(comuna => (
              <option key={comuna.id} value={comuna.id}>
                {comuna.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Calle
          </label>
          <input
            type="text"
            {...register('direccion.calle')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Número
          </label>
          <input
            type="text"
            {...register('direccion.numero')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        {/* Apoderado */}
        <div className="sm:col-span-2">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              {...register('tieneApoderado')}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Registrar Apoderado
            </label>
          </div>

          {tieneApoderado && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre del Apoderado
                </label>
                <input
                  type="text"
                  {...register('apoderado.nombre')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email del Apoderado
                </label>
                <input
                  type="email"
                  {...register('apoderado.email')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Teléfono del Apoderado
                </label>
                <PhoneInput
                  value={watch('apoderado.telefono')}
                  onChange={(value) => setValue('apoderado.telefono', value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
        <Button variant="outline" type="button" onClick={onCancel} fullWidth>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" fullWidth>
          {initialData ? 'Actualizar' : 'Crear'} Estudiante
        </Button>
      </div>
    </form>
  );
}