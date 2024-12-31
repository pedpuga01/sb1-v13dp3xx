/*
  # Mejoras en el esquema de autenticación

  1. Nuevas Tablas
    - `user_profiles`: Información extendida de usuarios
    - `role_permissions`: Mapeo de roles y permisos
    - `permissions`: Catálogo de permisos del sistema

  2. Cambios
    - Agregar campos a users para manejo de estado y metadata
    - Agregar políticas de seguridad para los nuevos objetos

  3. Seguridad
    - Políticas RLS para todas las tablas nuevas
    - Permisos basados en roles
*/

-- Tabla de permisos
CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de mapeo roles-permisos
CREATE TABLE IF NOT EXISTS role_permissions (
  role text NOT NULL,
  permission_id uuid REFERENCES permissions(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (role, permission_id)
);

-- Tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  avatar_url text,
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Agregar campos a users
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS last_login timestamptz,
ADD COLUMN IF NOT EXISTS login_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

-- Habilitar RLS
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas para permisos
CREATE POLICY "Permisos visibles para usuarios autenticados"
  ON permissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Solo superadmin puede modificar permisos"
  ON permissions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'superadmin'
    )
  );

-- Políticas para role_permissions
CREATE POLICY "Role permissions visibles para usuarios autenticados"
  ON role_permissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Solo superadmin puede modificar role permissions"
  ON role_permissions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role = 'superadmin'
    )
  );

-- Políticas para user_profiles
CREATE POLICY "Usuarios pueden ver su propio perfil"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins pueden ver perfiles de su academia"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u1
      JOIN users u2 ON u1.academy_id = u2.academy_id
      WHERE u1.id = auth.uid()
      AND u2.id = user_profiles.user_id
      AND u1.role IN ('admin', 'superadmin')
    )
  );

-- Triggers
CREATE TRIGGER update_permissions_updated_at
  BEFORE UPDATE ON permissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insertar permisos base
INSERT INTO permissions (code, description) VALUES
  ('manage:academies', 'Gestionar academias'),
  ('manage:users', 'Gestionar usuarios'),
  ('manage:classes', 'Gestionar clases'),
  ('manage:students', 'Gestionar estudiantes'),
  ('view:analytics', 'Ver analíticas'),
  ('manage:payments', 'Gestionar pagos')
ON CONFLICT (code) DO NOTHING;

-- Asignar permisos a roles
INSERT INTO role_permissions (role, permission_id)
SELECT 'superadmin', id FROM permissions
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions 
WHERE code IN ('manage:users', 'manage:classes', 'manage:students', 'manage:payments')
ON CONFLICT DO NOTHING;