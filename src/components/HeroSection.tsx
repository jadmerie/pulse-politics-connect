import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Political Influence,
              <span className="text-primary-glow"> Authentically Delivered</span>
            </h1>
            
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Connect campaigns and advocacy groups with vetted micro-influencers. 
              Launch grassroots digital promotions with built-in FEC/FTC compliance 
              and transparent, bipartisan accessibility.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm">Vetted Influencers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50M+</div>
                <div className="text-sm">Audience Reach</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99%</div>
                <div className="text-sm">Compliance Rate</div>
              </div>
            </div>
          </div>
          
          <div className="lg:block hidden">
            <img 
              src={heroImage} 
              alt="Political campaign team collaborating" 
              className="rounded-2xl shadow-elegant w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;