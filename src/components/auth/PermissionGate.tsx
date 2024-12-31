import { ReactNode } from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import { Permission } from '../../lib/rbac/permissions';

interface PermissionGateProps {
  children: ReactNode;
  permission: Permission | Permission[];
  type?: 'all' | 'any';
  fallback?: ReactNode;
}

export default function PermissionGate({
  children,
  permission,
  type = 'any',
  fallback = null
}: PermissionGateProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions();

  const checkPermission = () => {
    if (typeof permission === 'string') {
      return hasPermission(permission);
    }
    return type === 'all' ? hasAllPermissions(permission) : hasAnyPermission(permission);
  };

  return checkPermission() ? <>{children}</> : <>{fallback}</>;
}