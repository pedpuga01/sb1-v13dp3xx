import { create } from 'zustand';

export interface Task {
  id: string;
  titulo: string;
  descripcion: string;
  fechaCreacion: string;
  fechaVencimiento: string;
  estado: 'pendiente' | 'completada';
  prioridad: 'baja' | 'media' | 'alta';
  asignadoPor: string;
  asignadoA: string[];
  tipo: 'administrativa' | 'academica';
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'fechaCreacion'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
  getTasksByUser: (userId: string) => Task[];
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  addTask: (task) => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: Math.random().toString(36).substr(2, 9),
          fechaCreacion: new Date().toISOString()
        }
      ]
    }));
  },

  updateTask: (id, task) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t))
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id)
    }));
  },

  getTask: (id) => {
    return get().tasks.find((t) => t.id === id);
  },

  getTasksByUser: (userId) => {
    return get().tasks.filter((t) => t.asignadoA.includes(userId));
  }
}));