'use client';

import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

const stats = [
  {
    name: 'Total Estudiantes',
    value: '45',
    change: '+12.5%',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    name: 'Clases Activas',
    value: '12',
    change: '+8.3%',
    icon: BookOpen,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    name: 'Ingresos Mensuales',
    value: '$2.5M',
    change: '+15.3%',
    icon: DollarSign,
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    name: 'Tasa de Retención',
    value: '92%',
    change: '+2.1%',
    icon: TrendingUp,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50'
  }
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
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
  );
}