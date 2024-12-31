'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen,
  Calendar,
  Settings,
  CreditCard
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Estudiantes', href: '/dashboard/students', icon: Users },
  { name: 'Clases', href: '/dashboard/classes', icon: BookOpen },
  { name: 'Calendario', href: '/dashboard/calendar', icon: Calendar },
  { name: 'Pagos', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Configuración', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-[calc(100vh-4rem)] w-64 flex-col border-r bg-white">
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-gray-50 text-primary'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
              )}
            >
              <item.icon
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