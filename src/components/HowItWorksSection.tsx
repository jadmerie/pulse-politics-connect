import { Search, UserCheck, Megaphone, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Discover Influencers",
    description: "Browse our vetted network of political micro-influencers filtered by audience demographics, engagement rates, and political alignment."
  },
  {
    icon: UserCheck,
    step: "02", 
    title: "Verify & Connect",
    description: "Review influencer profiles, past performance metrics, and compliance history. Connect directly through our secure platform."
  },
  {
    icon: Megaphone,
    step: "03",
    title: "Launch Campaigns",
    description: "Create campaigns with built-in compliance tools, content approval workflows, and transparent disclosure management."
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Track Results",
    description: "Monitor real-time performance with detailed analytics on reach, engagement, sentiment, and conversion metrics."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How PoliPulse Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Launch authentic political influence campaigns in four simple steps
          </p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold text-accent-foreground">
                    {step.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-accent to-transparent transform translate-y-10" 
                       style={{ width: 'calc(100% - 5rem)' }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;