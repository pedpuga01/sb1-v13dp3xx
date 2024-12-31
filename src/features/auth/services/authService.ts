import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../../../lib/firebase/config';
import { AuthError } from '../../../utils/errors';

export class AuthService {
  private static instance: AuthService;
  private rateLimiter = new Map<string, number>();
  
  private constructor() {}
  
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      throw new AuthError(error.message);
    }
  }

  async signOut() {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new AuthError(error.message);
    }
  }
}

export const authService = AuthService.getInstance();