import { Check, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { Link } from 'react-router-dom';

const notificationStyles = {
  info: 'bg-blue-50 border-blue-200',
  success: 'bg-green-50 border-green-200',
  warning: 'bg-yellow-50 border-yellow-200',
  error: 'bg-red-50 border-red-200'
};

export default function NotificationList() {
  const { user } = useAuth();
  const { notifications, loading, markAsRead } = useNotifications(user?.id || '');

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Cargando notificaciones...
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No hay notificaciones nuevas
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`p-4 ${notificationStyles[notification.type]} border-l-4`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">
                {notification.title}
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                {notification.message}
              </p>
              {notification.action_url && (
                <Link
                  to={notification.action_url}
                  className="mt-2 text-sm text-primary hover:text-primary/90"
                >
                  Ver más
                </Link>
              )}
            </div>
            <button
              onClick={() => markAsRead(notification.id)}
              className="ml-4 text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}