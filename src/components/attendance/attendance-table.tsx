```typescript
import { useState, useEffect } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStudents } from '@/hooks/use-students';
import { useAttendance } from '@/hooks/use-attendance';
import type { AttendanceStatus } from '@/modules/attendance/types';

interface AttendanceTableProps {
  classId: string;
  date: string;
  onMarkAttendance: (studentId: string, status: AttendanceStatus) => void;
  loading?: boolean;
}

export function AttendanceTable({ classId, date, onMarkAttendance, loading }: AttendanceTableProps) {
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({});
  const { students } = useStudents('academy-id'); // TODO: Get from context
  const { getAttendance } = useAttendance(classId);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const attendance = await getAttendance(date);
        const map: Record<string, AttendanceStatus> = {};
        attendance.forEach(a => {
          map[a.student_id] = a.status;
        });
        setAttendanceMap(map);
      } catch (error) {
        console.error('Error al cargar asistencia:', error);
      }
    };

    if (classId && date) {
      loadAttendance();
    }
  }, [classId, date, getAttendance]);

  const handleMarkAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status
    }));
    onMarkAttendance(studentId, status);
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
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
                  attendanceMap[student.id] === 'present'
                    ? 'bg-green-100 text-green-800'
                    : attendanceMap[student.id] === 'absent'
                    ? 'bg-red-100 text-red-800'
                    : attendanceMap[student.id] === 'late'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {attendanceMap[student.id] === 'present' ? 'Presente' :
                   attendanceMap[student.id] === 'absent' ? 'Ausente' :
                   attendanceMap[student.id] === 'late' ? 'Tarde' : 'Sin marcar'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAttendance(student.id, 'present')}
                    className={attendanceMap[student.id] === 'present' ? 'bg-green-50' : ''}
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAttendance(student.id, 'absent')}
                    className={attendanceMap[student.id] === 'absent' ? 'bg-red-50' : ''}
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAttendance(student.id, 'late')}
                    className={attendanceMap[student.id] === 'late' ? 'bg-yellow-50' : ''}
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
  );
}
```