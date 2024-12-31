import React, { useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import { useAcademyStore } from '../../stores/academyStore';

export default function NonWorkingDays() {
  const [showForm, setShowForm] = useState(false);
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const { academy, addNonWorkingDay, removeNonWorkingDay } = useAcademyStore();
  const { diasNoLaborables } = academy.configuracion;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fecha && descripcion) {
      addNonWorkingDay(fecha, descripcion);
      setFecha('');
      setDescripcion('');
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-dark">Días No Laborables</h2>
        <Button
          variant="primary"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Día
        </Button>
      </div>

      {showForm && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha
              </label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                placeholder="Ej: Feriado Nacional, Vacaciones, etc."
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {diasNoLaborables.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {diasNoLaborables
              .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
              .map((dia) => (
                <div
                  key={dia.fecha}
                  className="p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(dia.fecha).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">{dia.descripcion}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeNonWorkingDay(dia.fecha)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            No hay días no laborables configurados
          </div>
        )}
      </div>
    </div>
  );
}