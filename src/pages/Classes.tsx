import React, { useState } from 'react';
import { PlusCircle, Calendar, List, Grid, Pencil, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import ClassForm from '../components/classes/ClassForm';
import ClassCard from '../components/classes/ClassCard';
import { useClassStore } from '../stores/classStore';

export default function Classes() {
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editingClass, setEditingClass] = useState<string | null>(null);
  
  const { classes, addClass, updateClass, deleteClass } = useClassStore();

  const handleSubmit = (data: any) => {
    if (editingClass) {
      updateClass(editingClass, data);
    } else {
      addClass(data);
    }
    setShowForm(false);
    setEditingClass(null);
  };

  const handleEdit = (classId: string) => {
    setEditingClass(classId);
    setShowForm(true);
  };

  const handleDelete = (classId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta clase?')) {
      deleteClass(classId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-futura text-dark">Clases</h1>
          <p className="text-gray-600">Gestiona las clases y horarios</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex rounded-md shadow-sm">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="primary" onClick={() => {
            setEditingClass(null);
            setShowForm(true);
          }}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nueva Clase
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <ClassForm
            onSubmit={handleSubmit}
            initialData={editingClass ? classes.find(c => c.id === editingClass) : undefined}
            onCancel={() => {
              setShowForm(false);
              setEditingClass(null);
            }}
          />
        </div>
      )}

      {!showForm && classes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((clase) => (
            <ClassCard
              key={clase.id}
              clase={clase}
              onEdit={() => handleEdit(clase.id)}
              onDelete={() => handleDelete(clase.id)}
            />
          ))}
        </div>
      ) : !showForm && (
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">No hay clases programadas</p>
            <p className="text-sm text-gray-500">Comienza creando una nueva clase</p>
          </div>
        </div>
      )}
    </div>
  );
}