/*
  # Crear usuario superadmin inicial

  1. Usuarios
    - Crea usuario superadmin con email pedro@papugamedia.com
    - Establece contraseña hasheada para '123456'
    
  2. Permisos
    - Asigna rol de superadmin
*/

-- Insertar usuario superadmin
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  role,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
VALUES (
  gen_random_uuid(),
  'pedro@papugamedia.com',
  crypt('123456', gen_salt('bf')),
  now(),
  'authenticated',
  '{"provider": "email", "providers": ["email"]}',
  '{"role": "superadmin"}',
  now(),
  now()
);

-- Insertar perfil de usuario
INSERT INTO public.users (
  id,
  email,
  full_name,
  role
)
SELECT 
  id,
  email,
  'Pedro Admin',
  'superadmin'
FROM auth.users
WHERE email = 'pedro@papugamedia.com';