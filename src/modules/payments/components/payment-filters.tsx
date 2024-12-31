```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PaymentFilters as FilterType } from '@/modules/payments/types';

interface PaymentFiltersProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
  onClose: () => void;
}

export function PaymentFilters({ filters, onChange, onClose }: PaymentFiltersProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value as 'pending' | 'paid' | 'overdue' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="pending">Pendientes</option>
            <option value="paid">Pagados</option>
            <option value="overdue">Vencidos</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Desde
          </label>
          <Input
            type="date"
            value={filters.start_date}
            onChange={(e) => onChange({ ...filters, start_date: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hasta
          </label>
          <Input
            type="date"
            value={filters.end_date}
            onChange={(e) => onChange({ ...filters, end_date: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={() => {
            onChange({});
            onClose();
          }}
        >
          Limpiar filtros
        </Button>
        <Button onClick={onClose}>
          Aplicar
        </Button>
      </div>
    </div>
  );
}
```