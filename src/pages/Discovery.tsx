import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import creator1 from "@/assets/avatars/creator1.jpg";
import creator2 from "@/assets/avatars/creator2.jpg";
import creator3 from "@/assets/avatars/creator3.jpg";
import creator4 from "@/assets/avatars/creator4.jpg";

const partyStyles: Record<string, string> = {
  Democrat: "bg-patriot-blue text-primary-foreground",
  Republican: "bg-patriot-red text-primary-foreground",
  Independent: "bg-secondary text-foreground",
};

const creators = [
  {
    name: "Maya Lopez",
    location: "Miami, FL",
    tags: "Gen Z • Climate",
    engagement: "7.8%",
    followers: "18k",
    bio: "South Florida creator covering climate resilience and civic participation.",
    avatar: creator1,
    platforms: ["TikTok", "Instagram"],
    party: "Democrat",
  },
  {
    name: "Jared Kim",
    location: "Atlanta, GA",
    tags: "Millennial • Voting Access",
    engagement: "6.2%",
    followers: "24k",
    bio: "Community organizer sharing GOTV resources and policy explainers.",
    avatar: creator2,
    platforms: ["Instagram", "YouTube"],
    party: "Independent",
  },
  {
    name: "Aisha Rahman",
    location: "Phoenix, AZ",
    tags: "Gen Z • Education",
    engagement: "8.4%",
    followers: "15k",
    bio: "Student advocate creating short-form videos on education equity.",
    avatar: creator3,
    platforms: ["TikTok"],
    party: "Republican",
  },
  {
    name: "Diego Ortega",
    location: "Orlando, FL",
    tags: "Gen Z • Climate",
    engagement: "7.1%",
    followers: "19k",
    bio: "Bilingual content on local issues and early voting info.",
    avatar: creator4,
    platforms: ["TikTok", "Instagram"],
    party: "Democrat",
  },
];

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
              {creators.map((c, idx) => (
                <Card key={idx} className="p-4 hover-scale">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={c.avatar} alt={`${c.name} profile photo`} loading="lazy" />
                        <AvatarFallback>{c.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">{c.name}</h3>
                        <p className="text-xs text-muted-foreground">{c.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${partyStyles[c.party]} capitalize`} variant="secondary" aria-label={`Party: ${c.party}`}>
                        {c.party}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{c.tags}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">Engagement: {c.engagement} • Followers: {c.followers}</p>
                  <p className="text-sm text-foreground/80 mt-2">{c.bio}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">Platforms: {c.platforms.join(", ")}</div>
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
