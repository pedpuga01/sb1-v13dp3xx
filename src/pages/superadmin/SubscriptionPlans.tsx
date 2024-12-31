import React, { useState } from 'react';
import { Plus, Package, Users, Check, Edit2, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';

interface Plan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  maxStudents: number;
  features: string[];
  isPopular?: boolean;
}

export default function SubscriptionPlans() {
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);

  // Datos simulados de planes
  const plans: Plan[] = [
    {
      id: '1',
      name: 'Básico',
      price: 29900,
      billingPeriod: 'monthly',
      maxStudents: 25,
      features: [
        'Hasta 25 estudiantes',
        'Gestión de clases',
        'Calendario básico',
        'Soporte por email'
      ]
    },
    {
      id: '2',
      name: 'Profesional',
      price: 49900,
      billingPeriod: 'monthly',
      maxStudents: 100,
      features: [
        'Hasta 100 estudiantes',
        'Gestión de clases avanzada',
        'Calendario completo',
        'Reportes básicos',
        'Soporte prioritario',
        'Facturación automática'
      ],
      isPopular: true
    },
    {
      id: '3',
      name: 'Empresarial',
      price: 99900,
      billingPeriod: 'monthly',
      maxStudents: 500,
      features: [
        'Hasta 500 estudiantes',
        'Todas las características',
        'API access',
        'Soporte 24/7',
        'Reportes avanzados',
        'Multi-sede'
      ]
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-futura text-dark">Planes de Suscripción</h1>
          <p className="text-gray-600">Gestiona los planes disponibles para tus clientes</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setEditingPlan(null);
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
              plan.isPopular ? 'ring-2 ring-primary' : ''
            }`}
          >
            {plan.isPopular && (
              <div className="bg-primary text-white text-center text-sm py-1">
                Más Popular
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-medium text-gray-900">{plan.name}</h3>
              
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(plan.price)}
                </span>
                <span className="text-gray-500 ml-2">/ mes</span>
              </div>

              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                Hasta {plan.maxStudents} estudiantes
              </div>

              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-x-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingPlan(plan.id);
                    setShowForm(true);
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de eliminar este plan?')) {
                      // Implementar eliminación
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {editingPlan ? 'Editar Plan' : 'Nuevo Plan'}
              </h2>
              {/* Aquí iría el formulario de plan */}
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPlan(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button variant="primary">
                  {editingPlan ? 'Guardar Cambios' : 'Crear Plan'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}