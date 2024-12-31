import { createClient } from '@/lib/supabase/auth';
import type { Payment, Invoice, PaymentMethod, PaymentStats } from './types';

export const paymentApi = {
  // Payment Methods
  getPaymentMethods: async (academyId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('academy_id', academyId)
      .eq('enabled', true);

    if (error) throw error;
    return data as PaymentMethod[];
  },

  // Payments
  createPayment: async (payment: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('payments')
      .insert([payment])
      .select()
      .single();

    if (error) throw error;
    return data as Payment;
  },

  updatePayment: async (id: string, payment: Partial<Payment>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('payments')
      .update(payment)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Payment;
  },

  getPayments: async (academyId: string, filters?: Record<string, any>) => {
    const supabase = createClient();
    let query = supabase
      .from('payments')
      .select(`
        *,
        student:users!student_id(
          id,
          full_name,
          email
        ),
        invoice:invoices(*)
      `)
      .eq('academy_id', academyId);

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.start_date) {
      query = query.gte('created_at', filters.start_date);
    }
    if (filters?.end_date) {
      query = query.lte('created_at', filters.end_date);
    }
    if (filters?.student_id) {
      query = query.eq('student_id', filters.student_id);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as (Payment & { student: any; invoice: Invoice | null })[];
  },

  // Invoices
  createInvoice: async (invoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('invoices')
      .insert([invoice])
      .select()
      .single();

    if (error) throw error;
    return data as Invoice;
  },

  getInvoice: async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        payment:payments(*),
        student:users!student_id(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as (Invoice & { payment: Payment; student: any });
  },

  // Statistics
  getPaymentStats: async (academyId: string, filters?: { start_date?: string; end_date?: string }) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .rpc('get_payment_stats', {
        p_academy_id: academyId,
        p_start_date: filters?.start_date,
        p_end_date: filters?.end_date
      });

    if (error) throw error;
    return data as PaymentStats;
  }
};