import { create } from 'zustand';
import { doc, setDoc, collection, serverTimestamp, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { sendWelcomeEmail } from '../lib/emailService';
import { generatePassword } from '../utils/passwordUtils';

interface Client {
  id: string;
  academyName: string;
  businessType: string;
  rut: string;
  status: 'active' | 'trial' | 'inactive';
  subscriptionPlan: string;
  studentsCount: number;
  teachersCount: number;
  createdAt: Date;
  trialEndsAt: Date;
}

interface ClientStore {
  clients: Client[];
  createClient: (data: any) => Promise<{ success: boolean; message: string }>;
}

const SUBSCRIPTION_LIMITS = {
  basic: {
    students: 25,
    teachers: 5,
    classes: 10,
    locations: 1
  },
  pro: {
    students: 100,
    teachers: 15,
    classes: 30,
    locations: 2
  },
  enterprise: {
    students: 500,
    teachers: 50,
    classes: 100,
    locations: 5
  }
};

export const useClientStore = create<ClientStore>((set, get) => ({
  clients: [],

  createClient: async (data) => {
    try {
      const db = getFirestore();
      const auth = getAuth();

      // 1. Verificar si ya existe una academia con el mismo RUT
      const academiesRef = collection(db, 'academies');
      const rutQuery = query(academiesRef, where('rut', '==', data.rut));
      const rutSnapshot = await getDocs(rutQuery);

      if (!rutSnapshot.empty) {
        throw new Error('Ya existe una academia registrada con este RUT');
      }

      // 2. Verificar si el email ya está en uso
      const usersRef = collection(db, 'users');
      const emailQuery = query(usersRef, where('email', '==', data.adminEmail));
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        throw new Error('El email del administrador ya está registrado');
      }

      // 3. Generar contraseña temporal
      const tempPassword = generatePassword();

      try {
        // 4. Crear usuario administrador en Firebase Auth
        const { user } = await createUserWithEmailAndPassword(auth, data.adminEmail, tempPassword);

        // 5. Crear documento de academia
        const academyRef = doc(collection(db, 'academies'));
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + 30);

        const academyData = {
          name: data.academyName,
          businessType: data.businessType,
          rut: data.rut,
          phone: data.phone,
          website: data.website,
          address: data.address,
          status: 'trial',
          createdAt: serverTimestamp(),
          trialEndsAt: trialEndDate,
          owner: user.uid,
          configuration: {
            workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            schedule: {
              start: '09:00',
              end: '18:00'
            }
          },
          subscription: {
            plan: data.subscriptionPlan,
            limits: SUBSCRIPTION_LIMITS[data.subscriptionPlan as keyof typeof SUBSCRIPTION_LIMITS],
            startDate: serverTimestamp(),
            endDate: trialEndDate
          }
        };

        await setDoc(academyRef, academyData);

        // 6. Crear documento de usuario administrador
        const userRef = doc(db, 'users', user.uid);
        const userData = {
          firstName: data.adminFirstName,
          lastName: data.adminLastName,
          email: data.adminEmail,
          phone: data.adminPhone,
          position: data.adminPosition,
          role: 'admin',
          academyId: academyRef.id,
          createdAt: serverTimestamp(),
          status: 'active'
        };

        await setDoc(userRef, userData);

        // 7. Enviar email de bienvenida con credenciales
        await sendWelcomeEmail(data.adminEmail, {
          academyName: data.academyName,
          adminName: `${data.adminFirstName} ${data.adminLastName}`,
          email: data.adminEmail,
          password: tempPassword,
          loginUrl: `${window.location.origin}/login`
        });

        // 8. Actualizar estado local
        const newClient: Client = {
          id: academyRef.id,
          academyName: data.academyName,
          businessType: data.businessType,
          rut: data.rut,
          status: 'trial',
          subscriptionPlan: data.subscriptionPlan,
          studentsCount: 0,
          teachersCount: 1,
          createdAt: new Date(),
          trialEndsAt: trialEndDate
        };

        set((state) => ({
          clients: [...state.clients, newClient]
        }));

        return { success: true, message: 'Academia creada exitosamente' };

      } catch (authError: any) {
        if (authError.code === 'auth/email-already-in-use') {
          throw new Error('El email del administrador ya está registrado');
        }
        throw authError;
      }

    } catch (error: any) {
      console.error('Error al crear cliente:', error);
      throw new Error(error.message || 'Error al crear la academia');
    }
  }
}));