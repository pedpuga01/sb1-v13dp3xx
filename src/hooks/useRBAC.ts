import { useCallback } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import { roleManager } from '../lib/rbac/RoleManager';
import type { Permission } from '../lib/rbac/permissions';
import type { Role } from '../lib/rbac/roles';

export function useRBAC() {
  const { user } = useAuth();
  const userRole = user?.role as Role || 'student';

  const checkPermission = useCallback((permission: Permission): boolean => {
    return roleManager.hasPermission(userRole, permission);
  }, [userRole]);

  const checkAnyPermission = useCallback((permissions: Permission[]): boolean => {
    return roleManager.hasAnyPermission(userRole, permissions);
  }, [userRole]);

  const checkAllPermissions = useCallback((permissions: Permission[]): boolean => {
    return roleManager.hasAllPermissions(userRole, permissions);
  }, [userRole]);

  const getRoleInfo = useCallback(() => {
    return roleManager.getRoleInfo(userRole);
  }, [userRole]);

  return {
    role: userRole,
    roleInfo: getRoleInfo(),
    checkPermission,
    checkAnyPermission,
    checkAllPermissions,
    isAdmin: userRole === 'admin',
    isSuperAdmin: userRole === 'superadmin',
    isTeacher: userRole === 'teacher',
    isStudent: userRole === 'student'
  };
}