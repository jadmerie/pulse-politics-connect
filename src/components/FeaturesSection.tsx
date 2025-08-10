import { Shield, Users, BarChart3, CheckCircle, Globe, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "FEC Compliance Automation",
    description: "Automated compliance tracking, disclosure management, and reporting specifically designed for PAC requirements and federal election law."
  },
  {
    icon: Users,
    title: "Political Influencer Vetting",
    description: "Rigorously screened political content creators with verified voter demographics and authentic political engagement."
  },
  {
    icon: BarChart3,
    title: "Voter Impact Analytics",
    description: "Advanced metrics tracking voter sentiment, engagement rates, and conversion to political action with demographic breakdowns."
  },
  {
    icon: CheckCircle,
    title: "Content Approval Workflows",
    description: "Multi-tier approval process ensuring all content meets PAC messaging guidelines and regulatory requirements."
  },
  {
    icon: Globe,
    title: "Demographic Targeting",
    description: "Precise audience targeting by congressional district, voting history, party affiliation, and key issue interests."
  },
  {
    icon: MessageSquare,
    title: "Message Amplification",
    description: "Strategic content distribution to maximize reach within target voter segments while maintaining authentic influencer voice."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-brand text-4xl font-bold text-foreground mb-4">
            Built Specifically for <span className="text-patriot-red">Political Action Committees</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools designed for PACs to execute compliant, effective 
            influencer campaigns that drive real political impact.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 bg-gradient-card border-0 shadow-card hover:shadow-red transition-all duration-300 group">
                <div className="w-12 h-12 bg-patriot-red rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-patriot-blue mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;