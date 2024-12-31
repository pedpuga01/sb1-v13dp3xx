import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button';
import { usePackageStore } from '../../stores/packageStore';

const packageSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  precio: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
  duracion: z.string().min(1, 'La duración es requerida'),
  clasesPorMes: z.number().min(1, 'Debe haber al menos 1 clase por mes'),
  clasesPorSemana: z.number().optional(),
  tipoClase: z.enum(['individual', 'grupal', 'mixto']),
  beneficios: z.array(z.string()),
  descuento: z.number().min(0).max(100).optional(),
  estado: z.enum(['activo', 'inactivo'])
});

type PackageFormData = z.infer<typeof packageSchema>;

interface PackageFormProps {
  packageId?: string | null;
  onClose: () => void;
}

export default function PackageForm({ packageId, onClose }: PackageFormProps) {
  const { packages, addPackage, updatePackage } = usePackageStore();
  const editingPackage = packageId ? packages.find(p => p.id === packageId) : null;

  const { register, handleSubmit, watch, formState: { errors } } = useForm<PackageFormData>({
    defaultValues: editingPackage || {
      tipoClase: 'individual',
      estado: 'activo',
      beneficios: ['']
    }
  });

  const tipoClase = watch('tipoClase');
  const clasesPorMes = watch('clasesPorMes');

  const onSubmit = (data: PackageFormData) => {
    if (editingPackage) {
      updatePackage(editingPackage.id, data);
    } else {
      addPackage(data);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Nombre del Paquete
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

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <input
            type="number"
            {...register('precio', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descuento (%)
          </label>
          <input
            type="number"
            {...register('descuento', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duración
          </label>
          <input
            type="text"
            {...register('duracion')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Clases por Mes
          </label>
          <input
            type="number"
            {...register('clasesPorMes', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>

        {tipoClase !== 'individual' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Clases por Semana
            </label>
            <input
              type="number"
              {...register('clasesPorSemana', { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
            {clasesPorMes && (
              <p className="mt-1 text-xs text-gray-500">
                Sugerencia: {Math.ceil(clasesPorMes / 4)} clases por semana
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Clase
          </label>
          <select
            {...register('tipoClase')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="individual">Individual</option>
            <option value="grupal">Grupal</option>
            <option value="mixto">Mixto</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            {...register('estado')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Beneficios</h3>
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <input
              key={index}
              type="text"
              {...register(`beneficios.${index}`)}
              placeholder={`Beneficio ${index + 1}`}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {editingPackage ? 'Actualizar' : 'Crear'} Paquete
        </Button>
      </div>
    </form>
  );
}