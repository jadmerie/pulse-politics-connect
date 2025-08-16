import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface ContentSubmission {
  id: string;
  campaign_id: string;
  influencer_id: string;
  platform: string;
  content_type: string;
  content_url: string | null;
  caption: string | null;
  fec_disclosure: string | null;
  status: string;
  compliance_checked: boolean;
  review_notes: string | null;
  submission_date: string | null;
  created_at: string;
  updated_at: string;
  campaigns?: {
    name: string;
    pacs?: {
      name: string;
    };
  };
  influencers?: {
    profiles?: {
      display_name: string | null;
    };
  };
}

export const useSubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<ContentSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user) {
        setSubmissions([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('content_submissions')
          .select(`
            *,
            campaigns (
              name,
              pacs (
                name
              )
            ),
            influencers (
              profiles (
                display_name
              )
            )
          `)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching submissions:', error);
        } else {
          setSubmissions(data || []);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [user]);

  const updateSubmissionStatus = async (id: string, status: string, reviewNotes?: string) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { data, error } = await supabase
        .from('content_submissions')
        .update({ 
          status, 
          review_notes: reviewNotes || null,
          compliance_checked: status === 'approved'
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { error };
      }

      setSubmissions(prev => 
        prev.map(submission => submission.id === id ? { ...submission, ...data } : submission)
      );
      return { data, error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return {
    submissions,
    loading,
    updateSubmissionStatus,
  };
};