import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

interface EmailData {
  template: string;
  email: string;
  data: Record<string, any>;
}

const sendEmailFunction = httpsCallable<EmailData, { success: boolean }>(
  functions, 
  'sendEmail'
);

export async function sendEmail(data: EmailData) {
  try {
    const result = await sendEmailFunction(data);
    return result.data.success;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export async function sendWelcomeEmail(email: string, data: {
  academyName: string;
  adminName: string;
  email: string;
  password: string;
  loginUrl: string;
}) {
  return sendEmail({
    template: 'welcome-academy',
    email,
    data
  });
}

export const emailTemplates = {
  WELCOME_STUDENT: 'welcome-student',
  WELCOME_TEACHER: 'welcome-teacher',
  WELCOME_ACADEMY: 'welcome-academy',
  PASSWORD_RESET: 'password-reset',
  PAYMENT_CONFIRMATION: 'payment-confirmation',
  CLASS_REMINDER: 'class-reminder'
} as const;