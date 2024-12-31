import React, { useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import Button from '../components/ui/Button';
import { useModuleStore } from '../stores/moduleStore';
import ModuleCard from '../components/plans/ModuleCard';
import ModuleForm from '../components/plans/ModuleForm';

export default function Plans() {
  const [showForm, setShowForm] = useState(false);
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const { modules } = useModuleStore();

  const handleEdit = (moduleId: string) => {
    setEditingModule(moduleId);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-futura text-dark">Planes de Estudio</h1>
          <p className="text-gray-600">Gestiona los módulos y planes académicos</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setEditingModule(null);
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Plan
        </Button>
      </div>

      {showForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <ModuleForm
            moduleId={editingModule}
            onClose={() => {
              setShowForm(false);
              setEditingModule(null);
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onEdit={() => handleEdit(module.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}