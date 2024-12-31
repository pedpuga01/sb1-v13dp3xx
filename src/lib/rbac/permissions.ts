export const PERMISSIONS = {
  // Superadmin
  MANAGE_ACADEMIES: 'manage:academies',
  MANAGE_PLANS: 'manage:plans',
  VIEW_GLOBAL_ANALYTICS: 'view:global_analytics',
  
  // Admin
  MANAGE_ACADEMY: 'manage:academy',
  MANAGE_TEACHERS: 'manage:teachers',
  MANAGE_STUDENTS: 'manage:students',
  MANAGE_CLASSES: 'manage:classes',
  VIEW_ACADEMY_ANALYTICS: 'view:academy_analytics',
  MANAGE_PAYMENTS: 'manage:payments',
  
  // Teacher
  VIEW_OWN_CLASSES: 'view:own_classes',
  MANAGE_ATTENDANCE: 'manage:attendance',
  MANAGE_GRADES: 'manage:grades',
  VIEW_ASSIGNED_STUDENTS: 'view:assigned_students',
  
  // Student
  VIEW_OWN_SCHEDULE: 'view:own_schedule',
  VIEW_OWN_GRADES: 'view:own_grades',
  VIEW_OWN_PAYMENTS: 'view:own_payments'
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  superadmin: [
    PERMISSIONS.MANAGE_ACADEMIES,
    PERMISSIONS.MANAGE_PLANS,
    PERMISSIONS.VIEW_GLOBAL_ANALYTICS,
    // Heredar permisos de admin
    ...ROLE_PERMISSIONS.admin
  ],
  
  admin: [
    PERMISSIONS.MANAGE_ACADEMY,
    PERMISSIONS.MANAGE_TEACHERS,
    PERMISSIONS.MANAGE_STUDENTS,
    PERMISSIONS.MANAGE_CLASSES,
    PERMISSIONS.VIEW_ACADEMY_ANALYTICS,
    PERMISSIONS.MANAGE_PAYMENTS
  ],
  
  teacher: [
    PERMISSIONS.VIEW_OWN_CLASSES,
    PERMISSIONS.MANAGE_ATTENDANCE,
    PERMISSIONS.MANAGE_GRADES,
    PERMISSIONS.VIEW_ASSIGNED_STUDENTS
  ],
  
  student: [
    PERMISSIONS.VIEW_OWN_SCHEDULE,
    PERMISSIONS.VIEW_OWN_GRADES,
    PERMISSIONS.VIEW_OWN_PAYMENTS
  ]
};

export function hasPermission(userRole: string, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) ?? false;
}

export function hasAnyPermission(userRole: string, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission));
}

export function hasAllPermissions(userRole: string, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRole, permission));
}