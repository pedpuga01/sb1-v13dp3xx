import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './slices/authSlice';
import { AcademySlice, createAcademySlice } from './slices/academySlice';
import { StudentSlice, createStudentSlice } from './slices/studentSlice';
import { ClassSlice, createClassSlice } from './slices/classSlice';

interface StoreState extends AuthSlice, AcademySlice, StudentSlice, ClassSlice {}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createAcademySlice(...a),
        ...createStudentSlice(...a),
        ...createClassSlice(...a)
      }),
      {
        name: 'app-storage',
        partialize: (state) => ({
          user: state.user,
          currentAcademy: state.currentAcademy
        })
      }
    )
  )
);