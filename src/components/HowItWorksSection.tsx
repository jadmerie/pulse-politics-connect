import { Search, UserCheck, Megaphone, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Target Your Districts",
    description: "Identify and filter political influencers by congressional district, voter demographics, and issue alignment specific to your PAC's objectives."
  },
  {
    icon: UserCheck,
    step: "02", 
    title: "Vet & Approve",
    description: "Review detailed influencer profiles including political content history, audience verification, and FEC compliance records before partnership."
  },
  {
    icon: Megaphone,
    step: "03",
    title: "Execute Campaign",
    description: "Deploy compliant campaigns with automated disclosure tracking, content approval workflows, and real-time expenditure reporting."
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Measure Voter Impact",
    description: "Track voter sentiment changes, engagement by demographic, and conversion to political action with district-level performance analytics."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your PAC Campaign in <span className="text-patriot-red">4 Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From strategy to voter impact - streamlined for Political Action Committees
          </p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-patriot rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-patriot-red rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
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
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-patriot-red to-transparent transform translate-y-10" 
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