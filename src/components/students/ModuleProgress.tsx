import React from 'react';
import { Book, CheckCircle, Clock } from 'lucide-react';
import { useModuleStore } from '../../stores/moduleStore';
import { useProgressStore } from '../../stores/progressStore';
import Button from '../ui/Button';

interface ModuleProgressProps {
  studentId: string;
  moduleData: {
    id: string;
    fechaInicio: string;
    fechaFin?: string;
    estado: 'en_curso' | 'completado' | 'pendiente';
    progreso: number;
  };
  onAddNote: (moduleId: string) => void;
}

export default function ModuleProgress({ studentId, moduleData, onAddNote }: ModuleProgressProps) {
  const { modules } = useModuleStore();
  const { getModuleNotes } = useProgressStore();
  
  const module = modules.find(m => m.id === moduleData.id);
  const notes = getModuleNotes(studentId, moduleData.id);

  if (!module) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Book className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-lg font-medium text-dark">{module.nombre}</h3>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          moduleData.estado === 'completado'
            ? 'bg-green-100 text-green-800'
            : moduleData.estado === 'en_curso'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {moduleData.estado === 'completado' ? 'Completado' : 
           moduleData.estado === 'en_curso' ? 'En Curso' : 'Pendiente'}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">{module.descripcion}</p>
        <div className="mt-2">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Progreso: {moduleData.progreso}%</span>
            <span>Nivel: {module.nivel}</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${moduleData.progreso}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Objetivos</h4>
          <ul className="list-disc list-inside space-y-1">
            {module.objetivos.map((objetivo, index) => (
              <li key={index} className="text-sm text-gray-600">
                {objetivo}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-900">Notas de Progreso</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddNote(moduleData.id)}
            >
              Agregar Nota
            </Button>
          </div>
          
          {notes.length > 0 ? (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(note.fecha).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      note.tipo === 'avance'
                        ? 'bg-green-100 text-green-800'
                        : note.tipo === 'evaluacion'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {note.tipo}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{note.contenido}</p>
                  {note.aspectos && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {Object.entries(note.aspectos).map(([aspecto, valor]) => (
                        <div key={aspecto} className="text-xs text-gray-500">
                          {aspecto}: {valor}/5
                        </div>
                      ))}
                    </div>
                  )}
                  {note.recomendaciones && (
                    <p className="mt-2 text-sm text-gray-600">
                      <strong>Recomendaciones:</strong> {note.recomendaciones}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No hay notas registradas</p>
          )}
        </div>
      </div>
    </div>
  );
}