import { ReactNode } from 'react';
import { useRBAC } from '../../hooks/useRBAC';
import type { Role } from '../../lib/rbac/roles';

interface RoleGateProps {
  children: ReactNode;
  role: Role | Role[];
  fallback?: ReactNode;
}

export default function RoleGate({ children, role, fallback = null }: RoleGateProps) {
  const { role: userRole } = useRBAC();

  const hasRole = Array.isArray(role) 
    ? role.includes(userRole)
    : role === userRole;

  return hasRole ? <>{children}</> : <>{fallback}</>;
}