import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";
import PatrioticBanner from "@/components/PatrioticBanner";
import patrioticHero from "@/assets/patriotic-hero.jpg";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { useAnalytics } from "@/hooks/useAnalytics";

const Analytics = () => {
  const { summary, loading, getReachOverTime, getPlatformEngagement } = useAnalytics();
  
  const reachData = getReachOverTime();
  const platformData = getPlatformEngagement();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

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

        <PatrioticBanner
          title="America First Analytics"
          subtitle="Track civic impact across states, platforms, and time."
          image={patrioticHero}
          alt="American flag banner representing US civic engagement"
        />

        <section className="grid gap-4 md:grid-cols-2 mt-6">
          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Campaign Reach</h2>
            </div>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading analytics...</p>
            ) : summary ? (
              <p className="text-sm text-muted-foreground">
                Total impressions: {formatNumber(summary.totalImpressions)} • Avg CTR: {summary.averageCTR}%
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">No data available</p>
            )}
          </Card>
          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Top Performers</h2>
            </div>
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading analytics...</p>
            ) : summary ? (
              <p className="text-sm text-muted-foreground">
                {summary.topPlatform} • {formatNumber(summary.totalEngagement)} total engagement
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">No data available</p>
            )}
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-2 mt-6">
          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Reach Over Time</h2>
            </div>
            {reachData.length > 0 ? (
              <ChartContainer
                config={{ impressions: { label: "Impressions", color: "hsl(var(--primary))" } }}
                className="h-64 mt-2"
              >
                <LineChart data={reachData} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <Line dataKey="impressions" stroke="var(--color-impressions)" strokeWidth={2} dot={false} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                </LineChart>
              </ChartContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </Card>

          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Engagement by Platform</h2>
            </div>
            {platformData.length > 0 ? (
              <ChartContainer
                config={{ engagement: { label: "Engagement %", color: "hsl(var(--accent))" } }}
                className="h-64 mt-2"
              >
                <BarChart data={platformData} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" tickLine={false} axisLine={false} />
                  <Bar dataKey="engagement" fill="var(--color-engagement)" radius={[4, 4, 0, 0]} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </Card>
        </section>
      </main>
    </>
  );
};

export default Analytics;
