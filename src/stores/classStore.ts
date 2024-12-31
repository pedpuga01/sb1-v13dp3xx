import { create } from 'zustand';

export interface Class {
  id: string;
  nombre: string;
  profesor: string;
  horario: {
    dia: string;
    horaInicio: string;
    horaFin: string;
  };
  capacidad: number;
  estudiantesActuales: number;
  tipo: 'individual' | 'grupal';
  descripcion?: string;
  sala?: string;
}

interface ClassStore {
  classes: Class[];
  addClass: (newClass: Omit<Class, 'id'>) => void;
  updateClass: (id: string, updatedClass: Partial<Class>) => void;
  deleteClass: (id: string) => void;
  getClass: (id: string) => Class | undefined;
}

export const useClassStore = create<ClassStore>((set, get) => ({
  classes: [
    {
      id: '1',
      nombre: 'Canto Individual',
      profesor: 'Ana Martínez',
      horario: {
        dia: 'Lunes',
        horaInicio: '09:00',
        horaFin: '10:00',
      },
      capacidad: 1,
      estudiantesActuales: 1,
      tipo: 'individual',
      sala: 'Sala 1'
    },
    {
      id: '2',
      nombre: 'Técnica Vocal Grupal',
      profesor: 'Carlos Rodríguez',
      horario: {
        dia: 'Martes',
        horaInicio: '11:00',
        horaFin: '12:30',
      },
      capacidad: 10,
      estudiantesActuales: 6,
      tipo: 'grupal',
      sala: 'Sala 2'
    },
  ],

  addClass: (newClass) => {
    set((state) => ({
      classes: [
        ...state.classes,
        {
          ...newClass,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    }));
  },

  updateClass: (id, updatedClass) => {
    set((state) => ({
      classes: state.classes.map((c) =>
        c.id === id ? { ...c, ...updatedClass } : c
      ),
    }));
  },

  deleteClass: (id) => {
    set((state) => ({
      classes: state.classes.filter((c) => c.id !== id),
    }));
  },

  getClass: (id) => {
    return get().classes.find((c) => c.id === id);
  },
}));