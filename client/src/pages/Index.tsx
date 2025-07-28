import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import WhosHereSection from "@/components/WhosHereSection.1";
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
      

    </div>
  );
};

export default Index;
