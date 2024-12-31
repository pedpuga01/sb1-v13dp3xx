import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../ui/Button';
import { useProgressStore } from '../../stores/progressStore';
import { useAuthStore } from '../../stores/authStore';

const noteSchema = z.object({
  contenido: z.string().min(1, 'El contenido es requerido'),
  tipo: z.enum(['avance', 'observacion', 'evaluacion']),
  aspectos: z.object({
    tecnica: z.number().min(1).max(5).optional(),
    interpretacion: z.number().min(1).max(5).optional(),
    ritmo: z.number().min(1).max(5).optional(),
    afinacion: z.number().min(1).max(5).optional()
  }).optional(),
  objetivosLogrados: z.array(z.string()).optional(),
  recomendaciones: z.string().optional()
});

type NoteFormData = z.infer<typeof noteSchema>;

interface AddProgressNoteProps {
  studentId: string;
  moduleId: string;
  onClose: () => void;
}

export default function AddProgressNote({ studentId, moduleId, onClose }: AddProgressNoteProps) {
  const { addNote } = useProgressStore();
  const { userData } = useAuthStore();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<NoteFormData>();

  const tipo = watch('tipo');

  const onSubmit = (data: NoteFormData) => {
    addNote({
      studentId,
      moduleId,
      fecha: new Date().toISOString(),
      profesor: userData?.displayName || 'Profesor',
      ...data
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Nota
        </label>
        <select
          {...register('tipo')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="avance">Avance</option>
          <option value="observacion">Observación</option>
          <option value="evaluacion">Evaluación</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contenido
        </label>
        <textarea
          {...register('contenido')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {errors.contenido && (
          <p className="mt-1 text-sm text-red-600">{errors.contenido.message}</p>
        )}
      </div>

      {tipo === 'evaluacion' && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Aspectos a Evaluar</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Técnica</label>
              <input
                type="number"
                min="1"
                max="5"
                {...register('aspectos.tecnica', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Interpretación</label>
              <input
                type="number"
                min="1"
                max="5"
                {...register('aspectos.interpretacion', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Ritmo</label>
              <input
                type="number"
                min="1"
                max="5"
                {...register('aspectos.ritmo', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Afinación</label>
              <input
                type="number"
                min="1"
                max="5"
                {...register('aspectos.afinacion', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Recomendaciones
        </label>
        <textarea
          {...register('recomendaciones')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Guardar Nota
        </Button>
      </div>
    </form>
  );
}