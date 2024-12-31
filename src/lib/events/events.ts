// Definición de eventos del sistema
export const EVENTS = {
  // Auth Events
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
  AUTH_ERROR: 'auth:error',
  
  // Academy Events
  ACADEMY_UPDATED: 'academy:updated',
  ACADEMY_SETTINGS_CHANGED: 'academy:settings:changed',
  
  // Student Events
  STUDENT_CREATED: 'student:created',
  STUDENT_UPDATED: 'student:updated',
  STUDENT_DELETED: 'student:deleted',
  
  // Class Events
  CLASS_CREATED: 'class:created',
  CLASS_UPDATED: 'class:updated',
  CLASS_DELETED: 'class:deleted',
  CLASS_ATTENDANCE_MARKED: 'class:attendance:marked',
  
  // Payment Events
  PAYMENT_RECEIVED: 'payment:received',
  PAYMENT_OVERDUE: 'payment:overdue',
  
  // System Events
  CACHE_INVALIDATED: 'cache:invalidated',
  ERROR_OCCURRED: 'error:occurred',
  NETWORK_STATUS_CHANGED: 'network:status:changed'
} as const;

export type EventType = typeof EVENTS[keyof typeof EVENTS];