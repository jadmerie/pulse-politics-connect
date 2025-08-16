import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

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
  user: string;
  timestamp: Date;
  target: string;
  details: any;
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

  // Fetch audit log entries
  const fetchAuditLog = async () => {
    if (!user) return;

    try {
      console.log('Fetching audit log for user:', user.id);
      
      const { data: logs, error } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('target_type', 'content_submission')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error in fetchAuditLog query:', error);
        throw error;
      }

      console.log('Audit logs found:', logs?.length || 0);

      const formattedLogs: AuditLogEntry[] = (logs || []).map(log => ({
        id: log.id,
        action: log.action,
        user: log.user_email || 'Unknown User',
        timestamp: new Date(log.created_at),
        target: log.target_id,
        details: log.details || {}
      }));

      setAuditLog(formattedLogs);
    } catch (error) {
      console.error('Error fetching audit log:', error);
    }
  };

  const createAuditEntry = async (action: string, targetId: string, details?: any) => {
    try {
      const { error } = await supabase.rpc('create_audit_log_entry', {
        p_action: action,
        p_target_type: 'content_submission',
        p_target_id: targetId,
        p_details: details || {}
      });

      if (error) {
        console.error('Error creating audit entry:', error);
      } else {
        // Refresh audit log after creating entry
        await fetchAuditLog();
      }
    } catch (error) {
      console.error('Error creating audit log entry:', error);
    }
  };

  // Approve submission
  const approveSubmission = async (id: string, reviewNotes?: string) => {
    try {
      const { error } = await supabase
        .from('content_submissions')
        .update({ 
          status: 'approved', 
          compliance_checked: true,
          review_notes: reviewNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      // Create audit entry
      await createAuditEntry('submission_approved', id, { 
        submissionId: id, 
        action: 'approved',
        notes: reviewNotes,
        timestamp: new Date().toISOString()
      });

      // Refresh data
      await Promise.all([fetchStats(), fetchPendingItems()]);
      
      toast.success('Submission approved successfully');
      return { error: null };
    } catch (error) {
      console.error('Error approving submission:', error);
      toast.error('Failed to approve submission');
      return { error: error as Error };
    }
  };

  // Request revision
  const requestRevision = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('content_submissions')
        .update({ 
          status: 'revision_requested', 
          compliance_checked: false,
          review_notes: notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      // Create audit entry
      await createAuditEntry('revision_requested', id, { 
        submissionId: id, 
        action: 'revision_requested', 
        notes: notes,
        timestamp: new Date().toISOString()
      });

      // Refresh data
      await Promise.all([fetchStats(), fetchPendingItems()]);
      
      toast.success('Revision requested successfully');
      return { error: null };
    } catch (error) {
      console.error('Error requesting revision:', error);
      toast.error('Failed to request revision');
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

  const refreshData = async () => {
    await Promise.all([fetchStats(), fetchPendingItems(), fetchAuditLog()]);
  };

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        console.log('User authenticated, loading compliance data for:', user.email);
        setLoading(true);
        await Promise.all([fetchStats(), fetchPendingItems(), fetchAuditLog()]);
      } else {
        console.log('No user authenticated');
        setLoading(false);
        setStats(null);
        setPendingItems([]);
        setAuditLog([]);
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
    refreshData
  };
};