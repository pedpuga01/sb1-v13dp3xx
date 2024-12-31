```typescript
import { useState } from 'react';
import { Download, FileText, Table } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { analyticsApi } from '../api';
import type { AnalyticsFilters } from '../types';

interface AnalyticsExportProps {
  academyId: string;
  filters: AnalyticsFilters;
}

export function AnalyticsExport({ academyId, filters }: AnalyticsExportProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async (format: 'csv' | 'xlsx') => {
    try {
      setLoading(true);
      await analyticsApi.exportReport(academyId, filters, format);
    } catch (error) {
      console.error('Error al exportar reporte:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-3">
      <Button
        variant="outline"
        onClick={() => handleExport('csv')}
        disabled={loading}
      >
        <Table className="h-4 w-4 mr-2" />
        Exportar CSV
      </Button>
      <Button
        variant="outline"
        onClick={() => handleExport('xlsx')}
        disabled={loading}
      >
        <FileText className="h-4 w-4 mr-2" />
        Exportar Excel
      </Button>
    </div>
  );
}
```