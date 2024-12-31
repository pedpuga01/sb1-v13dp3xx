export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  action_url?: string;
  created_at: string;
}

export interface NotificationTemplate {
  title: string;
  message: string;
  type: Notification['type'];
  action_url?: string;
}

export const NOTIFICATION_TEMPLATES = {
  CLASS_SCHEDULED: (className: string, date: string): NotificationTemplate => ({
    title: 'Nueva Clase Programada',
    message: `Se ha programado la clase "${className}" para el ${date}`,
    type: 'info',
    action_url: '/calendar'
  }),
  
  PAYMENT_RECEIVED: (amount: string): NotificationTemplate => ({
    title: 'Pago Recibido',
    message: `Se ha registrado un pago por ${amount}`,
    type: 'success',
    action_url: '/payments'
  }),
  
  PAYMENT_OVERDUE: (amount: string, dueDate: string): NotificationTemplate => ({
    title: 'Pago Pendiente',
    message: `Tienes un pago pendiente de ${amount} vencido el ${dueDate}`,
    type: 'warning',
    action_url: '/payments'
  }),
  
  GRADE_UPDATED: (className: string): NotificationTemplate => ({
    title: 'Calificación Actualizada',
    message: `Se ha actualizado tu calificación en la clase "${className}"`,
    type: 'info',
    action_url: '/grades'
  })
} as const;