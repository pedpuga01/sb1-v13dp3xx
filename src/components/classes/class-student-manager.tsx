import { useState } from 'react';
import { Search, UserPlus, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStudents } from '@/hooks/use-students';
import { StudentForm } from '../students/student-form';

interface ClassStudentManagerProps {
  classId: string;
  onClose: () => void;
}

export function ClassStudentManager({ classId, onClose }: ClassStudentManagerProps) {
  const [search, setSearch] = useState('');
  const [showStudentForm, setShowStudentForm] = useState(false);
  const { students, loading } = useStudents();

  // TODO: Get enrolled students
  const enrolledStudents: string[] = [];

  const availableStudents = students.filter(student => 
    !enrolledStudents.includes(student.id) &&
    (student.full_name?.toLowerCase().includes(search.toLowerCase()) ||
     student.email.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddStudent = async (studentId: string) => {
    try {
      // TODO: Implement add student to class
      console.log('Adding student', studentId, 'to class', classId);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleRemoveStudent = async (studentId: string) => {
    try {
      // TODO: Implement remove student from class
      console.log('Removing student', studentId, 'from class', classId);
    } catch (error) {
      console.error('Error removing student:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Gestionar Estudiantes
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Estudiantes inscritos */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Estudiantes Inscritos
              </h3>
              <div className="space-y-2">
                {enrolledStudents.length > 0 ? (
                  students
                    .filter(s => enrolledStudents.includes(s.id))
                    .map(student => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {student.full_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {student.email}
                          </p>
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
                  <p className="text-sm text-gray-500">
                    No hay estudiantes inscritos
                  </p>
                )}
              </div>
            </div>

            {/* Agregar estudiantes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Agregar Estudiantes
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowStudentForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Estudiante
                </Button>
              </div>

              <Input
                placeholder="Buscar estudiantes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={<Search className="h-4 w-4" />}
                className="mb-4"
              />

              <div className="space-y-2">
                {loading ? (
                  <p className="text-sm text-gray-500">Cargando estudiantes...</p>
                ) : availableStudents.length > 0 ? (
                  availableStudents.map(student => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {student.full_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {student.email}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddStudent(student.id)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Agregar
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No hay estudiantes disponibles
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showStudentForm && (
        <StudentForm onClose={() => setShowStudentForm(false)} />
      )}
    </div>
  );
}