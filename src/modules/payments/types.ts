export type PaymentStatus = 'pending' | 'processing' | 'paid' | 'failed' | 'refunded';
export type InvoiceStatus = 'draft' | 'issued' | 'paid' | 'cancelled' | 'void';

export interface PaymentMethod {
  id: string;
  code: string;
  name: string;
  description?: string;
  enabled: boolean;
  config: Record<string, any>;
  academy_id: string;
}

export interface Payment {
  id: string;
  student_id: string;
  amount: number;
  status: PaymentStatus;
  payment_method_id?: string;
  transaction_id?: string;
  due_date: string;
  paid_date?: string;
  notes?: string;
  metadata?: Record<string, any>;
  academy_id: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  payment_id: string;
  student_id: string;
  amount: number;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  paid_date?: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  metadata?: Record<string, any>;
  academy_id: string;
  created_at: string;
  updated_at: string;
}

export interface PaymentStats {
  total_amount: number;
  paid_amount: number;
  pending_amount: number;
  overdue_amount: number;
  payment_count: number;
  pending_count: number;
  overdue_count: number;
}

export interface PaymentFilters {
  status?: PaymentStatus;
  start_date?: string;
  end_date?: string;
  student_id?: string;
}