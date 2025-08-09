import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Users2, Zap, DollarSign, Shield, Target } from "lucide-react";

const DualAudienceSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Built for Campaigns & Influencers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're running a campaign or building your influence, PoliPulse provides 
            the tools and network you need to succeed.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* For Campaigns */}
          <Card className="p-12 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">For Campaigns & Organizations</h3>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <Target className="w-5 h-5 text-accent mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Targeted Reach</h4>
                  <p className="text-muted-foreground text-sm">Connect with specific demographics and geographic regions through verified influencer networks.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-accent mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Compliance Assurance</h4>
                  <p className="text-muted-foreground text-sm">Automatic FEC/FTC compliance tracking with transparent reporting and disclosure management.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <DollarSign className="w-5 h-5 text-accent mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Cost-Effective</h4>
                  <p className="text-muted-foreground text-sm">Reach more voters with authentic grassroots messaging at a fraction of traditional advertising costs.</p>
                </div>
              </div>
            </div>
            
            <Button variant="professional" size="lg" className="w-full">
              Start Your Campaign
            </Button>
          </Card>
          
          {/* For Influencers */}
          <Card className="p-12 bg-gradient-card border-0 shadow-card">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4">
                <Users2 className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">For Political Influencers</h3>
            </div>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <Zap className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Monetize Your Voice</h4>
                  <p className="text-muted-foreground text-sm">Connect with campaigns and causes that align with your values and earn from authentic endorsements.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Stay Compliant</h4>
                  <p className="text-muted-foreground text-sm">Built-in tools ensure all your political content meets FEC and FTC disclosure requirements.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Target className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Quality Partnerships</h4>
                  <p className="text-muted-foreground text-sm">Work with vetted campaigns and organizations while maintaining your authentic voice and brand.</p>
                </div>
              </div>
            </div>
            
            <Button variant="cta" size="lg" className="w-full">
              Join as Influencer
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DualAudienceSection;