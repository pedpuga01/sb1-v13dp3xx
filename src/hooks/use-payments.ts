import { useState, useEffect } from 'react';
import { paymentApi } from '@/modules/payments/api';
import type { Payment, PaymentFilters } from '@/modules/payments/types';

export function usePayments(academyId: string) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const data = await paymentApi.getAll(academyId);
        setPayments(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [academyId]);

  const addPayment = async (paymentData: Omit<Payment, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newPayment = await paymentApi.create(paymentData);
      setPayments(prev => [...prev, newPayment]);
      return newPayment;
    } catch (err) {
      throw err;
    }
  };

  const updatePayment = async (id: string, paymentData: Partial<Payment>) => {
    try {
      const updatedPayment = await paymentApi.update(id, paymentData);
      setPayments(prev => prev.map(p => p.id === id ? updatedPayment : p));
      return updatedPayment;
    } catch (err) {
      throw err;
    }
  };

  const deletePayment = async (id: string) => {
    try {
      await paymentApi.delete(id);
      setPayments(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    payments,
    loading,
    error,
    addPayment,
    updatePayment,
    deletePayment
  };
}