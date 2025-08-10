import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-patriot relative overflow-hidden">
      <div className="absolute inset-0 bg-stripes" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-patriot-blue/80 via-patriot-blue/60 to-patriot-red/30" />
      <div className="absolute inset-0 bg-stars opacity-20" aria-hidden />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
          Ready to Amplify Your PAC's Impact?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join 200+ Political Action Committees using PoliPulse to reach voters 
          authentically while maintaining full FEC compliance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="pulse" size="lg" className="text-lg px-8 py-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Start PAC Campaign
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground/30 text-accent-foreground hover:bg-primary-foreground/10">
            Book Strategy Call
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-primary-foreground/70 text-sm">
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
