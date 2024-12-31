import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { superadminCredentials, academyInitialData } from '../config/initialData';

export async function setupSuperadmin() {
  const auth = getAuth();
  const db = getFirestore();

  try {
    // Primero intentar iniciar sesión
    try {
      await signInWithEmailAndPassword(
        auth,
        superadminCredentials.email,
        superadminCredentials.password
      );
      return { success: true };
    } catch (loginError) {
      // Si el login falla, intentar crear el usuario
      const { user } = await createUserWithEmailAndPassword(
        auth, 
        superadminCredentials.email, 
        superadminCredentials.password
      );

      // Verificar si ya existe el documento del usuario
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Crear documento de usuario
        await setDoc(userDocRef, {
          email: superadminCredentials.email,
          role: superadminCredentials.role,
          status: 'active',
          createdAt: new Date().toISOString()
        });

        // Crear documento de academia
        const academyRef = doc(db, 'academies', 'ucansing');
        await setDoc(academyRef, {
          ...academyInitialData,
          createdAt: new Date().toISOString(),
          ownerId: user.uid
        });
      }

      return { success: true };
    }
  } catch (error: any) {
    console.error('Error setting up superadmin:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}