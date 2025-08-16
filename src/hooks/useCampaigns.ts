import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Campaign {
  id: string;
  pac_id: string;
  name: string;
  description: string | null;
  budget: number;
  status: string;
  target_demographics: any;
  compliance_notes: string | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
  pacs?: {
    name: string;
    fec_id: string | null;
  };
}

export const useCampaigns = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!user) {
        setCampaigns([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('campaigns')
          .select(`
            *,
            pacs (
              name,
              fec_id
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching campaigns:', error);
        } else {
          setCampaigns(data || []);
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [user]);

  const createCampaign = async (campaignData: { name: string; pac_id: string; description?: string; budget?: number }) => {
    if (!user) return { error: new Error('No user') };

    try {
      // Debug logging
      console.log('Creating campaign with data:', campaignData);
      
      // Ensure budget is reasonable (max 1 billion)
      const sanitizedData = {
        ...campaignData,
        budget: campaignData.budget && campaignData.budget > 1000000000 ? 1000000000 : campaignData.budget
      };
      
      console.log('Sanitized data:', sanitizedData);

      const { data, error } = await supabase
        .from('campaigns')
        .insert([sanitizedData])
        .select(`
          *,
          pacs (
            name,
            fec_id
          )
        `)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return { error };
      }

      setCampaigns(prev => [data, ...prev]);
      return { data, error: null };
    } catch (error) {
      console.error('Caught error:', error);
      return { error: error as Error };
    }
  };

  const updateCampaign = async (id: string, updates: Partial<Omit<Campaign, 'id' | 'created_at' | 'updated_at' | 'pacs'>>) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { data, error } = await supabase
        .from('campaigns')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          pacs (
            name,
            fec_id
          )
        `)
        .single();

      if (error) {
        return { error };
      }

      setCampaigns(prev => 
        prev.map(campaign => campaign.id === id ? data : campaign)
      );
      return { data, error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return {
    campaigns,
    loading,
    createCampaign,
    updateCampaign,
  };
};