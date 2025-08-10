import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePenLine, ShieldCheck } from "lucide-react";
import PatrioticBanner from "@/components/PatrioticBanner";
import capitolHero from "@/assets/capitol-hero.jpg";

const Submissions = () => {
  return (
    <>
      <SEO
        title="Content Submissions & Review"
        description="Approve influencer drafts, request changes, and ensure required disclosures."
        canonicalPath="/submissions"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Content Submissions",
        }}
      />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Submissions</h1>
          <p className="text-muted-foreground mt-2">Drafts awaiting review and approval.</p>
        </header>

        <PatrioticBanner
          title="Protect Integrity. Promote Transparency."
          subtitle="Politically aligned content, verified disclosures, FEC-ready review workflow."
          image={capitolHero}
          alt="US Capitol building with American flag"
        />
        
        <section className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">TikTok Video Draft • Creator #{i}</h2>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Includes #Ad and paid disclaimer.</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm"><ShieldCheck className="w-4 h-4 mr-2" /> Approve</Button>
                <Button variant="secondary" size="sm"><FilePenLine className="w-4 h-4 mr-2" /> Request Changes</Button>
              </div>
            </Card>
          ))}
        </section>
      </main>
    </>
  );
};

export default Submissions;
