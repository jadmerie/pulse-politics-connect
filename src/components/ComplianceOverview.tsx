import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import type { ComplianceStats } from '@/hooks/useCompliance';

interface ComplianceOverviewProps {
  stats: ComplianceStats | null;
  loading: boolean;
}

const ComplianceOverview = ({ stats, loading }: ComplianceOverviewProps) => {
  if (loading || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-4 w-4 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="h-3 bg-muted rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: 'Compliance Rate',
      value: `${stats.compliance_rate}%`,
      description: `${stats.compliant} of ${stats.total_submissions} compliant`,
      icon: Shield,
      color: stats.compliance_rate >= 90 ? 'text-green-600' : stats.compliance_rate >= 70 ? 'text-yellow-600' : 'text-red-600'
    },
    {
      title: 'Pending Review',
      value: stats.pending_review.toString(),
      description: 'Submissions awaiting approval',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Flagged Items',
      value: stats.flagged.toString(),
      description: 'Items requiring attention',
      icon: AlertTriangle,
      color: stats.flagged > 0 ? 'text-red-600' : 'text-green-600'
    },
    {
      title: 'Total Submissions',
      value: stats.total_submissions.toString(),
      description: 'All content submissions',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Compliance Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Overall Compliance Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Compliance Rate</span>
              <span className="font-semibold">{stats.compliance_rate}%</span>
            </div>
            <Progress value={stats.compliance_rate} className="h-2" />
          </div>
          
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Compliant: {stats.compliant}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Pending: {stats.pending_review}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Flagged: {stats.flagged}</span>
            </div>
          </div>

          {stats.compliance_rate < 90 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800 text-sm font-medium">
                <AlertTriangle className="w-4 h-4" />
                Compliance Alert
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                Your compliance rate is below 90%. Review flagged items and ensure all content meets FEC disclosure requirements.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceOverview;