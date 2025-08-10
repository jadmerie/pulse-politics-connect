import { Button } from "@/components/ui/button";
import heroCollege from "@/assets/rep-college-speech-2.webp";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-patriot relative overflow-hidden">
      <div className="absolute inset-0 bg-stripes" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-patriot-blue/90 via-patriot-blue/70 to-transparent" />
      <div className="absolute inset-0 bg-stars opacity-20" aria-hidden />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-foreground">
            <h1 className="font-brand text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Amplify Your PAC's Voice
              <span className="text-patriot-red"> Through Authentic Influence</span>
            </h1>
            
            <p className="text-xl mb-8 text-foreground/90 leading-relaxed">
              The premier platform for Political Action Committees to connect with 
              verified micro-influencers. Execute compliant grassroots campaigns 
              that drive voter engagement and maximize your political impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="pulse" size="lg" className="text-lg px-8 py-4">
                Launch Your PAC Campaign
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-foreground/30 text-foreground hover:bg-foreground/10">
                View Success Stories
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-foreground/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-patriot-red">200+</div>
                <div className="text-sm">Active PACs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-patriot-red">75M+</div>
                <div className="text-sm">Voter Impressions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-patriot-red">100%</div>
                <div className="text-sm">FEC Compliant</div>
              </div>
            </div>
          </div>
          
          <div className="lg:block hidden">
            <img 
              src={heroCollege}
              alt="U.S. representative giving a major speech at a college campus rally"
              className="rounded-2xl shadow-elegant w-full h-auto object-cover lg:scale-110 lg:translate-x-2"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;