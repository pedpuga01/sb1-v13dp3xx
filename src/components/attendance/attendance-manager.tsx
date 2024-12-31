```typescript
'use client';

import { useState } from 'react';
import { useClasses } from '@/hooks/use-classes';
import { useAttendance } from '@/hooks/use-attendance';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AttendanceTable } from './attendance-table';
import { AttendanceSummary } from './attendance-summary';

export function AttendanceManager() {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { classes, loading: loadingClasses } = useClasses('academy-id'); // TODO: Get from context
  const { markAttendance, getAttendance, loading } = useAttendance(selectedClass);

  const handleMarkAttendance = async (studentId: string, status: 'present' | 'absent' | 'late') => {
    try {
      await markAttendance(studentId, selectedDate, status);
      // TODO: Actualizar UI o recargar datos
    } catch (error) {
      console.error('Error al marcar asistencia:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seleccionar Clase
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
              <option value="">Selecciona una clase...</option>
              {classes.map((class_) => (
                <option key={class_.id} value={class_.id}>
                  {class_.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha
            </label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {selectedClass && selectedDate && (
        <>
          <AttendanceSummary classId={selectedClass} date={selectedDate} />
          <AttendanceTable
            classId={selectedClass}
            date={selectedDate}
            onMarkAttendance={handleMarkAttendance}
            loading={loading}
          />
        </>
      )}
    </div>
  );
}
```