import { useAuth } from '../components/auth/AuthProvider';
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions } from '../lib/rbac/permissions';

export function usePermissions() {
  const { user } = useAuth();
  const userRole = user?.role || 'guest';

  return {
    hasPermission: (permission: Permission) => hasPermission(userRole, permission),
    hasAnyPermission: (permissions: Permission[]) => hasAnyPermission(userRole, permissions),
    hasAllPermissions: (permissions: Permission[]) => hasAllPermissions(userRole, permissions),
    userRole
  };
}