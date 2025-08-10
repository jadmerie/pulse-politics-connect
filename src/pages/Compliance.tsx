import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Shield, ClipboardList } from "lucide-react";

const Compliance = () => {
  return (
    <>
      <SEO
        title="PAC Compliance & Audit Trail"
        description="Automated disclosures, immutable logs, and compliance status across campaigns."
        canonicalPath="/compliance"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Compliance",
        }}
      />
      <main className="container mx-auto px-6 pt-24 pb-16">
        <header className="mb-8 animate-fade-in">
          <h1 className="font-brand text-3xl font-bold text-foreground">Compliance</h1>
          <p className="text-muted-foreground mt-2">Disclosure checks, audit logs, and review queue.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Status Overview</h2>
            </div>
            <p className="text-sm text-muted-foreground">Compliant: 92% • Pending: 6% • Flagged: 2%</p>
          </Card>
          <Card className="p-4 hover-scale">
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-4 h-4" />
              <h2 className="font-semibold text-foreground">Recent Audit Log</h2>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>10:12 AM • Approved caption with #Ad and Paid for by...</li>
              <li>09:48 AM • Flagged missing disclosure on IG Story</li>
              <li>Yesterday • Exported FEC report (Q3)</li>
            </ul>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Compliance;
