```typescript
import { useEffect, useState } from 'react';
import { BarChart2, Users, Clock } from 'lucide-react';
import { attendanceApi } from '@/modules/attendance/api';
import type { AttendanceStats } from '@/modules/attendance/types';

interface AttendanceSummaryProps {
  classId: string;
  date: string;
}

export function AttendanceSummary({ classId, date }: AttendanceSummaryProps) {
  const [stats, setStats] = useState<AttendanceStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const attendance = await attendanceApi.getByClass(classId, date);
        const total = attendance.length;
        const present = attendance.filter(a => a.status === 'present').length;
        const late = attendance.filter(a => a.status === 'late').length;
        const absent = attendance.filter(a => a.status === 'absent').length;

        setStats({
          total_classes: total,
          present_count: present,
          absent_count: absent,
          late_count: late,
          attendance_rate: total > 0 ? ((present + late) / total) * 100 : 0
        });
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      }
    };

    if (classId && date) {
      loadStats();
    }
  }, [classId, date]);

  if (!stats) return null;

  const summaryItems = [
    {
      title: 'Asistencia Total',
      value: `${Math.round(stats.attendance_rate)}%`,
      icon: BarChart2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Presentes',
      value: stats.present_count,
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Llegadas Tarde',
      value: stats.late_count,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {summaryItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="bg-white overflow-hidden shadow-sm rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`${item.bgColor} rounded-lg p-3`}>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.title}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {item.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```