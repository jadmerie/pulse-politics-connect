import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

const Analytics = () => {
  return (
    <>
      <SEO
        title="Campaign Analytics Dashboard"
        description="Track reach, engagement, and conversion across influencers and campaigns."
        canonicalPath="/analytics"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Analytics",
        }}
      />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <header className="mb-8 animate-fade-in">
          <h1 className="font-brand text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-2">Real-time performance metrics for your PAC campaigns.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Campaign Reach</h2>
            </div>
            <p className="text-sm text-muted-foreground">Total impressions: 1.2M • Avg CTR: 3.1%</p>
          </Card>
          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Top Performers</h2>
            </div>
            <p className="text-sm text-muted-foreground">Creator #2 • +45% above avg engagement</p>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Analytics;
