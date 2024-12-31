'use client';

import { Clock, Users } from 'lucide-react';

const classes = [
  {
    id: 1,
    name: 'Piano Individual',
    time: '15:00 - 16:00',
    room: 'Sala 1',
    students: '1/1'
  },
  {
    id: 2,
    name: 'Canto Grupal',
    time: '16:30 - 18:00',
    room: 'Sala 2',
    students: '8/10'
  }
];

export function TodayClasses() {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Clases de Hoy</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {classes.map((class_) => (
          <li key={class_.id} className="px-4 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{class_.name}</p>
                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {class_.time}
                  </span>
                  <span>{class_.room}</span>
                </div>
              </div>
              <span className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                {class_.students}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}