import React, { useState, useRef } from 'react';
import { PlusCircle, Search, Download, Upload } from 'lucide-react';
import Button from '../components/ui/Button';
import StudentTable from '../components/students/StudentTable';
import StudentForm from '../components/students/StudentForm';
import StudentDetail from '../components/students/StudentDetail';
import ImportStudentsModal from '../components/students/ImportStudentsModal';
import { useStudentStore } from '../stores/studentStore';
import { exportStudentsTemplate, exportStudentsData } from '../utils/exportUtils';

export default function Students() {
  const [showForm, setShowForm] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { students, addStudent, updateStudent, deleteStudent, getStudent } = useStudentStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (data: any) => {
    if (editingStudent) {
      updateStudent(editingStudent, data);
    } else {
      addStudent(data);
    }
    setShowForm(false);
    setEditingStudent(null);
    setSelectedStudent(null);
  };

  const handleEdit = (studentId: string) => {
    setEditingStudent(studentId);
    setShowForm(true);
    setSelectedStudent(null);
  };

  const handleDelete = (studentId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      deleteStudent(studentId);
      setSelectedStudent(null);
    }
  };

  const handleRowClick = (studentId: string) => {
    setSelectedStudent(studentId);
    setShowForm(false);
    setEditingStudent(null);
  };

  const filteredStudents = students.filter(student => 
    student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rut.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStudentData = selectedStudent ? getStudent(selectedStudent) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-futura text-dark">Estudiantes</h1>
          <p className="text-gray-600">Gestiona los estudiantes de la academia</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={() => exportStudentsTemplate()}
          >
            <Download className="h-4 w-4 mr-2" />
            Descargar Plantilla
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowImportModal(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar Alumnos
          </Button>
          <Button 
            variant="outline"
            onClick={() => exportStudentsData(students)}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar Alumnos
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              setEditingStudent(null);
              setShowForm(true);
              setSelectedStudent(null);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Nuevo Estudiante
          </Button>
        </div>
      </div>

      {showForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <StudentForm
            onSubmit={handleSubmit}
            initialData={editingStudent ? students.find(s => s.id === editingStudent) : undefined}
            onCancel={() => {
              setShowForm(false);
              setEditingStudent(null);
            }}
          />
        </div>
      ) : selectedStudentData ? (
        <StudentDetail 
          student={selectedStudentData}
          onClose={() => setSelectedStudent(null)}
        />
      ) : (
        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-4 border-b border-gray-200">
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
          <StudentTable 
            students={filteredStudents}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRowClick={handleRowClick}
          />
        </div>
      )}

      {showImportModal && (
        <ImportStudentsModal
          onClose={() => setShowImportModal(false)}
        />
      )}
    </div>
  );
}