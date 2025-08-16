import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Receipt, Clock, CheckCircle, AlertCircle } from "lucide-react";
import PatrioticBanner from "@/components/PatrioticBanner";
import dcMonumentsHero from "@/assets/dc-monuments-hero.webp";
import { usePayments } from "@/hooks/usePayments";

const Payments = () => {
  const { payments, summary, loading } = usePayments();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <>
      <SEO
        title="Payments & Escrow"
        description="Fund campaigns, release payouts on approval, and keep clean finance records."
        canonicalPath="/payments"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Payments",
        }}
      />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <header className="mb-8">
          <h1 className="font-brand text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground mt-2">Escrow-based payouts and FEC-friendly records.</p>
        </header>

        <PatrioticBanner
          title="Transparent Payments, American Accountability"
          subtitle="Secure escrow, clear audit trails, and on-time payouts—built for civic trust."
          image={dcMonumentsHero}
          alt="Washington, D.C. monuments with American flags"
        />

        <section className="grid gap-4 md:grid-cols-2 mt-6">
          <Card className="p-4 hover-scale">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                <h2 className="font-semibold text-foreground">Campaign Balance</h2>
              </div>
              <Button size="sm" variant="secondary">Add Funds</Button>
            </div>
            {loading ? (
              <p className="text-sm text-muted-foreground mt-1">Loading balance...</p>
            ) : summary ? (
              <p className="text-sm text-muted-foreground mt-1">
                Current: {formatCurrency(summary.totalBalance - summary.reservedFunds)} • Reserved: {formatCurrency(summary.reservedFunds)}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">No balance data</p>
            )}
          </Card>

          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Payment Summary</h2>
            </div>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading summary...</p>
            ) : summary ? (
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Completed: {formatCurrency(summary.completedPayments)}</p>
                <p>Pending: {summary.pendingPayments} payments</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No payment data</p>
            )}
          </Card>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Transactions</h2>
          {loading ? (
            <Card className="p-4">
              <p className="text-muted-foreground">Loading transactions...</p>
            </Card>
          ) : payments.length === 0 ? (
            <Card className="p-4">
              <p className="text-muted-foreground">No transactions yet.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {payments.slice(0, 10).map((payment) => (
                <Card key={payment.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(payment.status)}
                      <div>
                        <p className="font-medium text-foreground">
                          {formatCurrency(Number(payment.amount))} • {payment.campaigns?.name || 'Unknown Campaign'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {payment.influencers?.profiles?.display_name || 'Unknown Creator'} • {payment.payment_method || 'N/A'}
                        </p>
                        {payment.notes && (
                          <p className="text-xs text-muted-foreground mt-1">{payment.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium capitalize ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Payments;
