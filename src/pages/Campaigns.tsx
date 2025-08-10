import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderPlus, ListChecks } from "lucide-react";

const Campaigns = () => {
  return (
    <>
      <SEO
        title="Manage PAC Campaigns"
        description="Create and manage influencer campaigns with approvals, budgets, and timelines."
        canonicalPath="/campaigns"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "PAC Campaigns",
        }}
      />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
            <p className="text-muted-foreground mt-2">Define objectives, budgets, and track influencer progress.</p>
          </div>
          <Button variant="professional">
            <FolderPlus className="w-4 h-4 mr-2" /> New Campaign
          </Button>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {["Voter Reg Florida", "GOTV Georgia"].map((name, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">{name}</h2>
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Influencers: 12 • Budget: $15,000 • Approved: 24/30</p>
              <div className="mt-3">
                <Button variant="secondary" size="sm">
                  <ListChecks className="w-4 h-4 mr-2" /> View Workflow
                </Button>
              </div>
            </Card>
          ))}
        </section>
      </main>
    </>
  );
};

export default Campaigns;
