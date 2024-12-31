import React, { useState } from 'react';
import { Search, Filter, AlertCircle } from 'lucide-react';
import Button from '../../ui/Button';

export default function PaymentControl() {
  const [filter, setFilter] = useState('all');

  // Datos simulados de pagos
  const payments = [
    {
      id: '1',
      student: 'Juan Pérez',
      amount: 85000,
      dueDate: '2024-03-15',
      status: 'pending',
      daysPastDue: 5
    },
    {
      id: '2',
      student: 'María González',
      amount: 95000,
      dueDate: '2024-03-10',
      status: 'overdue',
      daysPastDue: 10
    },
    {
      id: '3',
      student: 'Carlos Rodríguez',
      amount: 75000,
      dueDate: '2024-03-20',
      status: 'paid',
      daysPastDue: 0
    }
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pagado';
      case 'pending':
        return 'Pendiente';
      case 'overdue':
        return 'Atrasado';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative rounded-md shadow-sm max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Buscar pagos..."
          />
        </div>

        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            onClick={() => setFilter('all')}
          >
            Todos
          </Button>
          <Button
            variant={filter === 'pending' ? 'primary' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pendientes
          </Button>
          <Button
            variant={filter === 'overdue' ? 'primary' : 'outline'}
            onClick={() => setFilter('overdue')}
          >
            Atrasados
          </Button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {payments.map((payment) => (
            <li key={payment.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {payment.status === 'overdue' && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {payment.student}
                      </p>
                      <p className="text-sm text-gray-500">
                        Vencimiento: {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getStatusBadgeClass(payment.status)
                    }`}>
                      {getStatusText(payment.status)}
                    </span>
                    <div className="text-sm text-gray-900 font-medium">
                      ${payment.amount.toLocaleString()}
                    </div>
                    {payment.status === 'overdue' && (
                      <div className="text-sm text-red-600">
                        {payment.daysPastDue} días de atraso
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}