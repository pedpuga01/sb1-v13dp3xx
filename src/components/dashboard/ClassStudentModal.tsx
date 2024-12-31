import React, { useState } from 'react';
import { Search, UserPlus, X, Plus } from 'lucide-react';
import Button from '../ui/Button';
import { useClassStore } from '../../stores/classStore';
import { useStudentStore } from '../../stores/studentStore';
import StudentForm from '../students/StudentForm';

interface ClassStudentModalProps {
  classId: string;
  onClose: () => void;
  onCreateStudent?: () => void;
}

export default function ClassStudentModal({ classId, onClose }: ClassStudentModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showStudentForm, setShowStudentForm] = useState(false);
  const { classes } = useClassStore();
  const { students, addStudent, addClassToStudent, removeClassFromStudent } = useStudentStore();

  const currentClass = classes.find(c => c.id === classId);
  const enrolledStudents = students.filter(s => s.clases.includes(classId));
  
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

  const handleCreateStudent = (data: any) => {
    const newStudent = addStudent(data);
    if (newStudent) {
      addClassToStudent(newStudent.id, classId);
    }
    setShowStudentForm(false);
  };

  if (!currentClass) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      {showStudentForm ? (
        <div className="bg-white rounded-lg w-full max-w-4xl my-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                Nuevo Estudiante
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowStudentForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <StudentForm
              onSubmit={handleCreateStudent}
              onCancel={() => setShowStudentForm(false)}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg w-full max-w-2xl my-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                Gestionar Alumnos - {currentClass.nombre}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Alumnos Inscritos ({enrolledStudents.length}/{currentClass.capacidad})
                </h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {enrolledStudents.length > 0 ? (
                    enrolledStudents.map(student => (
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveStudent(student.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-2">
                      No hay alumnos inscritos
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    Agregar Alumnos
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowStudentForm(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Alumno
                  </Button>
                </div>

                <div className="mb-4">
                  <div className="relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Buscar alumnos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {availableStudents.length > 0 ? (
                    availableStudents.map(student => (
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddStudent(student.id)}
                          disabled={enrolledStudents.length >= currentClass.capacidad}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Agregar
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-2">
                      No hay alumnos disponibles
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}