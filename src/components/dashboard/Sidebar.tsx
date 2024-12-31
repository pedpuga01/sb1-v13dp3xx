import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Calendar, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Estudiantes', href: '/students', icon: Users },
  { name: 'Clases', href: '/classes', icon: BookOpen },
  { name: 'Calendario', href: '/calendar', icon: Calendar },
  { name: 'Configuración', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-[calc(100vh-4rem)] w-64 flex-col border-r bg-white">
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-gray-50 text-primary'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
              )}
            >
              <Icon
                className={cn(
                  'mr-3 h-5 w-5',
                  isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}