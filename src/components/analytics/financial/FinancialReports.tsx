import React, { useState } from 'react';
import { Download, Calendar, Filter } from 'lucide-react';
import Button from '../../ui/Button';

export default function FinancialReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const reports = [
    {
      id: 1,
      name: 'Balance General',
      description: 'Estado financiero que muestra activos, pasivos y patrimonio',
      type: 'excel'
    },
    {
      id: 2,
      name: 'Estado de Resultados',
      description: 'Informe de ingresos, gastos y utilidades',
      type: 'excel'
    },
    {
      id: 3,
      name: 'Flujo de Caja',
      description: 'Movimientos de efectivo y equivalentes',
      type: 'excel'
    },
    {
      id: 4,
      name: 'Reporte de Morosidad',
      description: 'Análisis de pagos atrasados y deudas pendientes',
      type: 'pdf'
    },
    {
      id: 5,
      name: 'Análisis de Ingresos',
      description: 'Desglose detallado de fuentes de ingresos',
      type: 'excel'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Reportes Financieros
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Descarga reportes detallados de la gestión financiera
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={selectedPeriod === 'month' ? 'primary' : 'outline'}
            onClick={() => setSelectedPeriod('month')}
          >
            Mensual
          </Button>
          <Button
            variant={selectedPeriod === 'quarter' ? 'primary' : 'outline'}
            onClick={() => setSelectedPeriod('quarter')}
          >
            Trimestral
          </Button>
          <Button
            variant={selectedPeriod === 'year' ? 'primary' : 'outline'}
            onClick={() => setSelectedPeriod('year')}
          >
            Anual
          </Button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {reports.map((report) => (
            <li key={report.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {report.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {report.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      report.type === 'excel'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {report.type.toUpperCase()}
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

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Reporte Personalizado
          </h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha Inicio
              </label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha Fin
              </label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Reporte
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                <option>Balance General</option>
                <option>Estado de Resultados</option>
                <option>Flujo de Caja</option>
                <option>Reporte de Morosidad</option>
                <option>Análisis de Ingresos</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="primary">
              <Download className="h-4 w-4 mr-2" />
              Generar Reporte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}