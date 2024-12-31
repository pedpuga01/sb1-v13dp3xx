import { Permission, PERMISSIONS } from './permissions';

export type Role = 'superadmin' | 'admin' | 'teacher' | 'student';

export interface RoleConfig {
  name: string;
  description: string;
  permissions: Permission[];
  inherits?: Role[];
}

export const ROLES: Record<Role, RoleConfig> = {
  superadmin: {
    name: 'Super Administrador',
    description: 'Control total del sistema y gestión de academias',
    permissions: [
      PERMISSIONS.MANAGE_ACADEMIES,
      PERMISSIONS.MANAGE_PLANS,
      PERMISSIONS.VIEW_GLOBAL_ANALYTICS
    ],
    inherits: ['admin']
  },
  
  admin: {
    name: 'Administrador',
    description: 'Gestión completa de una academia',
    permissions: [
      PERMISSIONS.MANAGE_ACADEMY,
      PERMISSIONS.MANAGE_TEACHERS,
      PERMISSIONS.MANAGE_STUDENTS,
      PERMISSIONS.MANAGE_CLASSES,
      PERMISSIONS.VIEW_ACADEMY_ANALYTICS,
      PERMISSIONS.MANAGE_PAYMENTS
    ]
  },
  
  teacher: {
    name: 'Profesor',
    description: 'Gestión de clases y estudiantes asignados',
    permissions: [
      PERMISSIONS.VIEW_OWN_CLASSES,
      PERMISSIONS.MANAGE_ATTENDANCE,
      PERMISSIONS.MANAGE_GRADES,
      PERMISSIONS.VIEW_ASSIGNED_STUDENTS
    ]
  },
  
  student: {
    name: 'Estudiante',
    description: 'Acceso a información personal y clases',
    permissions: [
      PERMISSIONS.VIEW_OWN_SCHEDULE,
      PERMISSIONS.VIEW_OWN_GRADES,
      PERMISSIONS.VIEW_OWN_PAYMENTS
    ]
  }
};