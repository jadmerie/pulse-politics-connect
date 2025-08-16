import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Users, MessageCircle, DollarSign, Calendar, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import MessagingModal from './MessagingModal';
import { Campaign } from '@/hooks/useCampaigns';
import { toast } from 'sonner';

interface CampaignDetailsModalProps {
  campaign: Campaign;
  children: React.ReactNode;
}

interface CampaignInvitation {
  id: string;
  status: string;
  offered_amount: number;
  created_at: string;
  influencer_id: string;
  message?: string;
  influencer?: {
    user_id: string;
    profiles?: {
      display_name: string | null;
      avatar_url: string | null;
      political_party: string | null;
    };
  };
}

const CampaignDetailsModal = ({ campaign, children }: CampaignDetailsModalProps) => {
  const [open, setOpen] = useState(false);
  const [invitations, setInvitations] = useState<CampaignInvitation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchInvitations();
    }
  }, [open, campaign.id]);

  const fetchInvitations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('campaign_invitations')
        .select(`
          *,
          influencer:influencers!inner(
            user_id,
            profiles!inner(
              display_name,
              avatar_url,
              political_party
            )
          )
        `)
        .eq('campaign_id', campaign.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching invitations:', error);
        toast.error('Failed to load campaign invitations');
      } else {
        setInvitations(data || []);
      }
    } catch (error) {
      console.error('Error fetching invitations:', error);
      toast.error('Failed to load campaign invitations');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            {campaign.name}
          </DialogTitle>
          <DialogDescription>
            Campaign details and influencer management
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Campaign Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Campaign Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-semibold">{formatCurrency(Number(campaign.budget))}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-semibold">
                      {campaign.start_date ? formatDate(campaign.start_date) : 'Not set'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className="capitalize">
                      {campaign.status}
                    </Badge>
                  </div>
                </div>
              </div>
              {campaign.description && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-1">Description</p>
                  <p className="text-sm">{campaign.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Influencer Invitations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Influencer Invitations ({invitations.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-4 text-muted-foreground">Loading invitations...</p>
              ) : invitations.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">
                  No invitations sent yet. Visit the Discovery page to invite influencers.
                </p>
              ) : (
                <div className="space-y-4">
                  {invitations.map((invitation) => (
                    <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={invitation.influencer?.profiles?.avatar_url || ''} />
                          <AvatarFallback>
                            {invitation.influencer?.profiles?.display_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">
                            {invitation.influencer?.profiles?.display_name || 'Unknown'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Invited on {formatDate(invitation.created_at)}
                          </p>
                          {invitation.influencer?.profiles?.political_party && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              {invitation.influencer.profiles.political_party}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(invitation.offered_amount)}</p>
                          <Badge className={getStatusColor(invitation.status)}>
                            {invitation.status}
                          </Badge>
                        </div>
                        {invitation.influencer?.user_id && (
                          <MessagingModal
                            campaignId={campaign.id}
                            campaignName={campaign.name}
                            recipientId={invitation.influencer.user_id}
                            recipientName={invitation.influencer.profiles?.display_name || 'Unknown'}
                            recipientAvatar={invitation.influencer.profiles?.avatar_url || undefined}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailsModal;