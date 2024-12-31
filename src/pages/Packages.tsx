import React, { useState } from 'react';
import { Plus, Package } from 'lucide-react';
import Button from '../components/ui/Button';
import { usePackageStore } from '../stores/packageStore';
import PackageCard from '../components/packages/PackageCard';
import PackageForm from '../components/packages/PackageForm';

export default function Packages() {
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<string | null>(null);
  const { packages } = usePackageStore();

  const handleEdit = (packageId: string) => {
    setEditingPackage(packageId);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-futura text-dark">Packs de Clases</h1>
          <p className="text-gray-600">Gestiona los paquetes y promociones de clases</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setEditingPackage(null);
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Pack
        </Button>
      </div>

      {showForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <PackageForm
            packageId={editingPackage}
            onClose={() => {
              setShowForm(false);
              setEditingPackage(null);
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              onEdit={() => handleEdit(pkg.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}