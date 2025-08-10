import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Receipt } from "lucide-react";
import PatrioticBanner from "@/components/PatrioticBanner";
import dcMonumentsHero from "@/assets/dc-monuments-hero.webp";

const Payments = () => {
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
            <p className="text-sm text-muted-foreground mt-1">Current: $32,500 • Reserved: $8,900</p>
          </Card>

          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <Receipt className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Recent Transactions</h2>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Paid $500 to Creator #7 • Approved IG Reel</li>
              <li>Paid $300 to Creator #3 • TikTok Post</li>
              <li>Deposit $10,000 • Budget top-up</li>
            </ul>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Payments;
