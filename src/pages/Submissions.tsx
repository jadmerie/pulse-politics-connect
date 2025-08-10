import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePenLine, ShieldCheck, Landmark, FileText, Star, Clock } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import presidential1 from "@/assets/avatars/presidential-1.webp";
import presidential2 from "@/assets/avatars/presidential-2.webp";
import presidential3 from "@/assets/avatars/presidential-3.webp";
import submissionsHeaderImage from "@/assets/submissions-genz-rally-hero.webp";
import submissionsGenZRally from "@/assets/submissions-genz-rally.webp";

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
        <header className="mb-8 relative overflow-hidden rounded-xl border bg-gradient-patriot text-primary-foreground p-6 shadow-card shadow-red animate-fade-in">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-y-0 right-0 w-1/2">
              <img
                src={submissionsHeaderImage}
                alt="Gen Z influencer speaking at a patriotic rally"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-background/40" />
              <div
                className="absolute inset-0"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, hsl(var(--primary-foreground) / 0.05) 0 10px, transparent 10px 20px)" }}
              />
            </div>
          </div>
          <div className="absolute -right-6 -top-8 hidden md:block opacity-10" aria-hidden>
            <Landmark className="w-48 h-48 text-primary-foreground" />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-primary-foreground">Submissions</h1>
            <p className="text-primary-foreground/90 mt-2">Drafts awaiting review and approval.</p>
            <div className="mt-3 flex items-center gap-1 text-primary-foreground/90" aria-hidden>
              {new Array(5).fill(0).map((_, i) => (
                <Star key={i} className="w-4 h-4" />
              ))}
            </div>
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
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 ring-2 ring-background shadow-elegant">
                    <AvatarImage src={[presidential1, presidential2, presidential3][i-1]} alt={`${["President Liberty","American Stateswoman","Civic Leader"][i-1]} headshot`} loading="lazy" />
                    <AvatarFallback className="text-xs bg-muted">US</AvatarFallback>
                  </Avatar>
                  <h2 className="font-semibold text-foreground">TikTok Video Draft • {["President Liberty","American Stateswoman","Civic Leader"][i-1]}</h2>
                </div>
                <span className="text-xs text-muted-foreground inline-flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> Pending</span>
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
