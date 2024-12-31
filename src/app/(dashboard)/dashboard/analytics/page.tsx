```typescript
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/modules/analytics/api';
import { AnalyticsFilters } from '@/modules/analytics/components/analytics-filters';
import { AnalyticsCharts } from '@/modules/analytics/components/analytics-charts';
import { AnalyticsExport } from '@/modules/analytics/components/analytics-export';
import type { AnalyticsFilters as FilterType } from '@/modules/analytics/types';

export default function AnalyticsPage() {
  const [filters, setFilters] = useState<FilterType>({
    dateRange: 'month',
    groupBy: 'day'
  });

  const { data, isLoading } = useQuery({
    queryKey: ['analytics', filters],
    queryFn: () => analyticsApi.getAnalytics('academy-id', filters), // TODO: Get academy ID from context
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analíticas</h1>
          <p className="text-gray-600">Análisis y estadísticas de la academia</p>
        </div>
        <AnalyticsExport
          academyId="academy-id" // TODO: Get from context
          filters={filters}
        />
      </div>

      <AnalyticsFilters
        filters={filters}
        onFilterChange={setFilters}
      />

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Cargando datos...</p>
        </div>
      ) : data ? (
        <AnalyticsCharts data={data} />
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay datos disponibles</p>
        </div>
      )}
    </div>
  );
}
```