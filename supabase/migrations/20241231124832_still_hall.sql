/*
  # Agregar tablas para clases y calendario

  1. Nuevas Tablas
    - `classes`: Gestión de clases y horarios
    - `calendar_events`: Eventos y horarios
    - `payments`: Sistema de pagos
    - `rooms`: Salas y espacios físicos

  2. Seguridad
    - Habilitar RLS en todas las tablas
    - Políticas de acceso basadas en roles
*/

-- Tabla de salas
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  capacity integer NOT NULL,
  equipment jsonb,
  status text NOT NULL DEFAULT 'available',
  academy_id uuid REFERENCES academies(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de clases
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  teacher_id uuid REFERENCES users(id) NOT NULL,
  schedule jsonb NOT NULL,
  capacity integer NOT NULL,
  type text NOT NULL CHECK (type IN ('individual', 'group')),
  room_id uuid REFERENCES rooms(id),
  academy_id uuid REFERENCES academies(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de eventos del calendario
CREATE TABLE IF NOT EXISTS calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  type text NOT NULL CHECK (type IN ('class', 'exam', 'holiday')),
  class_id uuid REFERENCES classes(id),
  academy_id uuid REFERENCES academies(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla de pagos
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id) NOT NULL,
  amount integer NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'paid', 'overdue')),
  due_date date NOT NULL,
  paid_date date,
  payment_method text,
  invoice_number text,
  academy_id uuid REFERENCES academies(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad para salas
CREATE POLICY "Usuarios pueden ver salas de su academia"
  ON rooms FOR SELECT
  USING (academy_id IN (
    SELECT academy_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Admins pueden gestionar salas"
  ON rooms FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
      AND academy_id = rooms.academy_id
    )
  );

-- Políticas de seguridad para clases
CREATE POLICY "Usuarios pueden ver clases de su academia"
  ON classes FOR SELECT
  USING (academy_id IN (
    SELECT academy_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Profesores pueden gestionar sus clases"
  ON classes FOR ALL
  USING (
    teacher_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
      AND academy_id = classes.academy_id
    )
  );

-- Políticas de seguridad para eventos
CREATE POLICY "Usuarios pueden ver eventos de su academia"
  ON calendar_events FOR SELECT
  USING (academy_id IN (
    SELECT academy_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "Admins y profesores pueden gestionar eventos"
  ON calendar_events FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin', 'teacher')
      AND academy_id = calendar_events.academy_id
    )
  );

-- Políticas de seguridad para pagos
CREATE POLICY "Usuarios pueden ver sus propios pagos"
  ON payments FOR SELECT
  USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
      AND academy_id = payments.academy_id
    )
  );

CREATE POLICY "Admins pueden gestionar pagos"
  ON payments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
      AND academy_id = payments.academy_id
    )
  );

-- Triggers para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at
  BEFORE UPDATE ON calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();