import { X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const toastStyles = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300'
};

export default function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`${toastStyles[toast.type]} p-4 rounded-lg border shadow-sm flex items-center justify-between min-w-[300px]`}
        >
          <p className="text-sm">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 text-current opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}