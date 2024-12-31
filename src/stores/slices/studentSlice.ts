import { StateCreator } from 'zustand';
import { Student } from '../../types/models';
import { studentService } from '../../services/students';
import { AppError } from '../../utils/errors';

export interface StudentState {
  students: Student[];
  selectedStudent: Student | null;
  loading: boolean;
  error: string | null;
}

export interface StudentActions {
  fetchStudents: (academyId: string) => Promise<void>;
  selectStudent: (id: string) => void;
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  updateStudent: (id: string, data: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
}

export type StudentSlice = StudentState & StudentActions;

export const createStudentSlice: StateCreator<StudentSlice> = (set, get) => ({
  students: [],
  selectedStudent: null,
  loading: false,
  error: null,

  fetchStudents: async (academyId) => {
    try {
      set({ loading: true, error: null });
      const students = await studentService.getByAcademy(academyId);
      set({ students, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al cargar estudiantes', loading: false });
      throw error;
    }
  },

  selectStudent: (id) => {
    const student = get().students.find(s => s.id === id) || null;
    set({ selectedStudent: student });
  },

  addStudent: async (student) => {
    try {
      set({ loading: true, error: null });
      const newStudent = await studentService.create(student);
      set(state => ({
        students: [...state.students, newStudent],
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al crear estudiante', loading: false });
      throw error;
    }
  },

  updateStudent: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const updatedStudent = await studentService.update(id, data);
      set(state => ({
        students: state.students.map(s => s.id === id ? updatedStudent : s),
        selectedStudent: state.selectedStudent?.id === id ? updatedStudent : state.selectedStudent,
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al actualizar estudiante', loading: false });
      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      set({ loading: true, error: null });
      await studentService.delete(id);
      set(state => ({
        students: state.students.filter(s => s.id !== id),
        selectedStudent: state.selectedStudent?.id === id ? null : state.selectedStudent,
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Error al eliminar estudiante', loading: false });
      throw error;
    }
  }
});