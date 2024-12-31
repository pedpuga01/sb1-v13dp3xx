import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClassForm } from './class-form';

export function ClassesHeader() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Clases</h1>
        <p className="text-gray-600">Gestiona las clases y horarios</p>
      </div>
      
      <div className="flex gap-3">
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Clase
        </Button>
      </div>

      {showForm && (
        <ClassForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}