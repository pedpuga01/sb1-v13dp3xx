import { create } from 'zustand';

export interface Room {
  id: string;
  nombre: string;
  capacidad: number;
  equipamiento: string[];
  estado: 'disponible' | 'mantenimiento';
  descripcion?: string;
}

interface RoomStore {
  rooms: Room[];
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  getRoom: (id: string) => Room | undefined;
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: [
    {
      id: '1',
      nombre: 'Sala 1',
      capacidad: 5,
      equipamiento: ['Piano', 'Atril', 'Espejo'],
      estado: 'disponible',
      descripcion: 'Sala para clases individuales'
    },
    {
      id: '2',
      nombre: 'Sala 2',
      capacidad: 15,
      equipamiento: ['Piano de Cola', 'Sistema de Audio', 'Atriles', 'Espejos'],
      estado: 'disponible',
      descripcion: 'Sala para clases grupales'
    }
  ],

  addRoom: (room) => {
    set((state) => ({
      rooms: [...state.rooms, { ...room, id: Math.random().toString(36).substr(2, 9) }]
    }));
  },

  updateRoom: (id, room) => {
    set((state) => ({
      rooms: state.rooms.map((r) => (r.id === id ? { ...r, ...room } : r))
    }));
  },

  deleteRoom: (id) => {
    set((state) => ({
      rooms: state.rooms.filter((r) => r.id !== id)
    }));
  },

  getRoom: (id) => {
    return get().rooms.find((r) => r.id === id);
  }
}));