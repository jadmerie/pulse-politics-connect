import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Influencer {
  id: string;
  user_id: string;
  platforms: any;
  follower_counts: any;
  engagement_rates: any;
  political_affiliations: string[] | null;
  content_categories: string[] | null;
  verification_status: string;
  rate_per_post: number | null;
  availability_status: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    display_name: string | null;
    location: string | null;
    avatar_url: string | null;
    bio: string | null;
    political_party: string | null;
  };
}

export const useInfluencers = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const { data, error } = await supabase
          .from('influencers')
          .select(`
            *,
            profiles (
              display_name,
              location,
              avatar_url,
              bio,
              political_party
            )
          `)
          .eq('verification_status', 'verified')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching influencers:', error);
        } else {
          setInfluencers(data || []);
        }
      } catch (error) {
        console.error('Error fetching influencers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  const inviteInfluencer = async (campaignId: string, influencerId: string, offeredAmount: number, message?: string) => {
    try {
      const { data, error } = await supabase
        .from('campaign_invitations')
        .insert([{
          campaign_id: campaignId,
          influencer_id: influencerId,
          offered_amount: offeredAmount,
          message: message || null,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) {
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return {
    influencers,
    loading,
    inviteInfluencer,
  };
};