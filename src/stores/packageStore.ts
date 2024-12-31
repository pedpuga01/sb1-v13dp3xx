import { create } from 'zustand';

export interface ClassPackage {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string;
  clasesPorSemana?: number;
  clasesPorMes?: number;
  tipoClase: 'individual' | 'grupal' | 'mixto';
  beneficios: string[];
  descuento?: number;
  estado: 'activo' | 'inactivo';
}

interface PackageStore {
  packages: ClassPackage[];
  addPackage: (pkg: Omit<ClassPackage, 'id'>) => void;
  updatePackage: (id: string, pkg: Partial<ClassPackage>) => void;
  deletePackage: (id: string) => void;
  getPackage: (id: string) => ClassPackage | undefined;
}

export const usePackageStore = create<PackageStore>((set, get) => ({
  packages: [
    {
      id: '1',
      nombre: 'Pack Básico Individual',
      descripcion: '4 clases individuales al mes',
      precio: 80000,
      duracion: '1 mes',
      clasesPorMes: 4,
      tipoClase: 'individual',
      beneficios: [
        'Horario flexible',
        'Profesor personalizado',
        'Material de estudio incluido'
      ],
      estado: 'activo'
    },
    {
      id: '2',
      nombre: 'Pack Intensivo Grupal',
      descripcion: '12 clases grupales al mes',
      precio: 120000,
      duracion: '1 mes',
      clasesPorMes: 12,
      clasesPorSemana: 3,
      tipoClase: 'grupal',
      beneficios: [
        'Clases grupales dinámicas',
        'Material de estudio incluido',
        'Acceso a eventos especiales'
      ],
      descuento: 15,
      estado: 'activo'
    }
  ],

  addPackage: (pkg) => {
    set((state) => ({
      packages: [
        ...state.packages,
        { ...pkg, id: Math.random().toString(36).substr(2, 9) }
      ]
    }));
  },

  updatePackage: (id, pkg) => {
    set((state) => ({
      packages: state.packages.map((p) => 
        p.id === id ? { ...p, ...pkg } : p
      )
    }));
  },

  deletePackage: (id) => {
    set((state) => ({
      packages: state.packages.filter((p) => p.id !== id)
    }));
  },

  getPackage: (id) => {
    return get().packages.find((p) => p.id === id);
  }
}));