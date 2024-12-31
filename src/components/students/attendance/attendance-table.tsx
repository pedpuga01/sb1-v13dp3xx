```typescript
import { useState } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Student } from '@/modules/students/types';

interface AttendanceTableProps {
  students: Student[];
  classId: string;
  date: Date;
  onMarkAttendance: (studentId: string, status: 'present' | 'absent' | 'late') => void;
}

export function AttendanceTable({ students, classId, date, onMarkAttendance }: AttendanceTableProps) {
  const [attendanceStatus, setAttendanceStatus] = useState<Record<string, 'present' | 'absent' | 'late'>>({});

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
    onMarkAttendance(studentId, status);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Asistencia - {format(date, 'PPPP', { locale: es })}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estudiante
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {student.full_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {student.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    attendanceStatus[student.id] === 'present'
                      ? 'bg-green-100 text-green-800'
                      : attendanceStatus[student.id] === 'absent'
                      ? 'bg-red-100 text-red-800'
                      : attendanceStatus[student.id] === 'late'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {attendanceStatus[student.id] === 'present' ? 'Presente' :
                     attendanceStatus[student.id] === 'absent' ? 'Ausente' :
                     attendanceStatus[student.id] === 'late' ? 'Tarde' : 'Sin marcar'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAttendance(student.id, 'present')}
                      className={attendanceStatus[student.id] === 'present' ? 'bg-green-50' : ''}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAttendance(student.id, 'absent')}
                      className={attendanceStatus[student.id] === 'absent' ? 'bg-red-50' : ''}
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkAttendance(student.id, 'late')}
                      className={attendanceStatus[student.id] === 'late' ? 'bg-yellow-50' : ''}
                    >
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```