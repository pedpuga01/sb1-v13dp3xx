import { useState } from 'react';
import { Bell } from 'lucide-react';
import Button from '../ui/Button';

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
          3
        </span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <h3 className="text-sm font-medium">Notificaciones</h3>
            <div className="mt-2 space-y-2">
              <div className="rounded-md bg-gray-50 p-3">
                <p className="text-sm">Nueva inscripción en Clase de Piano</p>
                <p className="text-xs text-gray-500">Hace 5 minutos</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3">
                <p className="text-sm">Pago recibido de Juan Pérez</p>
                <p className="text-xs text-gray-500">Hace 1 hora</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}