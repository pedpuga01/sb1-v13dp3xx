-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  student_id uuid REFERENCES users(id) ON DELETE CASCADE,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  notes text,
  marked_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(class_id, student_id, date)
);

-- Create indexes for frequent queries
CREATE INDEX IF NOT EXISTS idx_attendance_class_date 
  ON attendance(class_id, date);
CREATE INDEX IF NOT EXISTS idx_attendance_student_date 
  ON attendance(student_id, date);

-- Enable RLS
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Security policies
CREATE POLICY "Profesores pueden gestionar asistencia de sus clases"
  ON attendance
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM classes
      WHERE classes.id = attendance.class_id
      AND classes.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Admins pueden gestionar toda la asistencia"
  ON attendance
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users u
      JOIN classes c ON c.academy_id = u.academy_id
      WHERE u.id = auth.uid()
      AND u.role IN ('admin', 'superadmin')
      AND c.id = attendance.class_id
    )
  );

CREATE POLICY "Estudiantes pueden ver su asistencia"
  ON attendance
  FOR SELECT
  USING (student_id = auth.uid());

-- Trigger for updated_at
CREATE TRIGGER update_attendance_updated_at
  BEFORE UPDATE ON attendance
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function for attendance stats
CREATE OR REPLACE FUNCTION get_attendance_stats(
  p_student_id uuid,
  p_start_date date DEFAULT NULL,
  p_end_date date DEFAULT NULL
)
RETURNS TABLE (
  total_classes bigint,
  present_count bigint,
  absent_count bigint,
  late_count bigint,
  attendance_rate numeric
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH stats AS (
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'present') as present,
      COUNT(*) FILTER (WHERE status = 'absent') as absent,
      COUNT(*) FILTER (WHERE status = 'late') as late
    FROM attendance
    WHERE student_id = p_student_id
    AND (p_start_date IS NULL OR date >= p_start_date)
    AND (p_end_date IS NULL OR date <= p_end_date)
  )
  SELECT 
    total as total_classes,
    present as present_count,
    absent as absent_count,
    late as late_count,
    CASE 
      WHEN total > 0 THEN 
        ROUND(((present + late)::numeric / total::numeric) * 100, 2)
      ELSE 0 
    END as attendance_rate
  FROM stats;
END;
$$;