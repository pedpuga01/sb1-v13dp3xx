import React, { useState } from 'react';
import { Search, Plus, Building2, Users, DollarSign } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useClientStore } from '../../stores/clientStore';
import ClientForm from '../../components/superadmin/ClientForm';

export default function Clients() {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { clients, createClient } = useClientStore();

  const handleCreateClient = async (data: any) => {
    try {
      setError(null);
      await createClient(data);
      setShowForm(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error al crear la academia');
      }
    }
  };

  // Planes disponibles
  const availablePlans = [
    { id: 'basic', name: 'Básico', maxStudents: 25 },
    { id: 'pro', name: 'Profesional', maxStudents: 100 },
    { id: 'enterprise', name: 'Empresarial', maxStudents: 500 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-futura text-dark">Clientes</h1>
          <p className="text-gray-600">Gestiona tus clientes y sus suscripciones</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setError(null);
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Academia
        </Button>
      </div>

      {showForm ? (
        <div className="bg-white shadow rounded-lg p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <ClientForm
            onSubmit={handleCreateClient}
            onCancel={() => {
              setError(null);
              setShowForm(false);
            }}
            plans={availablePlans}
          />
        </div>
      ) : (
        <>
          {/* Rest of the component remains the same */}
        </>
      )}
    </div>
  );
}