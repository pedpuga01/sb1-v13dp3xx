import React from 'react';
import { Users, Calendar, CheckCircle, MessageSquare } from 'lucide-react';
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

export default function TeacherDashboard() {
  // KPIs del profesor
  const kpis = [
    {
      title: 'Clases Hoy',
      value: '4',
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Alumnos',
      value: '45',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Asistencia Promedio',
      value: '92%',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Feedback Pendiente',
      value: '3',
      icon: MessageSquare,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  // Datos para el gráfico de asistencia
  const attendanceData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    datasets: [
      {
        label: 'Asistencia',
        data: [95, 88, 92, 90, 94, 89],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
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
        text: 'Asistencia Semanal'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-futura text-dark">Panel del Profesor</h1>
        <p className="text-gray-600">Bienvenido de vuelta</p>
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
                      <dd className="text-2xl font-semibold text-gray-900">
                        {kpi.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clases de Hoy */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Clases de Hoy</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {[1, 2, 3, 4].map((i) => (
            <li key={i} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Clase {i}
                  </p>
                  <p className="text-sm text-gray-500">
                    15:00 - 16:00 • Sala 1
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  12/15 alumnos
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Gráfico de Asistencia */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="h-80">
          <Line options={chartOptions} data={attendanceData} />
        </div>
      </div>

      {/* Feedback Pendiente */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Feedback Pendiente</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {[1, 2, 3].map((i) => (
            <li key={i} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Estudiante {i}
                  </p>
                  <p className="text-sm text-gray-500">
                    Clase del {new Date().toLocaleDateString()}
                  </p>
                </div>
                <button className="text-primary hover:text-primary/90 text-sm font-medium">
                  Agregar Feedback
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}