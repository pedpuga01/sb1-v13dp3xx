/*
  # Inscripciones de estudiantes a clases

  1. Nueva Tabla
    - `class_enrollments`
      - `id` (uuid, primary key)
      - `class_id` (uuid, foreign key)
      - `student_id` (uuid, foreign key)
      - `status` (text)
      - `enrolled_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Seguridad
    - Enable RLS
    - Add policies for admins and teachers
*/

-- Tabla de inscripciones
CREATE TABLE IF NOT EXISTS class_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  student_id uuid REFERENCES users(id) ON DELETE CASCADE,
  status text NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  enrolled_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(class_id, student_id)
);

-- Enable RLS
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Usuarios pueden ver inscripciones de su academia"
  ON class_enrollments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM classes c
      JOIN users u ON u.academy_id = c.academy_id
      WHERE c.id = class_enrollments.class_id
      AND u.id = auth.uid()
    )
  );

CREATE POLICY "Admins y profesores pueden gestionar inscripciones"
  ON class_enrollments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM classes c
      JOIN users u ON u.academy_id = c.academy_id
      WHERE c.id = class_enrollments.class_id
      AND u.id = auth.uid()
      AND u.role IN ('admin', 'teacher')
    )
  );

-- Trigger para updated_at
CREATE TRIGGER update_class_enrollments_updated_at
  BEFORE UPDATE ON class_enrollments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();