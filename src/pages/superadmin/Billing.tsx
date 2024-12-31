import React, { useState } from 'react';
import { DollarSign, FileText, Download, Calendar, Building2 } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function Billing() {
  const [period, setPeriod] = useState('current');
  const [status, setStatus] = useState('all');

  // Datos simulados de facturación
  const invoices = [
    {
      id: '1',
      client: 'Academia de Música Mozart',
      amount: 49900,
      status: 'paid',
      date: '2024-02-15',
      dueDate: '2024-02-15'
    },
    {
      id: '2',
      client: 'Escuela de Danza Moderna',
      amount: 99900,
      status: 'pending',
      date: '2024-02-14',
      dueDate: '2024-02-29'
    },
    {
      id: '3',
      client: 'Instituto de Artes',
      amount: 29900,
      status: 'overdue',
      date: '2024-01-15',
      dueDate: '2024-01-30'
    }
  ];

  const stats = [
    {
      name: 'Ingresos del Mes',
      value: '$2.5M',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Facturas Pendientes',
      value: '$480K',
      change: '-2.3%',
      icon: FileText,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Tasa de Morosidad',
      value: '4.2%',
      change: '-0.8%',
      icon: Calendar,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

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
        return 'Vencido';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-futura text-dark">Facturación</h1>
        <p className="text-gray-600">Gestiona la facturación y pagos de tus clientes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`${stat.bgColor} rounded-lg p-3`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex space-x-2">
          <Button
            variant={period === 'current' ? 'primary' : 'outline'}
            onClick={() => setPeriod('current')}
          >
            Mes Actual
          </Button>
          <Button
            variant={period === 'last' ? 'primary' : 'outline'}
            onClick={() => setPeriod('last')}
          >
            Mes Anterior
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={status === 'all' ? 'primary' : 'outline'}
            onClick={() => setStatus('all')}
          >
            Todos
          </Button>
          <Button
            variant={status === 'pending' ? 'primary' : 'outline'}
            onClick={() => setStatus('pending')}
          >
            Pendientes
          </Button>
          <Button
            variant={status === 'overdue' ? 'primary' : 'outline'}
            onClick={() => setStatus('overdue')}
          >
            Vencidos
          </Button>
        </div>
      </div>

      {/* Lista de Facturas */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Facturas</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Building2 className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {invoice.client}
                      </p>
                      <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                        <span>Factura #{invoice.id}</span>
                        <span>
                          Emitida: {new Date(invoice.date).toLocaleDateString()}
                        </span>
                        <span>
                          Vence: {new Date(invoice.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      getStatusBadgeClass(invoice.status)
                    }`}>
                      {getStatusText(invoice.status)}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatAmount(invoice.amount)}
                    </span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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