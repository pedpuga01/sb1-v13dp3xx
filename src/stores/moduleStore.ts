import { create } from 'zustand';

export interface Module {
  id: string;
  nombre: string;
  descripcion: string;
  nivel: 'basico' | 'intermedio' | 'avanzado';
  duracionSemanas: number;
  objetivos: string[];
  contenidos: {
    titulo: string;
    descripcion: string;
  }[];
}

interface ModuleStore {
  modules: Module[];
  addModule: (module: Omit<Module, 'id'>) => void;
  updateModule: (id: string, module: Partial<Module>) => void;
  deleteModule: (id: string) => void;
  getModule: (id: string) => Module | undefined;
}

export const useModuleStore = create<ModuleStore>((set, get) => ({
  modules: [
    {
      id: '1',
      nombre: 'Fundamentos Vocales',
      descripcion: 'Explora los fundamentos de la técnica vocal y desarrolla una base sólida para tu canto.',
      nivel: 'basico',
      duracionSemanas: 12,
      objetivos: [
        'Desarrollar una respiración adecuada para el canto',
        'Comprender la anatomía básica del aparato vocal',
        'Practicar ejercicios de calentamiento vocal',
        'Aprender técnicas de proyección de voz',
      ],
      contenidos: [
        {
          titulo: 'Respiración y Apoyo',
          descripcion: 'Técnicas fundamentales de respiración diafragmática y control del aire.'
        },
        {
          titulo: 'Resonancia y Proyección',
          descripcion: 'Ejercicios para desarrollar una voz resonante y bien proyectada.'
        },
        {
          titulo: 'Articulación y Dicción',
          descripcion: 'Prácticas para mejorar la claridad y precisión en la pronunciación.'
        }
      ]
    }
  ],

  addModule: (newModule) => {
    set((state) => ({
      modules: [
        ...state.modules,
        {
          ...newModule,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    }));
  },

  updateModule: (id, updatedModule) => {
    set((state) => ({
      modules: state.modules.map((m) =>
        m.id === id ? { ...m, ...updatedModule } : m
      ),
    }));
  },

  deleteModule: (id) => {
    set((state) => ({
      modules: state.modules.filter((m) => m.id !== id),
    }));
  },

  getModule: (id) => {
    return get().modules.find((m) => m.id === id);
  },
}));