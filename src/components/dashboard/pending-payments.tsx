'use client';

import { DollarSign } from 'lucide-react';

const payments = [
  {
    id: 1,
    student: 'Juan Pérez',
    amount: 45000,
    dueDate: '2024-03-15'
  },
  {
    id: 2,
    student: 'María González',
    amount: 85000,
    dueDate: '2024-03-20'
  }
];

export function PendingPayments() {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Pagos Pendientes</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {payments.map((payment) => (
          <li key={payment.id} className="px-4 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {payment.student}
                </p>
                <p className="text-sm text-gray-500">
                  Vence el {new Date(payment.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center text-sm font-medium text-gray-900">
                <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                {payment.amount.toLocaleString('es-CL', {
                  style: 'currency',
                  currency: 'CLP'
                })}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}