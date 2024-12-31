import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function FinancialKPIs() {
  // Datos simulados para los KPIs
  const kpis = [
    {
      title: 'Ingresos Mensuales',
      value: '$2.5M',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Tasa de Morosidad',
      value: '4.2%',
      change: '-1.3%',
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Ingreso por Alumno',
      value: '$85K',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    }
  ];

  // Datos simulados para el gráfico
  const data = [
    { mes: 'Ene', ingresos: 1800000, gastos: 1200000, margen: 33.3 },
    { mes: 'Feb', ingresos: 2100000, gastos: 1300000, margen: 38.1 },
    { mes: 'Mar', ingresos: 2300000, gastos: 1400000, margen: 39.1 },
    { mes: 'Abr', ingresos: 2500000, gastos: 1500000, margen: 40.0 },
    { mes: 'May', ingresos: 2400000, gastos: 1450000, margen: 39.6 },
    { mes: 'Jun', ingresos: 2600000, gastos: 1550000, margen: 40.4 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="relative overflow-hidden rounded-lg bg-white p-5 shadow"
            >
              <div className="flex items-center">
                <div className={`${kpi.bgColor} rounded-lg p-3`}>
                  <Icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {kpi.title}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {kpi.value}
                    </p>
                    <p className={`ml-2 text-sm font-medium ${
                      kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Evolución Financiera
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="ingresos"
                name="Ingresos"
                fill="#22c55e"
                barSize={20}
              />
              <Bar
                yAxisId="left"
                dataKey="gastos"
                name="Gastos"
                fill="#ef4444"
                barSize={20}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="margen"
                name="Margen (%)"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}