import React from 'react';
import { Users, BookOpen, DollarSign, Home } from 'lucide-react';
import { useStudentStore } from '../../stores/studentStore';
import { useClassStore } from '../../stores/classStore';
import { useRoomStore } from '../../stores/roomStore';

export default function DailyStats() {
  const { students } = useStudentStore();
  const { classes } = useClassStore();
  const { rooms } = useRoomStore();

  const activeStudents = students.filter(s => s.estado === 'activo').length;
  const todayClasses = classes.filter(c => {
    const today = new Date().getDay();
    const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    return c.horario.dia.toLowerCase() === dias[today];
  }).length;

  const availableRooms = rooms.filter(r => r.estado === 'disponible').length;

  const stats = [
    {
      name: 'Estudiantes Activos',
      value: activeStudents,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Clases Hoy',
      value: todayClasses,
      icon: BookOpen,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Ingresos del Mes',
      value: '$1.2M',
      icon: DollarSign,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Salas Disponibles',
      value: `${availableRooms}/${rooms.length}`,
      icon: Home,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white p-5 shadow"
          >
            <div className="flex items-center">
              <div className={`${stat.bgColor} rounded-lg p-3`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}