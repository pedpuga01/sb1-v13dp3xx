import React from 'react';
import { Users, Building2, CreditCard, TrendingUp } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SuperadminDashboard() {
  // KPIs del superadmin
  const kpis = [
    {
      title: 'Total Clientes',
      value: '24',
      change: '+12.5%',
      icon: Building2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Ingresos Mensuales',
      value: '$4.2M',
      change: '+8.3%',
      icon: CreditCard,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Alumnos',
      value: '1,234',
      change: '+15.3%',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Tasa de Retención',
      value: '95%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  // Datos para el gráfico de crecimiento
  const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Clientes',
        data: [12, 15, 18, 20, 22, 24],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4
      },
      {
        label: 'Ingresos (M)',
        data: [2.1, 2.5, 3.0, 3.5, 3.8, 4.2],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      title: {
        display: true,
        text: 'Crecimiento Mensual'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-futura text-dark">Panel de Control</h1>
        <p className="text-gray-600">Resumen general del negocio</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`${kpi.bgColor} rounded-lg p-3`}>
                    <Icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {kpi.title}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {kpi.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {kpi.change}
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

      {/* Gráfico de Crecimiento */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="h-96">
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>

      {/* Últimos Clientes */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Últimos Clientes</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {[1, 2, 3].map((i) => (
            <li key={i} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Academia de Música {i}
                  </p>
                  <p className="text-sm text-gray-500">
                    Registrado el {new Date().toLocaleDateString()}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Activo
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}