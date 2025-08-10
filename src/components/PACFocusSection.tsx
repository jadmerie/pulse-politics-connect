import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Vote, TrendingUp, Shield, Users, DollarSign } from "lucide-react";

const PACFocusSection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-patriot-blue/90 via-patriot-blue/70 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Why PACs Choose PoliPulse
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Purpose-built for Political Action Committees who need to maximize 
            voter engagement while maintaining strict regulatory compliance.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-patriot-red rounded-lg flex items-center justify-center mr-4">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Maximize Voter Reach</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Connect with micro-influencers who have authentic relationships with 
              your target voter demographics across key battleground districts.
            </p>
          </Card>
          
          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-patriot-red rounded-lg flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Stay FEC Compliant</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Automated disclosure tracking, expenditure reporting, and content 
              approval workflows ensure every campaign meets federal requirements.
            </p>
          </Card>
          
          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-patriot-blue">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-patriot-red rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Measure Impact</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              Track voter sentiment shifts, engagement metrics, and conversion 
              to political action with detailed district-level analytics.
            </p>
          </Card>
        </div>
        
        <div className="text-center">
          <Button variant="pulse" size="lg" className="text-lg px-12 py-4 bg-patriot-blue text-white hover:bg-patriot-blue/90">
            Schedule PAC Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PACFocusSection;