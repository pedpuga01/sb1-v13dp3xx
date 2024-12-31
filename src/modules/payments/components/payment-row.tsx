```typescript
import { useState } from 'react';
import { MoreVertical, Eye, Pencil, Trash2, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Payment } from '@/modules/payments/types';

interface PaymentRowProps {
  payment: Payment;
}

export function PaymentRow({ payment }: PaymentRowProps) {
  const [showActions, setShowActions] = useState(false);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  const getStatusColor = (status: Payment['status']) => {
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

  const getStatusText = (status: Payment['status']) => {
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
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {payment.student_name}
        </div>
        {payment.invoice_number && (
          <div className="text-sm text-gray-500">
            #{payment.invoice_number}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {formatAmount(payment.amount)}
        </div>
        {payment.payment_method && (
          <div className="text-sm text-gray-500">
            {payment.payment_method === 'cash' ? 'Efectivo' :
             payment.payment_method === 'transfer' ? 'Transferencia' : 'Tarjeta'}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          getStatusColor(payment.status)
        }`}>
          {getStatusText(payment.status)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {format(new Date(payment.due_date), 'PPP', { locale: es })}
        </div>
        {payment.paid_date && (
          <div className="text-sm text-gray-500">
            Pagado el {format(new Date(payment.paid_date), 'PPP', { locale: es })}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowActions(!showActions)}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>

          {showActions && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowActions(false);
                    // TODO: Implementar ver detalles
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalles
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowActions(false);
                    // TODO: Implementar editar
                  }}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setShowActions(false);
                    // TODO: Implementar generar factura
                  }}
                >
                  <Receipt className="h-4 w-4 mr-2" />
                  Generar Factura
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setShowActions(false);
                    // TODO: Implementar eliminar
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
```