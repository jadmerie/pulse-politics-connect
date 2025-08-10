import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { BadgeCheck, Users } from "lucide-react";

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

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Influencer Profile</h2>
            </div>
            <p className="text-sm text-muted-foreground">Miami, FL • 18k followers • 7.8% engagement • Issues: Climate, Education</p>
          </Card>

          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Organization Profile</h2>
            </div>
            <p className="text-sm text-muted-foreground">Verified PAC • Compliance on-file • Active campaigns: 3</p>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Profiles;
