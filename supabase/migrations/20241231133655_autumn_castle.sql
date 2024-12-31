/*
  # Payment System Schema

  1. New Tables
    - `payment_methods`
      - Payment method configuration
    - `payments`
      - Core payment information
    - `invoices`
      - Invoice generation and tracking
    
  2. Security
    - Enable RLS on all tables
    - Policies for admins and students
*/

-- Payment methods configuration
CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  enabled boolean DEFAULT true,
  config jsonb DEFAULT '{}'::jsonb,
  academy_id uuid REFERENCES academies(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES users(id) NOT NULL,
  amount integer NOT NULL CHECK (amount > 0),
  status text NOT NULL CHECK (status IN ('pending', 'processing', 'paid', 'failed', 'refunded')),
  payment_method_id uuid REFERENCES payment_methods(id),
  transaction_id text,
  due_date date NOT NULL,
  paid_date timestamptz,
  notes text,
  metadata jsonb DEFAULT '{}'::jsonb,
  academy_id uuid REFERENCES academies(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number text NOT NULL,
  payment_id uuid REFERENCES payments(id) NOT NULL,
  student_id uuid REFERENCES users(id) NOT NULL,
  amount integer NOT NULL CHECK (amount > 0),
  status text NOT NULL CHECK (status IN ('draft', 'issued', 'paid', 'cancelled', 'void')),
  issue_date date NOT NULL,
  due_date date NOT NULL,
  paid_date timestamptz,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal integer NOT NULL,
  tax integer NOT NULL DEFAULT 0,
  total integer NOT NULL,
  notes text,
  metadata jsonb DEFAULT '{}'::jsonb,
  academy_id uuid REFERENCES academies(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(number, academy_id)
);

-- Enable RLS
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Payment methods policies
CREATE POLICY "payment_methods_view_policy"
  ON payment_methods FOR SELECT
  USING (academy_id IN (
    SELECT academy_id FROM users WHERE id = auth.uid()
  ));

CREATE POLICY "payment_methods_manage_policy"
  ON payment_methods FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
      AND academy_id = payment_methods.academy_id
    )
  );

-- Payments policies
CREATE POLICY "payments_view_policy"
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

CREATE POLICY "payments_manage_policy"
  ON payments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
      AND academy_id = payments.academy_id
    )
  );

-- Invoices policies
CREATE POLICY "invoices_view_policy"
  ON invoices FOR SELECT
  USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
      AND academy_id = invoices.academy_id
    )
  );

CREATE POLICY "invoices_manage_policy"
  ON invoices FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'superadmin')
      AND academy_id = invoices.academy_id
    )
  );

-- Function to generate invoice numbers
CREATE OR REPLACE FUNCTION generate_invoice_number(academy_id uuid)
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  year text := to_char(current_date, 'YYYY');
  next_number integer;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(number FROM '\d+') AS integer)), 0) + 1
  INTO next_number
  FROM invoices
  WHERE academy_id = $1
  AND number LIKE year || '-%';
  
  RETURN year || '-' || LPAD(next_number::text, 6, '0');
END;
$$;

-- Function to get payment statistics
CREATE OR REPLACE FUNCTION get_payment_stats(
  p_academy_id uuid,
  p_start_date date DEFAULT NULL,
  p_end_date date DEFAULT NULL
)
RETURNS TABLE (
  total_amount bigint,
  paid_amount bigint,
  pending_amount bigint,
  overdue_amount bigint,
  payment_count bigint,
  pending_count bigint,
  overdue_count bigint
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    SUM(amount)::bigint as total_amount,
    SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END)::bigint as paid_amount,
    SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END)::bigint as pending_amount,
    SUM(CASE WHEN status = 'pending' AND due_date < CURRENT_DATE THEN amount ELSE 0 END)::bigint as overdue_amount,
    COUNT(*)::bigint as payment_count,
    COUNT(*) FILTER (WHERE status = 'pending')::bigint as pending_count,
    COUNT(*) FILTER (WHERE status = 'pending' AND due_date < CURRENT_DATE)::bigint as overdue_count
  FROM payments
  WHERE academy_id = p_academy_id
  AND (p_start_date IS NULL OR created_at::date >= p_start_date)
  AND (p_end_date IS NULL OR created_at::date <= p_end_date);
END;
$$;