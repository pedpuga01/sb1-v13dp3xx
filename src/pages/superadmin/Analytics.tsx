import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { DollarSign, Users, Building2, TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SuperadminAnalytics() {
  // KPIs del superadmin
  const kpis = [
    {
      title: 'Ingresos Totales',
      value: '$12.5M',
      change: '+15.3%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Clientes Activos',
      value: '24',
      change: '+8.2%',
      icon: Building2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Estudiantes',
      value: '1,234',
      change: '+12.1%',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Crecimiento MoM',
      value: '18.5%',
      change: '+2.4%',
      icon: TrendingUp,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  // Datos para el gráfico de ingresos
  const revenueData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ingresos Mensuales',
        data: [1800000, 2100000, 2300000, 2500000, 2800000, 3200000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4
      }
    ]
  };

  // Datos para el gráfico de clientes por plan
  const planData = {
    labels: ['Básico', 'Profesional', 'Empresarial'],
    datasets: [
      {
        label: 'Clientes por Plan',
        data: [8, 12, 4],
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(139, 92, 246, 0.5)',
          'rgba(245, 158, 11, 0.5)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(245, 158, 11)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
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
        <h1 className="text-2xl font-futura text-dark">Analíticas</h1>
        <p className="text-gray-600">Métricas y estadísticas del negocio</p>
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

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Ingresos */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Evolución de Ingresos
          </h3>
          <div className="h-80">
            <Line options={chartOptions} data={revenueData} />
          </div>
        </div>

        {/* Gráfico de Distribución de Planes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Distribución por Plan
          </h3>
          <div className="h-80">
            <Bar options={chartOptions} data={planData} />
          </div>
        </div>
      </div>

      {/* Métricas Adicionales */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Métricas de Retención
          </h3>
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Tasa de Retención
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                95.2%
              </dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Churn Rate
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                4.8%
              </dd>
            </div>
            <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                LTV Promedio
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                $580K
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}