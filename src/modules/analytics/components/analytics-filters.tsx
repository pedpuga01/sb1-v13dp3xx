```typescript
import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { AnalyticsFilters } from '../types';

interface AnalyticsFiltersProps {
  filters: AnalyticsFilters;
  onFilterChange: (filters: AnalyticsFilters) => void;
}

export function AnalyticsFilters({ filters, onFilterChange }: AnalyticsFiltersProps) {
  const [showCustomDates, setShowCustomDates] = useState(filters.dateRange === 'custom');

  const handleDateRangeChange = (range: AnalyticsFilters['dateRange']) => {
    setShowCustomDates(range === 'custom');
    onFilterChange({ ...filters, dateRange: range });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rango de Fechas
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleDateRangeChange(e.target.value as AnalyticsFilters['dateRange'])}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="week">Última semana</option>
            <option value="month">Último mes</option>
            <option value="quarter">Último trimestre</option>
            <option value="year">Último año</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>

        {showCustomDates && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha Inicio
              </label>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => onFilterChange({ ...filters, startDate: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha Fin
              </label>
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => onFilterChange({ ...filters, endDate: e.target.value })}
                className="mt-1"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Agrupar por
          </label>
          <select
            value={filters.groupBy}
            onChange={(e) => onFilterChange({ ...filters, groupBy: e.target.value as 'day' | 'week' | 'month' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="day">Día</option>
            <option value="week">Semana</option>
            <option value="month">Mes</option>
          </select>
        </div>
      </div>
    </div>
  );
}
```