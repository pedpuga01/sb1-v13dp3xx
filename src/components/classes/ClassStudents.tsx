import React, { useState } from 'react';
import { Search, UserPlus, UserMinus } from 'lucide-react';
import Button from '../ui/Button';
import { useStudentStore } from '../../stores/studentStore';
import { useClassStore } from '../../stores/classStore';

interface ClassStudentsProps {
  classId: string;
}

export default function ClassStudents({ classId }: ClassStudentsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { students, addClassToStudent, removeClassFromStudent } = useStudentStore();
  const { classes } = useClassStore();
  const currentClass = classes.find(c => c.id === classId);

  const enrolledStudents = students.filter(student => 
    student.clases.includes(classId)
  );

  const availableStudents = students.filter(student => 
    !student.clases.includes(classId) &&
    (student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.rut.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddStudent = (studentId: string) => {
    if (currentClass && enrolledStudents.length < currentClass.capacidad) {
      addClassToStudent(studentId, classId);
    }
  };

  const handleRemoveStudent = (studentId: string) => {
    removeClassFromStudent(studentId, classId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-dark mb-4">Estudiantes Inscritos</h3>
        {enrolledStudents.length > 0 ? (
          <div className="space-y-2">
            {enrolledStudents.map(student => (
              <div 
                key={student.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {student.nombre} {student.apellido}
                  </p>
                  <p className="text-sm text-gray-500">{student.rut}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveStudent(student.id)}
                >
                  <UserMinus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No hay estudiantes inscritos</p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-dark mb-4">Agregar Estudiantes</h3>
        <div className="mb-4">
          <div className="relative rounded-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Buscar estudiantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {availableStudents.length > 0 ? (
          <div className="space-y-2">
            {availableStudents.map(student => (
              <div 
                key={student.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {student.nombre} {student.apellido}
                  </p>
                  <p className="text-sm text-gray-500">{student.rut}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddStudent(student.id)}
                  disabled={currentClass && enrolledStudents.length >= currentClass.capacidad}
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No hay estudiantes disponibles</p>
        )}
      </div>
    </div>
  );
}