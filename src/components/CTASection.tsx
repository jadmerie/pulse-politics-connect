import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/90" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Political Campaigns?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join the future of political influence marketing. Connect with authentic voices, 
          ensure compliance, and drive real engagement with your message.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90">
            Get Started Free
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
            Schedule Demo
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70 text-sm">
          <div className="flex items-center">
            ✓ No setup fees
          </div>
          <div className="flex items-center">
            ✓ 14-day free trial
          </div>
          <div className="flex items-center">
            ✓ Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;