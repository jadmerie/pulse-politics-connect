import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, User, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { AuditLogEntry } from '@/hooks/useCompliance';
import { formatDistanceToNow } from 'date-fns';

interface AuditTrailProps {
  auditLog: AuditLogEntry[];
  loading?: boolean;
}

const getActionIcon = (action: string) => {
  switch (action) {
    case 'submission_approved':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'revision_requested':
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    case 'submission_pending':
      return <Clock className="h-4 w-4 text-blue-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-600" />;
  }
};

const getActionColor = (action: string) => {
  switch (action) {
    case 'submission_approved':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'revision_requested':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'submission_pending':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getActionLabel = (action: string) => {
  switch (action) {
    case 'submission_approved':
      return 'Approved';
    case 'revision_requested':
      return 'Revision Requested';
    case 'submission_pending':
      return 'Pending Review';
    default:
      return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
};

export const AuditTrail: React.FC<AuditTrailProps> = ({ auditLog, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-3 p-3 border rounded-lg animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!auditLog.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No audit entries found</p>
            <p className="text-sm">Compliance actions will appear here as they occur</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Audit Trail
          <Badge variant="secondary" className="ml-auto">
            {auditLog.length} entries
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {auditLog.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getActionIcon(entry.action)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getActionColor(entry.action)}`}
                    >
                      {getActionLabel(entry.action)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(entry.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <User className="h-3 w-3" />
                    <span>{entry.user}</span>
                  </div>
                  
                  {entry.details?.notes && (
                    <div className="text-sm bg-gray-50 p-2 rounded border-l-4 border-blue-200">
                      <p className="text-gray-700">{entry.details.notes}</p>
                    </div>
                  )}
                  
                  {entry.details?.platform && (
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {entry.details.platform}
                      </Badge>
                      {entry.details?.campaign_id && (
                        <span className="text-xs text-muted-foreground">
                          Campaign: {entry.details.campaign_id.slice(0, 8)}...
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AuditTrail;