import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface ComplianceStats {
  total_submissions: number;
  compliant: number;
  pending_review: number;
  flagged: number;
  compliance_rate: number;
}

export interface ComplianceItem {
  id: string;
  type: 'submission' | 'campaign' | 'disclosure';
  title: string;
  status: 'compliant' | 'pending' | 'flagged' | 'revision_requested';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  campaign_name?: string;
  influencer_name?: string;
  platform?: string;
  issues?: string[];
}

export interface AuditLogEntry {
  id: string;
  action: string;
  user_id: string;
  target_type: 'submission' | 'campaign' | 'disclosure';
  target_id: string;
  details: string;
  timestamp: string;
  user_profile?: {
    display_name: string | null;
  };
}

export const useCompliance = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ComplianceStats | null>(null);
  const [pendingItems, setPendingItems] = useState<ComplianceItem[]>([]);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch compliance statistics
  const fetchStats = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching compliance stats for user:', user.id);
      
      // Get submissions for campaigns owned by current user
      const { data: submissions, error } = await supabase
        .from('content_submissions')
        .select(`
          *,
          campaigns!inner(
            pac_id,
            pacs!inner(admin_user_id)
          )
        `)
        .eq('campaigns.pacs.admin_user_id', user.id);

      if (error) {
        console.error('Error in fetchStats query:', error);
        throw error;
      }

      console.log('Submissions found:', submissions?.length || 0);

      const total = submissions?.length || 0;
      const compliant = submissions?.filter(s => s.status === 'approved' && s.compliance_checked).length || 0;
      const pending = submissions?.filter(s => s.status === 'pending').length || 0;
      const flagged = submissions?.filter(s => s.status === 'revision_requested').length || 0;

      const statsData = {
        total_submissions: total,
        compliant,
        pending_review: pending,
        flagged,
        compliance_rate: total > 0 ? Math.round((compliant / total) * 100) : 0
      };

      console.log('Calculated stats:', statsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching compliance stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch pending compliance items
  const fetchPendingItems = async () => {
    if (!user) return;

    try {
      console.log('Fetching pending items for user:', user.id);
      
      const { data: submissions, error } = await supabase
        .from('content_submissions')
        .select(`
          *,
          campaigns!inner(
            name,
            pac_id,
            pacs!inner(admin_user_id)
          ),
          influencers(
            profiles(display_name)
          )
        `)
        .eq('campaigns.pacs.admin_user_id', user.id)
        .in('status', ['pending', 'revision_requested'])
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error in fetchPendingItems query:', error);
        throw error;
      }

      console.log('Pending submissions found:', submissions?.length || 0);

      const items: ComplianceItem[] = (submissions || []).map(sub => ({
        id: sub.id,
        type: 'submission' as const,
        title: `${sub.content_type} - ${sub.platform}`,
        status: sub.status as any,
        priority: sub.status === 'revision_requested' ? 'high' : 'medium',
        created_at: sub.created_at,
        campaign_name: (sub.campaigns as any)?.name,
        influencer_name: (sub.influencers as any)?.profiles?.display_name,
        platform: sub.platform,
        issues: sub.review_notes ? [sub.review_notes] : []
      }));

      setPendingItems(items);
    } catch (error) {
      console.error('Error fetching pending items:', error);
    }
  };

  // Create audit log entry
  const createAuditEntry = async (
    action: string,
    targetType: 'submission' | 'campaign' | 'disclosure',
    targetId: string,
    details: string
  ) => {
    if (!user) return;

    try {
      // Since we don't have an audit_log table, we'll use the existing structure
      // In a real implementation, you'd want a dedicated audit_log table
      console.log('Audit entry:', { action, targetType, targetId, details, userId: user.id });
    } catch (error) {
      console.error('Error creating audit entry:', error);
    }
  };

  // Approve submission
  const approveSubmission = async (submissionId: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('content_submissions')
        .update({ 
          status: 'approved', 
          compliance_checked: true,
          review_notes: notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId);

      if (error) throw error;

      await createAuditEntry(
        'Submission Approved',
        'submission',
        submissionId,
        notes || 'Submission approved for compliance'
      );

      // Refresh data
      fetchStats();
      fetchPendingItems();

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Request revision
  const requestRevision = async (submissionId: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('content_submissions')
        .update({ 
          status: 'revision_requested', 
          compliance_checked: false,
          review_notes: notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', submissionId);

      if (error) throw error;

      await createAuditEntry(
        'Revision Requested',
        'submission',
        submissionId,
        notes
      );

      // Refresh data
      fetchStats();
      fetchPendingItems();

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  // Generate compliance report
  const generateComplianceReport = async (campaignId?: string, startDate?: string, endDate?: string) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      let query = supabase
        .from('content_submissions')
        .select(`
          *,
          campaigns!inner(
            name,
            pac_id,
            pacs!inner(admin_user_id, name)
          ),
          influencers(
            profiles(display_name)
          )
        `)
        .eq('campaigns.pacs.admin_user_id', user.id);

      if (campaignId) {
        query = query.eq('campaign_id', campaignId);
      }
      if (startDate) {
        query = query.gte('created_at', startDate);
      }
      if (endDate) {
        query = query.lte('created_at', endDate);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        console.log('User authenticated, loading compliance data for:', user.email);
        setLoading(true);
        await Promise.all([fetchStats(), fetchPendingItems()]);
      } else {
        console.log('No user authenticated');
        setLoading(false);
        setStats(null);
        setPendingItems([]);
      }
    };

    loadData();
  }, [user]);

  return {
    stats,
    pendingItems,
    auditLog,
    loading,
    approveSubmission,
    requestRevision,
    generateComplianceReport,
    refreshData: () => {
      fetchStats();
      fetchPendingItems();
    }
  };
};