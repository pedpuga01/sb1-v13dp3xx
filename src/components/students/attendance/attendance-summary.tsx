```typescript
import { BarChart2, Users, Clock } from 'lucide-react';

interface AttendanceSummaryProps {
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
}

export function AttendanceSummary({ totalStudents, presentCount, absentCount, lateCount }: AttendanceSummaryProps) {
  const stats = [
    {
      name: 'Asistencia Total',
      value: `${Math.round((presentCount / totalStudents) * 100)}%`,
      icon: BarChart2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Presentes',
      value: presentCount,
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Llegadas Tarde',
      value: lateCount,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow-sm rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`${stat.bgColor} rounded-lg p-3`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {stat.value}
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