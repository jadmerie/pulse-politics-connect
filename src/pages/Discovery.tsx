import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

const Discovery = () => {
  return (
    <>
      <SEO
        title="PAC Influencer Discovery & Matching"
        description="Search vetted influencers by district, demographics, and issue alignment to match your PAC campaigns."
        canonicalPath="/discovery"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "PAC Influencer Discovery",
          description:
            "Search vetted influencers by district, demographics, and issue alignment to match your PAC campaigns.",
        }}
      />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <header className="mb-8 animate-fade-in">
          <h1 className="font-brand text-3xl font-bold text-foreground">PAC Influencer Discovery</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Filter by geography, demographics, platform metrics, and issues to find high-impact creators.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground">Filters</h2>
              <Filter className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>Geography: State/District</div>
              <div>Demographics: Age / Gender</div>
              <div>Platform: IG / TikTok / YT</div>
              <div>Issues: Climate, Education, etc.</div>
              <Button variant="secondary" size="sm" className="mt-2">
                Apply Filters
              </Button>
            </div>
          </Card>

          <div className="md:col-span-2 space-y-4">
            <Card className="p-4 flex items-center gap-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                aria-label="Search influencers"
                placeholder="Search influencers by name or tag"
                className="w-full bg-background text-foreground placeholder:text-muted-foreground outline-none"
              />
            </Card>

            <section className="grid gap-4 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-4 hover-scale">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Creator #{i} — Miami, FL</h3>
                    <span className="text-xs text-muted-foreground">Gen Z • Climate</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Engagement: 7.8% • Followers: 18k</p>
                  <div className="mt-3">
                    <Button variant="cta" size="sm">Invite</Button>
                  </div>
                </Card>
              ))}
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default Discovery;
