import React, { useState } from 'react';
import { Clock, Plus, Trash2, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useAcademyStore, type DaySchedule } from '../../stores/academyStore';

const diasSemana = [
  { id: 'lunes', label: 'Lunes' },
  { id: 'martes', label: 'Martes' },
  { id: 'miercoles', label: 'Miércoles' },
  { id: 'jueves', label: 'Jueves' },
  { id: 'viernes', label: 'Viernes' },
  { id: 'sabado', label: 'Sábado' },
  { id: 'domingo', label: 'Domingo' }
];

export default function ScheduleSettings() {
  const { academy, updateDaySchedule, addBreakTime, removeBreakTime } = useAcademyStore();
  const [selectedDay, setSelectedDay] = useState('lunes');
  const [showBreakForm, setShowBreakForm] = useState(false);
  const [newBreak, setNewBreak] = useState({ inicio: '', fin: '' });

  const handleScheduleChange = (field: keyof DaySchedule, value: any) => {
    const currentSchedule = academy.configuracion.horarios[selectedDay];
    updateDaySchedule(selectedDay, {
      ...currentSchedule,
      [field]: value
    });
  };

  const handleAddBreak = () => {
    if (newBreak.inicio && newBreak.fin) {
      addBreakTime(selectedDay, newBreak);
      setNewBreak({ inicio: '', fin: '' });
      setShowBreakForm(false);
    }
  };

  const validateBreakTime = (inicio: string, fin: string) => {
    const schedule = academy.configuracion.horarios[selectedDay];
    return inicio >= schedule.horaInicio && 
           fin <= schedule.horaFin &&
           inicio < fin;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Horarios de Operación</h2>
        <p className="mt-1 text-sm text-gray-500">
          Configura los horarios específicos para cada día de la semana
        </p>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-2">
        {diasSemana.map(({ id, label }) => (
          <Button
            key={id}
            variant={selectedDay === id ? 'primary' : 'outline'}
            onClick={() => setSelectedDay(id)}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={academy.configuracion.horarios[selectedDay].active}
                  onChange={(e) => handleScheduleChange('active', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">Día activo</span>
              </div>
            </div>

            {academy.configuracion.horarios[selectedDay].active && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Hora de Inicio
                    </label>
                    <input
                      type="time"
                      value={academy.configuracion.horarios[selectedDay].horaInicio}
                      onChange={(e) => handleScheduleChange('horaInicio', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Hora de Cierre
                    </label>
                    <input
                      type="time"
                      value={academy.configuracion.horarios[selectedDay].horaFin}
                      onChange={(e) => handleScheduleChange('horaFin', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900">Períodos de Descanso</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowBreakForm(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Descanso
                    </Button>
                  </div>

                  {showBreakForm && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Inicio
                          </label>
                          <input
                            type="time"
                            value={newBreak.inicio}
                            onChange={(e) => setNewBreak({ ...newBreak, inicio: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Fin
                          </label>
                          <input
                            type="time"
                            value={newBreak.fin}
                            onChange={(e) => setNewBreak({ ...newBreak, fin: e.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setShowBreakForm(false);
                            setNewBreak({ inicio: '', fin: '' });
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={handleAddBreak}
                          disabled={!validateBreakTime(newBreak.inicio, newBreak.fin)}
                        >
                          Agregar
                        </Button>
                      </div>

                      {!validateBreakTime(newBreak.inicio, newBreak.fin) && newBreak.inicio && newBreak.fin && (
                        <div className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          El período de descanso debe estar dentro del horario de operación
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    {academy.configuracion.horarios[selectedDay].descansos?.map((descanso, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {descanso.inicio} - {descanso.fin}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeBreakTime(selectedDay, index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}