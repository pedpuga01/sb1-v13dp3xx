import React, { useState } from 'react';
import { Users, Clock, UserCircle, Pencil, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import type { Class } from '../../stores/classStore';
import ClassStudents from './ClassStudents';
import ClassDetailModal from './ClassDetailModal';
import { useStudentStore } from '../../stores/studentStore';
import { useUserStore } from '../../stores/userStore';

interface ClassCardProps {
  clase: Class;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ClassCard({ clase, onEdit, onDelete }: ClassCardProps) {
  const [showStudents, setShowStudents] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const { students } = useStudentStore();
  const { users } = useUserStore();
  const enrolledStudents = students.filter(s => s.clases.includes(clase.id));
  const professor = users.find(u => u.id === clase.profesor);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div 
          className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setShowDetail(true)}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-dark">{clase.nombre}</h3>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              clase.tipo === 'individual' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {clase.tipo === 'individual' ? 'Individual' : 'Grupal'}
            </span>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center text-sm text-gray">
              <UserCircle className="h-4 w-4 mr-2" />
              {professor ? `${professor.nombre} ${professor.apellido}` : 'Profesor no asignado'}
            </div>
            
            <div className="flex items-center text-sm text-gray">
              <Clock className="h-4 w-4 mr-2" />
              {clase.horario.dia} • {clase.horario.horaInicio} - {clase.horario.horaFin}
            </div>
            
            <div className="flex items-center text-sm text-gray">
              <Users className="h-4 w-4 mr-2" />
              {enrolledStudents.length} / {clase.capacidad} estudiantes
            </div>

            {clase.sala && (
              <div className="text-sm text-gray">
                Sala: {clase.sala}
              </div>
            )}
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowStudents(!showStudents);
              }}
            >
              {showStudents ? 'Ocultar Estudiantes' : 'Ver Estudiantes'}
            </Button>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showStudents && (
            <div className="mt-4" onClick={e => e.stopPropagation()}>
              <ClassStudents classId={clase.id} />
            </div>
          )}
        </div>
      </div>

      <ClassDetailModal
        clase={clase}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}