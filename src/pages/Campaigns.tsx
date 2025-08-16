import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListChecks, DollarSign, Users, Calendar } from "lucide-react";
import PatrioticBanner from "@/components/PatrioticBanner";
import votersHero from "@/assets/voters-at-polls.webp";
import BackedByStrip from "@/components/BackedByStrip";
import CampaignModal from "@/components/CampaignModal";
import CampaignDetailsModal from "@/components/CampaignDetailsModal";
import { useCampaigns } from "@/hooks/useCampaigns";

const Campaigns = () => {
  const { campaigns, loading, createCampaign } = useCampaigns();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'draft':
        return 'text-yellow-600';
      case 'completed':
        return 'text-blue-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

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
        <header className="mb-8 flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="font-brand text-3xl font-bold text-foreground">Campaigns</h1>
            <p className="text-muted-foreground mt-2">Define objectives, budgets, and track influencer progress.</p>
          </div>
          <CampaignModal onCreateCampaign={createCampaign} />
        </header>

        <PatrioticBanner
          title="Mobilize Voters"
          subtitle="Plan, budget, and launch campaigns that inform and inspire civic participation."
          image={votersHero}
          alt="Voters lining up to vote at the polls"
        />

        <BackedByStrip />

        <section className="grid gap-4 md:grid-cols-2 mt-6">
          {loading ? (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">Loading campaigns...</p>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="col-span-2 text-center py-8">
              <p className="text-muted-foreground">No campaigns yet. Create your first campaign!</p>
            </div>
          ) : (
            campaigns.map((campaign) => (
              <Card key={campaign.id} className="p-4 hover-scale">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold text-foreground">{campaign.name}</h2>
                  <span className={`text-xs font-medium capitalize ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
                
                {campaign.description && (
                  <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {formatCurrency(Number(campaign.budget))}
                  </span>
                  {campaign.pacs && (
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {campaign.pacs.name}
                    </span>
                  )}
                  {campaign.start_date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(campaign.start_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <div className="mt-3">
                  <CampaignDetailsModal campaign={campaign}>
                    <Button variant="secondary" size="sm">
                      <ListChecks className="w-4 h-4 mr-2" /> View Details
                    </Button>
                  </CampaignDetailsModal>
                </div>
              </Card>
            ))
          )}
        </section>
      </main>
    </>
  );
};

export default Campaigns;
