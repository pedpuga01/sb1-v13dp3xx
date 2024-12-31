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
import { Users, DollarSign, Calendar } from 'lucide-react';

// Registrar componentes de Chart.js
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

export default function ClientAnalytics() {
  // Datos simulados para los KPIs
  const kpis = [
    {
      title: 'Total Estudiantes',
      value: '45',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Ingresos Mensuales',
      value: '$2.5M',
      change: '+8.3%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Clases Activas',
      value: '12',
      change: '+15.3%',
      icon: Calendar,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  // Datos para el gráfico de estudiantes
  const studentData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Estudiantes Activos',
        data: [32, 35, 38, 42, 45, 48],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4
      }
    ]
  };

  // Datos para el gráfico de ingresos por clase
  const classData = {
    labels: ['Piano', 'Guitarra', 'Canto', 'Batería', 'Violín'],
    datasets: [
      {
        label: 'Ingresos por Clase',
        data: [450000, 380000, 320000, 280000, 250000],
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(139, 92, 246, 0.5)',
          'rgba(245, 158, 11, 0.5)',
          'rgba(34, 197, 94, 0.5)',
          'rgba(239, 68, 68, 0.5)'
        ]
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
        <p className="text-gray-600">Métricas y estadísticas de tu academia</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        {/* Gráfico de Estudiantes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Evolución de Estudiantes
          </h3>
          <div className="h-80">
            <Line options={chartOptions} data={studentData} />
          </div>
        </div>

        {/* Gráfico de Ingresos por Clase */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Ingresos por Clase
          </h3>
          <div className="h-80">
            <Bar options={chartOptions} data={classData} />
          </div>
        </div>
      </div>
    </div>
  );
}