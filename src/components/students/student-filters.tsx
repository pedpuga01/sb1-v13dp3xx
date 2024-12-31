```typescript
import { Button } from '@/components/ui/button';
import type { StudentFilters as FilterType } from '@/modules/students/types';

interface StudentFiltersProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
  onClose: () => void;
}

export function StudentFilters({ filters, onChange, onClose }: StudentFiltersProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value as 'active' | 'inactive' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ordenar por
          </label>
          <select
            value={filters.sort_by}
            onChange={(e) => onChange({ ...filters, sort_by: e.target.value as keyof FilterType })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="">Sin ordenar</option>
            <option value="full_name">Nombre</option>
            <option value="email">Email</option>
            <option value="created_at">Fecha de registro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Orden
          </label>
          <select
            value={filters.sort_order}
            onChange={(e) => onChange({ ...filters, sort_order: e.target.value as 'asc' | 'desc' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
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