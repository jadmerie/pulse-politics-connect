import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Payment {
  id: string;
  campaign_id: string;
  influencer_id: string | null;
  amount: number;
  payment_type: string;
  status: string;
  transaction_id: string | null;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  campaigns?: {
    name: string;
  };
  influencers?: {
    profiles?: {
      display_name: string | null;
    };
  };
}

export interface PaymentSummary {
  totalBalance: number;
  reservedFunds: number;
  completedPayments: number;
  pendingPayments: number;
}

export const usePayments = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user) {
        setPayments([]);
        setSummary(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('payments')
          .select(`
            *,
            campaigns (
              name
            ),
            influencers (
              profiles (
                display_name
              )
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching payments:', error);
        } else {
          setPayments(data || []);
          
          // Calculate summary
          if (data && data.length > 0) {
            const completed = data.filter(p => p.status === 'completed');
            const pending = data.filter(p => p.status === 'pending');
            const totalCompleted = completed.reduce((sum, p) => sum + Number(p.amount), 0);
            const totalPending = pending.reduce((sum, p) => sum + Number(p.amount), 0);
            
            setSummary({
              totalBalance: 50000, // Mock total balance
              reservedFunds: totalPending,
              completedPayments: totalCompleted,
              pendingPayments: pending.length
            });
          } else {
            setSummary({
              totalBalance: 50000,
              reservedFunds: 0,
              completedPayments: 0,
              pendingPayments: 0
            });
          }
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user]);

  const updatePaymentStatus = async (id: string, status: string) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { data, error } = await supabase
        .from('payments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { error };
      }

      setPayments(prev => 
        prev.map(payment => payment.id === id ? { ...payment, ...data } : payment)
      );
      return { data, error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return {
    payments,
    summary,
    loading,
    updatePaymentStatus,
  };
};