import React, { useState } from 'react';
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useClassStore } from '../../stores/classStore';
import { useStudentStore } from '../../stores/studentStore';
import Button from '../ui/Button';
import ClassStudentModal from './ClassStudentModal';
import StudentForm from '../students/StudentForm';

export default function WeeklyCalendar() {
  const { classes } = useClassStore();
  const { students } = useStudentStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [showStudentForm, setShowStudentForm] = useState(false);
  
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = [...Array(7)].map((_, i) => addDays(startOfCurrentWeek, i));

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'next' ? addWeeks(prev, 1) : subWeeks(prev, 1)
    );
  };

  const getClassesForDay = (date: Date) => {
    return classes.filter(clase => {
      const diaIndex = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
        .indexOf(clase.horario.dia.toLowerCase());
      return diaIndex === date.getDay() - 1 || (diaIndex === 6 && date.getDay() === 0);
    });
  };

  const getStudentCount = (classId: string) => {
    return students.filter(student => student.clases.includes(classId)).length;
  };

  const handleCloseModal = () => {
    setSelectedClass(null);
    setShowStudentForm(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        {/* Navegación del calendario */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              {format(startOfCurrentWeek, "MMMM yyyy", { locale: es })}
            </h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateWeek('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Hoy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateWeek('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 divide-x divide-gray-200">
          {weekDays.map((day) => (
            <div
              key={day.toString()}
              className={`min-h-[200px] ${
                isSameDay(day, new Date()) ? 'bg-primary/5' : ''
              }`}
            >
              <div className="px-2 py-2 border-b border-gray-200">
                <h3 className="text-xs font-medium text-gray-500 uppercase">
                  {format(day, 'EEE', { locale: es })}
                </h3>
                <p className={`mt-1 font-semibold ${
                  isSameDay(day, new Date()) ? 'text-primary' : 'text-gray-900'
                }`}>
                  {format(day, 'd')}
                </p>
              </div>
              <div className="p-2 space-y-1 overflow-y-auto max-h-[300px]">
                {getClassesForDay(day).map((clase) => (
                  <div
                    key={clase.id}
                    onClick={() => setSelectedClass(clase.id)}
                    className={`p-2 rounded-md text-xs cursor-pointer transition-colors hover:opacity-80 ${
                      clase.tipo === 'individual' 
                        ? 'bg-blue-100 text-blue-800 border border-gray-200' 
                        : 'bg-purple-100 text-purple-800 border border-gray-200'
                    }`}
                  >
                    <div className="font-medium">{clase.nombre}</div>
                    {clase.sala && (
                      <div className="text-xs opacity-75">Sala: {clase.sala}</div>
                    )}
                    <div className="flex items-center mt-1 text-xs opacity-75">
                      <Clock className="h-3 w-3 mr-1" />
                      {clase.horario.horaInicio} - {clase.horario.horaFin}
                    </div>
                    <div className="flex items-center mt-1 text-xs opacity-75">
                      <Users className="h-3 w-3 mr-1" />
                      {getStudentCount(clase.id)} / {clase.capacidad}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedClass && (
        <ClassStudentModal
          classId={selectedClass}
          onClose={handleCloseModal}
          onCreateStudent={() => setShowStudentForm(true)}
        />
      )}

      {showStudentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Nuevo Estudiante
              </h2>
              <StudentForm
                onSubmit={(data) => {
                  // Aquí se maneja la creación del estudiante
                  setShowStudentForm(false);
                }}
                onCancel={() => setShowStudentForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}