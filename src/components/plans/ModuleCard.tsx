import React from 'react';
import { BookOpen, Clock, Target, Edit2, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import type { Module } from '../../stores/moduleStore';
import { useModuleStore } from '../../stores/moduleStore';

interface ModuleCardProps {
  module: Module;
  onEdit: () => void;
}

export default function ModuleCard({ module, onEdit }: ModuleCardProps) {
  const { deleteModule } = useModuleStore();

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este módulo?')) {
      deleteModule(module.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-medium text-dark">{module.nombre}</h3>
          </div>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            module.nivel === 'basico'
              ? 'bg-green-100 text-green-800'
              : module.nivel === 'intermedio'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-purple-100 text-purple-800'
          }`}>
            {module.nivel}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600">{module.descripcion}</p>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            Duración: {module.duracionSemanas} semanas
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Objetivos
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {module.objetivos.slice(0, 3).map((objetivo, index) => (
                <li key={index}>{objetivo}</li>
              ))}
              {module.objetivos.length > 3 && (
                <li className="text-primary">
                  +{module.objetivos.length - 3} objetivos más...
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}