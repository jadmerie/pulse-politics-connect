import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PACFocusSection from "@/components/PACFocusSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DualAudienceSection from "@/components/DualAudienceSection";
import CTASection from "@/components/CTASection";
import PatrioticBanner from "@/components/PatrioticBanner";
import patrioticHero from "@/assets/patriotic-hero.jpg";

const Index = () => {
  return (
    <>
      <SEO
        title="PoliPulse | Political Influencer Platform for PACs"
        description="Amplify your PAC with vetted micro-influencers. Run FEC-compliant grassroots campaigns and track impact with patriotic-themed analytics."
        canonicalPath="/"
      />
      <main className="pt-16">
        <HeroSection />
        <PatrioticBanner
          title="United Voices. Stronger Democracy."
          subtitle="Real Americans. Real stories. Authentic influence—at scale, with full compliance."
          image={patrioticHero}
          alt="American flag waving with diverse voters"
        />
        <FeaturesSection />
        <PACFocusSection />
        <HowItWorksSection />
        <DualAudienceSection />
        <CTASection />
      </main>
    </>
  );
};

export default Index;
