import { PASSWORD_REQUIREMENTS } from '../config/auth';

export function generateSecurePassword(): string {
  const length = PASSWORD_REQUIREMENTS.minLength;
  const charset = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    special: '!@#$%^&*'
  };
  
  let password = '';
  
  // Asegurar al menos un carácter de cada tipo requerido
  if (PASSWORD_REQUIREMENTS.requireLowercase) {
    password += charset.lowercase.charAt(Math.floor(Math.random() * charset.lowercase.length));
  }
  if (PASSWORD_REQUIREMENTS.requireUppercase) {
    password += charset.uppercase.charAt(Math.floor(Math.random() * charset.uppercase.length));
  }
  if (PASSWORD_REQUIREMENTS.requireNumbers) {
    password += charset.numbers.charAt(Math.floor(Math.random() * charset.numbers.length));
  }
  if (PASSWORD_REQUIREMENTS.requireSpecialChars) {
    password += charset.special.charAt(Math.floor(Math.random() * charset.special.length));
  }
  
  // Completar el resto de la contraseña
  const allChars = Object.values(charset).join('');
  while (password.length < length) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  // Mezclar los caracteres
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

export function validatePassword(password: string): boolean {
  const rules = PASSWORD_REQUIREMENTS;
  
  return (
    password.length >= rules.minLength &&
    (!rules.requireUppercase || /[A-Z]/.test(password)) &&
    (!rules.requireLowercase || /[a-z]/.test(password)) &&
    (!rules.requireNumbers || /[0-9]/.test(password)) &&
    (!rules.requireSpecialChars || /[!@#$%^&*]/.test(password))
  );
}