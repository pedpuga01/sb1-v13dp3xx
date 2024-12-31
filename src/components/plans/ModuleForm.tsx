import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button';
import { useModuleStore } from '../../stores/moduleStore';

const moduleSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  nivel: z.enum(['basico', 'intermedio', 'avanzado']),
  duracionSemanas: z.number().min(1, 'La duración debe ser al menos 1 semana'),
  objetivos: z.array(z.string()),
  contenidos: z.array(z.object({
    titulo: z.string(),
    descripcion: z.string()
  }))
});

type ModuleFormData = z.infer<typeof moduleSchema>;

interface ModuleFormProps {
  moduleId?: string | null;
  onClose: () => void;
}

export default function ModuleForm({ moduleId, onClose }: ModuleFormProps) {
  const { modules, addModule, updateModule } = useModuleStore();
  const editingModule = moduleId ? modules.find(m => m.id === moduleId) : null;

  const { register, handleSubmit, formState: { errors } } = useForm<ModuleFormData>({
    defaultValues: editingModule || {
      nivel: 'basico',
      objetivos: [''],
      contenidos: [{ titulo: '', descripcion: '' }]
    }
  });

  const onSubmit = (data: ModuleFormData) => {
    if (editingModule) {
      updateModule(editingModule.id, data);
    } else {
      addModule(data);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Nombre del Módulo
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
            Nivel
          </label>
          <select
            {...register('nivel')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="basico">Básico</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duración (semanas)
          </label>
          <input
            type="number"
            {...register('duracionSemanas', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Objetivos</h3>
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <input
              key={index}
              type="text"
              {...register(`objetivos.${index}`)}
              placeholder={`Objetivo ${index + 1}`}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contenidos</h3>
        <div className="space-y-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                {...register(`contenidos.${index}.titulo`)}
                placeholder="Título del contenido"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              <textarea
                {...register(`contenidos.${index}.descripcion`)}
                placeholder="Descripción del contenido"
                rows={2}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {editingModule ? 'Actualizar' : 'Crear'} Módulo
        </Button>
      </div>
    </form>
  );
}