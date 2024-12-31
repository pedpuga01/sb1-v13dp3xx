'use client';

import { useState } from 'react';
import { Plus, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StudentForm } from './student-form';
import { ImportStudentsDialog } from './import-students-dialog';

export function StudentsHeader() {
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Estudiantes</h1>
        <p className="text-gray-600">Gestiona los estudiantes de tu academia</p>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setShowImport(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Importar
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Estudiante
        </Button>
      </div>

      {showForm && (
        <StudentForm onClose={() => setShowForm(false)} />
      )}

      {showImport && (
        <ImportStudentsDialog onClose={() => setShowImport(false)} />
      )}
    </div>
  );
}