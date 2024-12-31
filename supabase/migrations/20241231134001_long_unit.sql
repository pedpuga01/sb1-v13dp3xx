/*
  # Grades System Schema

  1. New Tables
    - `grades`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references users)
      - `class_id` (uuid, references classes)
      - `module_id` (uuid, references modules)
      - `score` (numeric, 1-7 scale)
      - `evaluation_type` (text: 'exam', 'assignment', 'project')
      - `evaluation_date` (date)
      - `notes` (text)
      - `created_by` (uuid, references users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on grades table
    - Add policies for teachers and admins
    - Add view policy for students

  3. Functions
    - Calculate average grades
    - Get student progress
*/

-- Create grades table
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id) NOT NULL,
  class_id uuid REFERENCES classes(id) NOT NULL,
  module_id uuid REFERENCES modules(id),
  score numeric(3,1) NOT NULL CHECK (score >= 1.0 AND score <= 7.0),
  evaluation_type text NOT NULL CHECK (evaluation_type IN ('exam', 'assignment', 'project')),
  evaluation_date date NOT NULL,
  notes text,
  created_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_grades_student 
  ON grades(student_id);
CREATE INDEX IF NOT EXISTS idx_grades_class 
  ON grades(class_id);
CREATE INDEX IF NOT EXISTS idx_grades_module 
  ON grades(module_id);

-- Enable RLS
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Teachers can manage grades for their classes"
  ON grades
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM classes
      WHERE classes.id = grades.class_id
      AND classes.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all grades"
  ON grades
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
      AND academy_id = (
        SELECT academy_id FROM classes WHERE id = grades.class_id
      )
    )
  );

CREATE POLICY "Students can view their own grades"
  ON grades
  FOR SELECT
  USING (student_id = auth.uid());

-- Trigger for updated_at
CREATE TRIGGER update_grades_updated_at
  BEFORE UPDATE ON grades
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate average grade
CREATE OR REPLACE FUNCTION get_student_average(
  p_student_id uuid,
  p_class_id uuid DEFAULT NULL,
  p_module_id uuid DEFAULT NULL
)
RETURNS TABLE (
  average_score numeric,
  total_evaluations bigint
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ROUND(AVG(score)::numeric, 1) as average_score,
    COUNT(*)::bigint as total_evaluations
  FROM grades
  WHERE student_id = p_student_id
  AND (p_class_id IS NULL OR class_id = p_class_id)
  AND (p_module_id IS NULL OR module_id = p_module_id);
END;
$$;

-- Function to get student progress
CREATE OR REPLACE FUNCTION get_student_progress(
  p_student_id uuid,
  p_class_id uuid DEFAULT NULL
)
RETURNS TABLE (
  total_evaluations bigint,
  completed_evaluations bigint,
  average_score numeric,
  progress_percentage numeric
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH stats AS (
    SELECT
      COUNT(*)::bigint as total,
      COUNT(*) FILTER (WHERE score IS NOT NULL)::bigint as completed,
      AVG(score) as avg_score
    FROM grades
    WHERE student_id = p_student_id
    AND (p_class_id IS NULL OR class_id = p_class_id)
  )
  SELECT
    total as total_evaluations,
    completed as completed_evaluations,
    ROUND(avg_score::numeric, 1) as average_score,
    CASE
      WHEN total > 0 THEN
        ROUND((completed::numeric / total::numeric) * 100, 1)
      ELSE 0
    END as progress_percentage
  FROM stats;
END;
$$;