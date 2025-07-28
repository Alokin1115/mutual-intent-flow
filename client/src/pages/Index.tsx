import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import WhosHereSection from "@/components/WhosHereSection";
import IndustryLeaderCarousel from "@/components/IndustryLeaderCarousel";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <HowItWorksSection />
      <PricingSection />
      <WhosHereSection />
      <IndustryLeaderCarousel />
      <WaitlistSection />
      <Footer />
      
      {/* Mobile Floating CTA */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <button className="w-full gradient-gold text-black font-semibold py-4 rounded-full glow-gold min-h-[56px] text-base shadow-lg">
          Get Invite
        </button>
      </div>
    </div>
  );
};

export default Index;
