import { create } from 'zustand';

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol: 'superadmin' | 'admin' | 'profesor';
  estado: 'activo' | 'inactivo';
  fechaCreacion: string;
  ultimoAcceso?: string;
}

interface UserStore {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'fechaCreacion'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUser: (id: string) => User | undefined;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [
    {
      id: '1',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@academia.com',
      rol: 'profesor',
      estado: 'activo',
      fechaCreacion: new Date().toISOString(),
    }
  ],

  addUser: (user) => {
    set((state) => ({
      users: [
        ...state.users,
        {
          ...user,
          id: Math.random().toString(36).substr(2, 9),
          fechaCreacion: new Date().toISOString()
        }
      ]
    }));
  },

  updateUser: (id, user) => {
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u))
    }));
  },

  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== id)
    }));
  },

  getUser: (id) => {
    return get().users.find((u) => u.id === id);
  }
}));