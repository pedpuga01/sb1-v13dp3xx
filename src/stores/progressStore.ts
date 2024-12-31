import { create } from 'zustand';

export interface ProgressNote {
  id: string;
  studentId: string;
  moduleId: string;
  fecha: string;
  contenido: string;
  tipo: 'avance' | 'observacion' | 'evaluacion';
  profesor: string;
  aspectos?: {
    tecnica?: number;
    interpretacion?: number;
    ritmo?: number;
    afinacion?: number;
  };
  objetivosLogrados?: string[];
  recomendaciones?: string;
}

interface ProgressStore {
  notes: ProgressNote[];
  addNote: (note: Omit<ProgressNote, 'id'>) => void;
  updateNote: (id: string, note: Partial<ProgressNote>) => void;
  deleteNote: (id: string) => void;
  getStudentNotes: (studentId: string) => ProgressNote[];
  getModuleNotes: (studentId: string, moduleId: string) => ProgressNote[];
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  notes: [],

  addNote: (note) => {
    set((state) => ({
      notes: [
        ...state.notes,
        { ...note, id: Math.random().toString(36).substr(2, 9) }
      ]
    }));
  },

  updateNote: (id, note) => {
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, ...note } : n))
    }));
  },

  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id)
    }));
  },

  getStudentNotes: (studentId) => {
    return get().notes
      .filter((n) => n.studentId === studentId)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  },

  getModuleNotes: (studentId, moduleId) => {
    return get().notes
      .filter((n) => n.studentId === studentId && n.moduleId === moduleId)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }
}));