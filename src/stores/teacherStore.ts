import { create } from 'zustand';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { sendWelcomeEmail, emailTemplates } from '../lib/emailService';

interface CreateTeacherData {
  name: string;
  email: string;
  academyId: string;
  // ... otros campos
}

interface TeacherStore {
  createTeacher: (data: CreateTeacherData) => Promise<void>;
  // ... otros métodos
}

export const useTeacherStore = create<TeacherStore>((set) => ({
  createTeacher: async (data) => {
    try {
      // Crear documento de profesor
      const teacherRef = doc(collection(db, 'users'));
      await setDoc(teacherRef, {
        ...data,
        role: 'teacher',
        createdAt: new Date().toISOString(),
        status: 'active'
      });

      // Enviar email de bienvenida
      await sendWelcomeEmail(data.email, emailTemplates.WELCOME_TEACHER, {
        teacherName: data.name,
        academyName: data.academyName,
        loginUrl: `${window.location.origin}/login`
      });

    } catch (error) {
      console.error('Error creating teacher:', error);
      throw error;
    }
  }
}));