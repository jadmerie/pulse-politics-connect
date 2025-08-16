import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface AnalyticsData {
  id: string;
  campaign_id: string;
  submission_id: string | null;
  platform: string;
  impressions: number;
  clicks: number;
  engagement_count: number;
  shares: number;
  comments: number;
  date_recorded: string;
  created_at: string;
}

export interface AnalyticsSummary {
  totalImpressions: number;
  totalClicks: number;
  totalEngagement: number;
  averageCTR: number;
  topPlatform: string;
  topPerformer: string;
}

export const useAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) {
        setAnalytics([]);
        setSummary(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('campaign_analytics')
          .select('*')
          .order('date_recorded', { ascending: false });

        if (error) {
          console.error('Error fetching analytics:', error);
        } else {
          setAnalytics(data || []);
          
          // Calculate summary
          if (data && data.length > 0) {
            const totalImpressions = data.reduce((sum, item) => sum + (item.impressions || 0), 0);
            const totalClicks = data.reduce((sum, item) => sum + (item.clicks || 0), 0);
            const totalEngagement = data.reduce((sum, item) => sum + (item.engagement_count || 0), 0);
            const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
            
            // Group by platform to find top performer
            const platformStats = data.reduce((acc, item) => {
              if (!acc[item.platform]) {
                acc[item.platform] = { impressions: 0, engagement: 0 };
              }
              acc[item.platform].impressions += item.impressions || 0;
              acc[item.platform].engagement += item.engagement_count || 0;
              return acc;
            }, {} as Record<string, { impressions: number; engagement: number }>);
            
            const topPlatform = Object.entries(platformStats)
              .sort(([,a], [,b]) => b.engagement - a.engagement)[0]?.[0] || '';
            
            setSummary({
              totalImpressions,
              totalClicks,
              totalEngagement,
              averageCTR: Math.round(averageCTR * 100) / 100,
              topPlatform,
              topPerformer: 'Campaign Analytics'
            });
          }
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  const getReachOverTime = () => {
    if (!analytics.length) return [];
    
    const dailyData = analytics.reduce((acc, item) => {
      const date = new Date(item.date_recorded).toLocaleDateString('en-US', { weekday: 'short' });
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += item.impressions || 0;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(dailyData).map(([day, impressions]) => ({ day, impressions }));
  };

  const getPlatformEngagement = () => {
    if (!analytics.length) return [];
    
    const platformData = analytics.reduce((acc, item) => {
      if (!acc[item.platform]) {
        acc[item.platform] = { totalEngagement: 0, totalImpressions: 0 };
      }
      acc[item.platform].totalEngagement += item.engagement_count || 0;
      acc[item.platform].totalImpressions += item.impressions || 0;
      return acc;
    }, {} as Record<string, { totalEngagement: number; totalImpressions: number }>);
    
    return Object.entries(platformData).map(([platform, data]) => ({
      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
      engagement: data.totalImpressions > 0 ? 
        Math.round((data.totalEngagement / data.totalImpressions) * 100 * 100) / 100 : 0
    }));
  };

  return {
    analytics,
    summary,
    loading,
    getReachOverTime,
    getPlatformEngagement,
  };
};