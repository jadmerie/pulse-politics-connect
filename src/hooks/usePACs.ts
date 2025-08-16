import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface PAC {
  id: string;
  name: string;
  description: string | null;
  fec_id: string | null;
  admin_user_id: string;
  campaign_budget: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export const usePACs = () => {
  const { user } = useAuth();
  const [pacs, setPACs] = useState<PAC[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPACs = async () => {
      if (!user) {
        setPACs([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('pacs')
          .select('*')
          .eq('admin_user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching PACs:', error);
        } else {
          setPACs(data || []);
        }
      } catch (error) {
        console.error('Error fetching PACs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPACs();
  }, [user]);

  const createPAC = async (pacData: { name: string; description?: string; fec_id?: string; campaign_budget?: number }) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { data, error } = await supabase
        .from('pacs')
        .insert([{
          ...pacData,
          admin_user_id: user.id
        }])
        .select()
        .single();

      if (error) {
        return { error };
      }

      setPACs(prev => [data, ...prev]);
      return { data, error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return {
    pacs,
    loading,
    createPAC,
  };
};