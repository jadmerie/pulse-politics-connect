import { Shield, Users, BarChart3, CheckCircle, Globe, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "Vetted Influencer Network",
    description: "Access pre-screened micro and nano-influencers with verified audiences and authentic engagement rates."
  },
  {
    icon: Shield,
    title: "Built-in Compliance",
    description: "Automatic FEC and FTC compliance tracking with transparent disclosure management and reporting."
  },
  {
    icon: BarChart3,
    title: "Campaign Analytics",
    description: "Real-time performance tracking with detailed metrics on reach, engagement, and conversion rates."
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Content approval workflows and brand safety measures to ensure authentic, on-message promotions."
  },
  {
    icon: Globe,
    title: "Bipartisan Platform",
    description: "Neutral platform supporting campaigns and causes across the political spectrum with equal access."
  },
  {
    icon: MessageSquare,
    title: "Message Authenticity",
    description: "Tools to maintain genuine voice while ensuring consistent messaging and brand alignment."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need for Political Influence Marketing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From influencer discovery to campaign compliance, PoliPulse provides the complete toolkit 
            for authentic political engagement.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-8 bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
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