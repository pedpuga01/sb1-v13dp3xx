import { useAuthStore } from '../stores/authStore';

// Definición de permisos por rol
export const PERMISSIONS = {
  // Permisos de Superadmin
  MANAGE_ACADEMIES: 'manage_academies',
  MANAGE_PLANS: 'manage_plans',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_BILLING: 'manage_billing',

  // Permisos de Admin
  MANAGE_ACADEMY_SETTINGS: 'manage_academy_settings',
  MANAGE_TEACHERS: 'manage_teachers',
  MANAGE_STUDENTS: 'manage_students',
  MANAGE_CLASSES: 'manage_classes',
  VIEW_ACADEMY_ANALYTICS: 'view_academy_analytics',
  MANAGE_PAYMENTS: 'manage_payments',

  // Permisos de Profesor
  VIEW_CLASSES: 'view_classes',
  MANAGE_ATTENDANCE: 'manage_attendance',
  MANAGE_GRADES: 'manage_grades',
  VIEW_STUDENTS: 'view_students',

  // Permisos de Estudiante
  VIEW_SCHEDULE: 'view_schedule',
  VIEW_GRADES: 'view_grades',
  VIEW_PAYMENTS: 'view_payments'
} as const;

type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Asignación de permisos por rol
const rolePermissions: Record<string, Permission[]> = {
  superadmin: [
    PERMISSIONS.MANAGE_ACADEMIES,
    PERMISSIONS.MANAGE_PLANS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_BILLING
  ],
  admin: [
    PERMISSIONS.MANAGE_ACADEMY_SETTINGS,
    PERMISSIONS.MANAGE_TEACHERS,
    PERMISSIONS.MANAGE_STUDENTS,
    PERMISSIONS.MANAGE_CLASSES,
    PERMISSIONS.VIEW_ACADEMY_ANALYTICS,
    PERMISSIONS.MANAGE_PAYMENTS
  ],
  teacher: [
    PERMISSIONS.VIEW_CLASSES,
    PERMISSIONS.MANAGE_ATTENDANCE,
    PERMISSIONS.MANAGE_GRADES,
    PERMISSIONS.VIEW_STUDENTS
  ],
  student: [
    PERMISSIONS.VIEW_SCHEDULE,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.VIEW_PAYMENTS
  ]
};

export function usePermissions() {
  const { userData } = useAuthStore();
  
  const hasPermission = (permission: Permission): boolean => {
    if (!userData?.role) return false;
    return rolePermissions[userData.role].includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(hasPermission);
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(hasPermission);
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    userRole: userData?.role
  };
}