import React from 'react';
import { X, Users, Clock, UserCircle, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import type { Class } from '../../stores/classStore';
import { useStudentStore } from '../../stores/studentStore';
import { useRoomStore } from '../../stores/roomStore';

interface ClassDetailModalProps {
  clase: Class;
  isOpen: boolean;
  onClose: () => void;
}

export default function ClassDetailModal({ clase, isOpen, onClose }: ClassDetailModalProps) {
  const { students } = useStudentStore();
  const { getRoom } = useRoomStore();
  
  const enrolledStudents = students.filter(s => s.clases.includes(clase.id));
  const room = clase.sala ? getRoom(clase.sala) : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium text-dark">{clase.nombre}</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Información básica */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <UserCircle className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Profesor</p>
                  <p className="text-gray-900">{clase.profesor}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Horario</p>
                  <p className="text-gray-900">
                    {clase.horario.dia} • {clase.horario.horaInicio} - {clase.horario.horaFin}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Capacidad</p>
                  <p className="text-gray-900">
                    {enrolledStudents.length} / {clase.capacidad} estudiantes
                  </p>
                </div>
              </div>

              {room && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Sala</p>
                    <p className="text-gray-900">{room.nombre}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Detalles de la sala */}
            {room && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-dark mb-4">Detalles de la Sala</h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{room.descripcion}</p>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Equipamiento</h4>
                    <div className="flex flex-wrap gap-2">
                      {room.equipamiento.map((equipo, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {equipo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lista de estudiantes */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-dark mb-4">Estudiantes Inscritos</h3>
              {enrolledStudents.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {enrolledStudents.map(student => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {student.nombre} {student.apellido}
                        </p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                      {student.telefono && (
                        <p className="text-sm text-gray-500">{student.telefono}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No hay estudiantes inscritos</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}