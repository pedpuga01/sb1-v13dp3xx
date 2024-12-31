import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CreditCard, AlertCircle, TrendingUp } from 'lucide-react';

const mockData = [
  { mes: 'Ene', pagados: 28, pendientes: 4 },
  { mes: 'Feb', pagados: 32, pendientes: 3 },
  { mes: 'Mar', pagados: 30, pendientes: 5 },
];

const stats = [
  {
    name: 'Pagos del Mes',
    value: '$1,200,000',
    change: '+8.2%',
    icon: CreditCard,
    color: 'text-green-500',
    highlighted: true
  },
  {
    name: 'Pagos Pendientes',
    value: '$280,000',
    change: '-2.1%',
    icon: AlertCircle,
    color: 'text-red-500',
    highlighted: true
  },
  {
    name: 'Tasa de Cobro',
    value: '92%',
    change: '+1.2%',
    icon: TrendingUp,
    color: 'text-blue-500',
    highlighted: false
  },
];

export default function PaymentStats() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className={`overflow-hidden shadow rounded-lg ${
                stat.highlighted ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
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

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Estado de Pagos (Últimos 3 Meses)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mockData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pagados" name="Pagados" fill="#22c55e" />
              <Bar dataKey="pendientes" name="Pendientes" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}