import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePenLine, ShieldCheck, Landmark, FileText } from "lucide-react";

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
        <header className="mb-8 relative overflow-hidden rounded-xl border bg-patriot-blue text-primary-foreground p-6 shadow-card animate-fade-in">
          <div className="absolute inset-0 bg-gradient-patriot opacity-10" aria-hidden />
          <div className="absolute -right-6 -top-8 hidden md:block opacity-10" aria-hidden>
            <Landmark className="w-48 h-48 text-primary-foreground" />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-primary-foreground">Submissions</h1>
            <p className="text-primary-foreground/90 mt-2">Drafts awaiting review and approval.</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-primary-foreground/90 text-sm">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> FEC Compliance
              </span>
              <span className="inline-flex items-center gap-2">
                <FileText className="w-4 h-4" /> Public Disclosures
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 mt-6">
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
