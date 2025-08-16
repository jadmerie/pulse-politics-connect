import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, XCircle, Clock, AlertTriangle, ExternalLink, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import type { ComplianceItem } from '@/hooks/useCompliance';

interface ComplianceQueueProps {
  items: ComplianceItem[];
  onApprove: (id: string, notes?: string) => Promise<{ error: Error | null }>;
  onRequestRevision: (id: string, notes: string) => Promise<{ error: Error | null }>;
  loading?: boolean;
}

const ComplianceQueue = ({ items, onApprove, onRequestRevision, loading }: ComplianceQueueProps) => {
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const handleApprove = async () => {
    if (!selectedItem) return;
    
    setActionLoading(true);
    const { error } = await onApprove(selectedItem.id, reviewNotes || undefined);
    
    if (error) {
      toast.error('Failed to approve submission');
    } else {
      toast.success('Submission approved successfully');
      setSelectedItem(null);
      setReviewNotes('');
    }
    setActionLoading(false);
  };

  const handleRequestRevision = async () => {
    if (!selectedItem || !reviewNotes.trim()) {
      toast.error('Please provide revision notes');
      return;
    }
    
    setActionLoading(true);
    const { error } = await onRequestRevision(selectedItem.id, reviewNotes);
    
    if (error) {
      toast.error('Failed to request revision');
    } else {
      toast.success('Revision requested successfully');
      setSelectedItem(null);
      setReviewNotes('');
    }
    setActionLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'flagged':
      case 'revision_requested':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      compliant: 'default',
      pending: 'secondary',
      flagged: 'destructive',
      revision_requested: 'destructive'
    };

    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Compliance Review Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse border-l-4 border-l-gray-200 bg-muted/50 p-4 rounded">
                <div className="h-4 bg-muted rounded w-48 mb-2"></div>
                <div className="h-3 bg-muted rounded w-32 mb-2"></div>
                <div className="h-3 bg-muted rounded w-24"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Compliance Review Queue ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <p className="text-lg font-medium mb-2">All caught up!</p>
            <p>No items pending compliance review.</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`border-l-4 ${getPriorityColor(item.priority)} bg-card p-4 rounded-r border border-l-0`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <h4 className="font-medium">{item.title}</h4>
                      {getStatusBadge(item.status)}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item);
                            setReviewNotes('');
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Compliance Review: {item.title}</DialogTitle>
                          <DialogDescription>
                            Review this content submission for FEC compliance and disclosure requirements.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Campaign:</span>
                              <p className="text-muted-foreground">{item.campaign_name}</p>
                            </div>
                            <div>
                              <span className="font-medium">Influencer:</span>
                              <p className="text-muted-foreground">{item.influencer_name}</p>
                            </div>
                            <div>
                              <span className="font-medium">Platform:</span>
                              <p className="text-muted-foreground">{item.platform}</p>
                            </div>
                            <div>
                              <span className="font-medium">Submitted:</span>
                              <p className="text-muted-foreground">
                                {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                              </p>
                            </div>
                          </div>

                          {item.issues && item.issues.length > 0 && (
                            <div>
                              <span className="font-medium text-sm">Previous Issues:</span>
                              <ul className="mt-1 text-sm text-muted-foreground">
                                {item.issues.map((issue, index) => (
                                  <li key={index} className="ml-4">• {issue}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Review Notes
                            </label>
                            <Textarea
                              placeholder="Add notes about compliance review, required disclosures, or revision requests..."
                              value={reviewNotes}
                              onChange={(e) => setReviewNotes(e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>

                          <div className="flex gap-2 pt-4">
                            <Button
                              onClick={handleApprove}
                              disabled={actionLoading}
                              className="flex-1"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleRequestRevision}
                              disabled={actionLoading || !reviewNotes.trim()}
                              className="flex-1"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Request Revision
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><span className="font-medium">Campaign:</span> {item.campaign_name}</p>
                    <p><span className="font-medium">Influencer:</span> {item.influencer_name}</p>
                    <p><span className="font-medium">Platform:</span> {item.platform}</p>
                    <p><span className="font-medium">Submitted:</span> {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</p>
                  </div>

                  {item.issues && item.issues.length > 0 && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        {item.issues.length} issue{item.issues.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceQueue;