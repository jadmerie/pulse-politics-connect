import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { BadgeCheck, Users } from "lucide-react";
import PatrioticBanner from "@/components/PatrioticBanner";
import capitolHero from "@/assets/capitol-hero.jpg";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import influencerPatriot1 from "@/assets/avatars/influencer-patriot-1.webp";
import pacEmblem1 from "@/assets/avatars/pac-emblem-1.webp";

const Profiles = () => {
  return (
    <>
      <SEO
        title="User Profiles & Verification"
        description="Verified influencer and organization profiles with audience stats and trust signals."
        canonicalPath="/profiles"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "Profiles",
        }}
      />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <header className="mb-8 animate-fade-in">
          <h1 className="font-brand text-3xl font-bold text-foreground">Profiles</h1>
          <p className="text-muted-foreground mt-2">Influencer and Campaign Organization profiles.</p>
        </header>

        <PatrioticBanner
          title="Trusted American Voices"
          subtitle="Verified creators and organizations advancing civic engagement across the nation."
          image={capitolHero}
          alt="US Capitol with American flag accent"
        />

        <section className="grid gap-4 md:grid-cols-2 mt-6">
          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10 ring-2 ring-background shadow-elegant">
                <AvatarImage src={influencerPatriot1} alt="Verified political influencer headshot" loading="lazy" />
                <AvatarFallback className="text-xs bg-muted">IN</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <h2 className="font-semibold text-foreground">Influencer Profile</h2>
              </div>
            </div>
          </Card>

          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10 ring-2 ring-background shadow-elegant">
                <AvatarImage src={pacEmblem1} alt="PAC emblem with stars and stripes" loading="lazy" />
                <AvatarFallback className="text-xs bg-muted">PAC</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4" />
                <h2 className="font-semibold text-foreground">Organization Profile</h2>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Profiles;
