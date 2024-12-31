```typescript
import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Student } from '@/modules/students/types';
import { StudentProgress } from './student-progress';
import { StudentNotes } from './student-notes';

interface StudentDetailsProps {
  student: Student;
  onClose: () => void;
  onEdit: () => void;
}

export function StudentDetails({ student, onClose, onEdit }: StudentDetailsProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'progress' | 'notes'>('info');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{student.full_name}</h1>
            <p className="text-gray-600">Estudiante</p>
          </div>
        </div>
        <Button onClick={onEdit}>Editar</Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'info', label: 'Información' },
            { id: 'progress', label: 'Progreso' },
            { id: 'notes', label: 'Notas' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white shadow rounded-lg">
        {activeTab === 'info' && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">{student.email}</p>
                </div>
              </div>

              {student.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Teléfono</p>
                    <p className="text-gray-900">{student.phone}</p>
                  </div>
                </div>
              )}

              {student.birth_date && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fecha de Nacimiento</p>
                    <p className="text-gray-900">
                      {format(new Date(student.birth_date), 'PPP', { locale: es })}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha de Registro</p>
                  <p className="text-gray-900">
                    {format(new Date(student.created_at), 'PPP', { locale: es })}
                  </p>
                </div>
              </div>
            </div>

            {student.address && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Dirección</h3>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-900">
                      {student.address.street} {student.address.number}
                    </p>
                    <p className="text-gray-500">
                      {student.address.city}, {student.address.state}
                    </p>
                    {student.address.zip && (
                      <p className="text-gray-500">CP: {student.address.zip}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {student.emergency_contact && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contacto de Emergencia</h3>
                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-gray-900">{student.emergency_contact.name}</p>
                    <p className="text-gray-500">{student.emergency_contact.relationship}</p>
                    <p className="text-gray-500">{student.emergency_contact.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <StudentProgress student={student} />
        )}

        {activeTab === 'notes' && (
          <StudentNotes student={student} />
        )}
      </div>
    </div>
  );
}
```