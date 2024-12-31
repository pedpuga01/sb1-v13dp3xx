import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, GraduationCap, Plus, Trash2, Book } from 'lucide-react';
import Button from '../ui/Button';
import type { Student } from '../../stores/studentStore';
import { useClassStore } from '../../stores/classStore';
import { useStudentStore } from '../../stores/studentStore';
import { useModuleStore } from '../../stores/moduleStore';
import ModuleProgress from './ModuleProgress';
import AddProgressNote from './AddProgressNote';

interface StudentDetailProps {
  student: Student;
  onClose: () => void;
}

export default function StudentDetail({ student, onClose }: StudentDetailProps) {
  const [showAvailableClasses, setShowAvailableClasses] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const { classes } = useClassStore();
  const { modules } = useModuleStore();
  const { students, addClassToStudent, removeClassFromStudent, addModuleToStudent } = useStudentStore();
  
  const enrolledClasses = classes.filter(c => student.clases.includes(c.id));
  const availableClasses = classes.filter(c => {
    if (student.clases.includes(c.id)) return false;
    if (c.tipo === 'individual') return true;
    const enrolledCount = students.filter(s => s.clases.includes(c.id)).length;
    return enrolledCount < c.capacidad;
  });

  const availableModules = modules.filter(m => 
    !student.modulos.some(sm => sm.id === m.id)
  );

  const handleAddClass = (classId: string) => {
    addClassToStudent(student.id, classId);
  };

  const handleRemoveClass = (classId: string) => {
    removeClassFromStudent(student.id, classId);
  };

  const handleAddModule = (moduleId: string) => {
    addModuleToStudent(student.id, moduleId);
  };

  const handleAddNote = (moduleId: string) => {
    setSelectedModule(moduleId);
    setShowAddNote(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-medium text-dark">Detalle del Estudiante</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
              <p className="text-gray-900">{student.nombre} {student.apellido}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900">{student.email}</p>
            </div>
          </div>

          {student.telefono && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Teléfono</p>
                <p className="text-gray-900">{student.telefono}</p>
              </div>
            </div>
          )}

          {student.direccion && (
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Dirección</p>
                <p className="text-gray-900">
                  {student.direccion.calle}, {student.direccion.comuna}
                </p>
                <p className="text-sm text-gray-500">
                  {student.direccion.ciudad}, {student.direccion.pais}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Módulos */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-dark">
              <Book className="h-5 w-5 inline-block mr-2" />
              Módulos de Estudio
            </h3>
            {availableModules.length > 0 && (
              <div className="flex items-center space-x-2">
                <select
                  className="rounded-md border-gray-300 text-sm"
                  onChange={(e) => handleAddModule(e.target.value)}
                  value=""
                >
                  <option value="" disabled>Seleccionar módulo...</option>
                  {availableModules.map(module => (
                    <option key={module.id} value={module.id}>
                      {module.nombre}
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                  Agregar Módulo
                </Button>
              </div>
            )}
          </div>

          {student.modulos.length > 0 ? (
            <div className="space-y-4">
              {student.modulos.map(moduleData => (
                <ModuleProgress
                  key={moduleData.id}
                  studentId={student.id}
                  moduleData={moduleData}
                  onAddNote={handleAddNote}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No hay módulos asignados</p>
          )}
        </div>

        {/* Clases */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-dark">
              <GraduationCap className="h-5 w-5 inline-block mr-2" />
              Clases Inscritas
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAvailableClasses(!showAvailableClasses)}
            >
              {showAvailableClasses ? 'Ocultar Clases' : 'Inscribir en Clase'}
            </Button>
          </div>

          {showAvailableClasses && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Clases Disponibles</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {availableClasses.map(clase => (
                  <div key={clase.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-dark">{clase.nombre}</h4>
                        <p className="text-sm text-gray-500">
                          {clase.horario.dia} • {clase.horario.horaInicio} - {clase.horario.horaFin}
                        </p>
                        <p className="text-sm text-gray-500">Profesor: {clase.profesor}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddClass(clase.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {enrolledClasses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {enrolledClasses.map(clase => (
                <div key={clase.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-dark">{clase.nombre}</h4>
                      <p className="text-sm text-gray-500">
                        {clase.horario.dia} • {clase.horario.horaInicio} - {clase.horario.horaFin}
                      </p>
                      <p className="text-sm text-gray-500">Profesor: {clase.profesor}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveClass(clase.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No hay clases inscritas</p>
          )}
        </div>
      </div>

      {showAddNote && selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-dark mb-4">Agregar Nota de Progreso</h3>
            <AddProgressNote
              studentId={student.id}
              moduleId={selectedModule}
              onClose={() => {
                setShowAddNote(false);
                setSelectedModule(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}