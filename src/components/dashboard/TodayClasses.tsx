import React, { useState } from 'react';
import { Clock, Users, MapPin, UserPlus, Plus } from 'lucide-react';
import { useClassStore } from '../../stores/classStore';
import { useStudentStore } from '../../stores/studentStore';
import { useRoomStore } from '../../stores/roomStore';
import Button from '../ui/Button';
import ClassStudentModal from './ClassStudentModal';
import StudentForm from '../students/StudentForm';

export default function TodayClasses() {
  const { classes } = useClassStore();
  const { students } = useStudentStore();
  const { rooms } = useRoomStore();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [showStudentForm, setShowStudentForm] = useState(false);

  const today = new Date().getDay();
  const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  const todayClasses = classes
    .filter(c => c.horario.dia.toLowerCase() === dias[today])
    .sort((a, b) => {
      const timeA = a.horario.horaInicio.replace(':', '');
      const timeB = b.horario.horaInicio.replace(':', '');
      return parseInt(timeA) - parseInt(timeB);
    });

  const getStudentCount = (classId: string) => {
    return students.filter(s => s.clases.includes(classId)).length;
  };

  const getRoomName = (roomId?: string) => {
    if (!roomId) return 'Sin sala asignada';
    const room = rooms.find(r => r.id === roomId);
    return room ? room.nombre : 'Sin sala asignada';
  };

  const handleCloseModal = () => {
    setSelectedClass(null);
    setShowStudentForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Clases de Hoy
        </h3>

        <div className="space-y-3">
          {todayClasses.length > 0 ? (
            todayClasses.map((clase) => (
              <div
                key={clase.id}
                className={`p-4 rounded-lg border ${
                  clase.tipo === 'individual'
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-purple-200 bg-purple-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{clase.nombre}</h4>
                    <div className="mt-1 space-y-1">
                      <p className="text-sm text-gray-600">
                        Profesor: {clase.profesor}
                      </p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {clase.horario.horaInicio} - {clase.horario.horaFin}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        {getStudentCount(clase.id)} / {clase.capacidad} estudiantes
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        {getRoomName(clase.sala)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      clase.tipo === 'individual'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {clase.tipo}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedClass(clase.id)}
                    >
                      <UserPlus className="h-4 w-4 mr-1" />
                      Gestionar Alumnos
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No hay clases programadas para hoy
            </p>
          )}
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
    </div>
  );
}