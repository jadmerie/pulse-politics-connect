import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Users2, Zap, DollarSign, Shield, Target } from "lucide-react";

const DualAudienceSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Trusted by <span className="text-patriot-red">PACs</span> & <span className="text-patriot-blue">Political Influencers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The only platform specifically designed for Political Action Committee 
            campaigns and politically-engaged content creators.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Campaigns */}
          <Card className="p-12 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-patriot-red rounded-lg flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-patriot-red">For Political Action Committees</h3>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <Target className="w-5 h-5 text-patriot-red mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">District-Level Targeting</h4>
                  <p className="text-muted-foreground text-sm">Reach voters in specific congressional districts with influencers who have authentic local followings and political credibility.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-patriot-red mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">FEC Compliance Built-In</h4>
                  <p className="text-muted-foreground text-sm">Automated expenditure tracking, disclosure management, and compliance reporting specifically designed for PAC requirements.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <DollarSign className="w-5 h-5 text-patriot-red mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Maximize ROI</h4>
                  <p className="text-muted-foreground text-sm">Achieve higher voter engagement rates than traditional media at lower cost per impression with authentic grassroots messaging.</p>
                </div>
              </div>
            </div>
            
            <Button variant="cta" size="lg" className="w-full">
              Launch PAC Campaign
            </Button>
          </Card>
          
          {/* For Influencers */}
          <Card className="p-12 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-patriot-blue rounded-lg flex items-center justify-center mr-4">
                <Users2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-patriot-blue">For Political Content Creators</h3>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <Zap className="w-5 h-5 text-patriot-blue mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Premium Political Partnerships</h4>
                  <p className="text-muted-foreground text-sm">Partner with established PACs and political organizations for high-value campaigns that align with your political beliefs.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-patriot-blue mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Compliance Protection</h4>
                  <p className="text-muted-foreground text-sm">Automated disclosure generation and FEC compliance tracking protects you while you focus on creating authentic political content.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Target className="w-5 h-5 text-patriot-blue mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Verified Opportunities</h4>
                  <p className="text-muted-foreground text-sm">Access to thoroughly vetted PAC partnerships with transparent payment terms and clear campaign objectives.</p>
                </div>
              </div>
            </div>
            
            <Button variant="professional" size="lg" className="w-full">
              Join Creator Network
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DualAudienceSection;