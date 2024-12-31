import { Role, ROLES } from './roles';
import { Permission } from './permissions';

export class RoleManager {
  private static instance: RoleManager;

  private constructor() {}

  static getInstance(): RoleManager {
    if (!RoleManager.instance) {
      RoleManager.instance = new RoleManager();
    }
    return RoleManager.instance;
  }

  getAllPermissionsForRole(role: Role): Permission[] {
    const roleConfig = ROLES[role];
    if (!roleConfig) return [];

    let permissions = [...roleConfig.permissions];

    // Agregar permisos heredados
    if (roleConfig.inherits) {
      roleConfig.inherits.forEach(inheritedRole => {
        permissions = [
          ...permissions,
          ...this.getAllPermissionsForRole(inheritedRole)
        ];
      });
    }

    // Eliminar duplicados
    return [...new Set(permissions)];
  }

  hasPermission(role: Role, permission: Permission): boolean {
    const permissions = this.getAllPermissionsForRole(role);
    return permissions.includes(permission);
  }

  hasAnyPermission(role: Role, permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(role, permission));
  }

  hasAllPermissions(role: Role, permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(role, permission));
  }

  getRoleInfo(role: Role) {
    return ROLES[role];
  }

  getAllRoles(): Role[] {
    return Object.keys(ROLES) as Role[];
  }
}

export const roleManager = RoleManager.getInstance();