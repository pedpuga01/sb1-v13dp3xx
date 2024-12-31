import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../components/auth/AuthProvider';
import { PERMISSIONS } from '../../lib/rbac/permissions';

vi.mock('../../components/auth/AuthProvider', () => ({
  useAuth: vi.fn()
}));

describe('usePermissions', () => {
  it('should grant superadmin all permissions', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'superadmin' }
    });

    const { result } = renderHook(() => usePermissions());

    expect(result.current.hasPermission(PERMISSIONS.MANAGE_ACADEMIES)).toBe(true);
    expect(result.current.hasPermission(PERMISSIONS.MANAGE_TEACHERS)).toBe(true);
    expect(result.current.hasPermission(PERMISSIONS.VIEW_ACADEMY_ANALYTICS)).toBe(true);
  });

  it('should restrict teacher permissions appropriately', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'teacher' }
    });

    const { result } = renderHook(() => usePermissions());

    expect(result.current.hasPermission(PERMISSIONS.VIEW_OWN_CLASSES)).toBe(true);
    expect(result.current.hasPermission(PERMISSIONS.MANAGE_GRADES)).toBe(true);
    expect(result.current.hasPermission(PERMISSIONS.MANAGE_ACADEMIES)).toBe(false);
  });

  it('should handle multiple permission checks', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: 'admin' }
    });

    const { result } = renderHook(() => usePermissions());

    const teacherPerms = [
      PERMISSIONS.VIEW_OWN_CLASSES,
      PERMISSIONS.MANAGE_GRADES
    ];

    const adminPerms = [
      PERMISSIONS.MANAGE_TEACHERS,
      PERMISSIONS.MANAGE_STUDENTS
    ];

    expect(result.current.hasAnyPermission(teacherPerms)).toBe(false);
    expect(result.current.hasAllPermissions(adminPerms)).toBe(true);
  });
});