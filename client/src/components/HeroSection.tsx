import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { ImpactStrip } from "./ImpactStrip";
import { NoticeBanner } from "./NoticeBanner";
import HorizontalScroller from "./ui/horizontal-scroller";
import HeroHighlights from "./HeroHighlights";

const topUniversities = [
  { name: "Harvard", logo: "/logos/universities/Harvard.png" },
  { name: "Stanford", logo: "/logos/universities/Stanford.png" },
  { name: "MIT", logo: "/logos/universities/MIT.png" },
  { name: "UC Berkeley", logo: "/logos/universities/UC_Berkeley.png" },
  { name: "Oxford", logo: "/logos/universities/Oxford.png" },
  { name: "Cambridge", logo: "/logos/universities/Cambridge.png" },
  { name: "Caltech", logo: "/logos/universities/Caltech.png" },
  { name: "Princeton", logo: "/logos/universities/Princeton.png" },
  { name: "Yale", logo: "/logos/universities/Yale.png" },
  { name: "Columbia", logo: "/logos/universities/Columbia.png" },
  { name: "UChicago", logo: "/logos/universities/UChicago.png" },
  { name: "UPenn", logo: "/logos/universities/UPenn.png" },
  { name: "Cornell", logo: "/logos/universities/Cornell.png" },
  { name: "UCLA", logo: "/logos/universities/UCLA.png" },
  { name: "Johns Hopkins", logo: "/logos/universities/Johns_Hopkins.png" },
  { name: "Duke", logo: "/logos/universities/Duke.png" },
  { name: "Northwestern", logo: "/logos/universities/Northwestern.png" },
  { name: "NYU", logo: "/logos/universities/NYU.png" },
  { name: "Michigan", logo: "/logos/universities/Michigan.png" },
  { name: "Toronto", logo: "/logos/universities/Toronto.png" },
  { name: "Imperial College London", logo: "/logos/universities/Imperial_College_London.png" },
  { name: "ETH Zurich", logo: "/logos/universities/ETH_Zurich.png" },
  { name: "Tsinghua", logo: "/logos/universities/Tsinghua.png" },
  { name: "Peking University", logo: "/logos/universities/Peking_University.png" },
  { name: "National University of Singapore", logo: "/logos/universities/National_University_of_Singapore.png" },
  { name: "LSE", logo: "/logos/universities/LSE.png" },
  { name: "Carnegie Mellon", logo: "/logos/universities/Carnegie_Mellon.png" },
  { name: "Brown", logo: "/logos/universities/Brown.png" },
  { name: "Dartmouth", logo: "/logos/universities/Dartmouth.png" },
  { name: "IIT Bombay", logo: "/logos/universities/IIT_Bombay.png" },
  { name: "IIT Delhi", logo: "/logos/universities/IIT_Delhi.png" }
];
const topCompanies = [
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { name: "Meta", logo: "https://logo.clearbit.com/meta.com" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
  { name: "Nvidia", logo: "https://logo.clearbit.com/nvidia.com" },
  { name: "Tesla", logo: "https://logo.clearbit.com/tesla.com" },
  { name: "OpenAI", logo: "https://logo.clearbit.com/openai.com" },
  { name: "Y Combinator", logo: "https://logo.clearbit.com/ycombinator.com" },
  { name: "Goldman Sachs", logo: "https://logo.clearbit.com/goldmansachs.com" },
  { name: "McKinsey", logo: "https://logo.clearbit.com/mckinsey.com" },
  { name: "Bain", logo: "https://logo.clearbit.com/bain.com" },
  { name: "BCG", logo: "https://logo.clearbit.com/bcg.com" },
  { name: "JP Morgan", logo: "https://logo.clearbit.com/jpmorganchase.com" },
  { name: "Morgan Stanley", logo: "https://logo.clearbit.com/morganstanley.com" },
  { name: "Stripe", logo: "https://logo.clearbit.com/stripe.com" },
  { name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com" },
  { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com" },
  { name: "Uber", logo: "https://logo.clearbit.com/uber.com" },
  { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com" },
  { name: "Adobe", logo: "https://logo.clearbit.com/adobe.com" },
  { name: "Intel", logo: "https://logo.clearbit.com/intel.com" },
  { name: "SpaceX", logo: "https://logo.clearbit.com/spacex.com" },
  { name: "Palantir", logo: "https://logo.clearbit.com/palantir.com" },
  { name: "LinkedIn", logo: "https://logo.clearbit.com/linkedin.com" },
  { name: "Dropbox", logo: "https://logo.clearbit.com/dropbox.com" },
  { name: "Atlassian", logo: "https://logo.clearbit.com/atlassian.com" },
  { name: "Shopify", logo: "https://logo.clearbit.com/shopify.com" },
  { name: "ByteDance", logo: "https://logo.clearbit.com/bytedance.com" },
  { name: "Tencent", logo: "https://logo.clearbit.com/tencent.com" }
];

const rotatingWords = ["Collaborations", "Deals", "Partnerships"];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [email, setEmail] = useState("");
  const isMobile = useIsMobile();
  const [unstacked, setUnstacked] = useState(false);
  const lastScrollY = useRef(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      if (!stackRef.current) return;
      const rect = stackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // When the top of the stack is at the top of the viewport, progress is 0
      // When the bottom of the stack is at the top of the viewport, progress is 1
      const total = rect.height;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setScrollProgress(scrolled / total);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section className="min-h-screen gradient-hero relative overflow-hidden pt-24 pb-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/40 rounded-full blur-lg animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-accent/30 rounded-full blur-xl animate-float" style={{animationDelay: "2s"}}></div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center min-h-[calc(100vh-8rem)] justify-center">
          
          {/* Top Banner */}
          <Badge className="mb-4 md:mb-6 px-3 py-2 text-xs md:text-sm lg:text-base md:px-4 md:py-2 font-medium bg-blue-600/20 text-blue-300 border-blue-400/30 glow-primary">
            From World's Top 100 Universities & Companies✨
          </Badge>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="block">Elites' Fast-Track to</span>
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block transition-all duration-500">
              {rotatingWords[wordIndex]}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed max-w-2xl">
            Where the world's most ambitious meet—and get things done.
          </p>

          {/* CTA Area */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <Input 
                type="email" 
                placeholder="Organization Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-effect text-white placeholder:text-gray-400 min-h-[44px] text-sm lg:text-base flex-1"
              />
              <Button 
                className="gradient-gold text-black font-semibold px-4 sm:px-6 glow-gold min-h-[44px] whitespace-nowrap text-sm lg:text-base" 
                disabled={!email}
              >
                Get Your Invitation
              </Button>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mb-4 px-1">
              ❓ <span className="underline cursor-pointer hover:text-primary">Not from Listed Org?</span>{" "}
              <span className="underline cursor-pointer hover:text-accent">Join Weekly Waitlist</span>
            </p>
          </div>
        </div>

        {/* University and Company Logos Scroll - Full Width Below Split */}
        <div className="overflow-hidden w-full mt-12 lg:mt-16">
          <div className="text-xs md:text-sm text-muted-foreground mb-1 font-medium text-center">
            Used by Professionals, Alumni & Students from
          </div>
          <div className="w-full">
            <HorizontalScroller items={topUniversities} />
            <HorizontalScroller items={topCompanies} />
          </div>
        </div>

        {/* Hero Highlights (ImpactStrip + Notice Banner) - Full Width Below */}
        <div className="mt-12 lg:mt-16">
          <HeroHighlights />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;