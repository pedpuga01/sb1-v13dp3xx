import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button';
import { useAcademyStore } from '../../stores/academyStore';
import { regions, getComunasByRegion } from '../../data/locations';

const academySchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  razonSocial: z.string().min(1, 'La razón social es requerida'),
  rut: z.string().min(1, 'El RUT es requerido'),
  tipo: z.enum(['persona_natural', 'sociedad_limitada', 'sociedad_anonima']),
  direccion: z.object({
    calle: z.string().min(1, 'La dirección es requerida'),
    numero: z.string().min(1, 'El número es requerido'),
    regionId: z.string().min(1, 'La región es requerida'),
    comunaId: z.string().min(1, 'La comuna es requerida'),
  }),
  contacto: z.object({
    email: z.string().email('Email inválido'),
    telefono: z.string().min(1, 'El teléfono es requerido'),
    sitioWeb: z.string().optional(),
  }),
});

type AcademyFormData = z.infer<typeof academySchema>;

export default function AcademySettings() {
  const { academy, updateAcademy } = useAcademyStore();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<AcademyFormData>({
    defaultValues: {
      ...academy,
      direccion: {
        ...academy.direccion,
        regionId: '',
        comunaId: '',
      }
    }
  });

  const selectedRegionId = watch('direccion.regionId');
  const comunasDisponibles = selectedRegionId ? getComunasByRegion(selectedRegionId) : [];

  const onSubmit = (data: AcademyFormData) => {
    updateAcademy(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ... otros campos ... */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
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
            <option value="">Seleccione Región</option>
            {regions.map(region => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
          {errors.direccion?.regionId && (
            <p className="mt-1 text-sm text-red-600">{errors.direccion.regionId.message}</p>
          )}
        </div>

        <div>
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
          {errors.direccion?.comunaId && (
            <p className="mt-1 text-sm text-red-600">{errors.direccion.comunaId.message}</p>
          )}
        </div>

        {/* ... resto del formulario ... */}
      </div>
    </form>
  );
}