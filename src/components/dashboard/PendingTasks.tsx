import React, { useState } from 'react';
import { Plus, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useTaskStore } from '../../stores/taskStore';
import { useAuthStore } from '../../stores/authStore';
import TaskForm from './TaskForm';

export default function PendingTasks() {
  const [showForm, setShowForm] = useState(false);
  const { userData } = useAuthStore();
  const { getTasksByUser } = useTaskStore();

  const tasks = getTasksByUser(userData?.uid || '');
  const pendingTasks = tasks.filter(task => task.estado === 'pendiente')
    .sort((a, b) => new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime());

  const isOverdue = (date: string) => {
    return new Date(date).getTime() < new Date().getTime();
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Tareas Pendientes</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Tarea
          </Button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {pendingTasks.length > 0 ? (
          pendingTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                isOverdue(task.fechaVencimiento) ? 'bg-red-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`mt-0.5 ${
                    task.prioridad === 'alta'
                      ? 'text-red-500'
                      : task.prioridad === 'media'
                      ? 'text-yellow-500'
                      : 'text-blue-500'
                  }`}>
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{task.titulo}</h3>
                    <p className="mt-1 text-sm text-gray-500">{task.descripcion}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(task.fechaVencimiento).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(task.fechaVencimiento).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-sm text-gray-500">
            No hay tareas pendientes
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <TaskForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}