import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { ImpactStrip } from "./ImpactStrip";
import { NoticeBanner } from "./NoticeBanner";
import HorizontalScroller from "./ui/horizontal-scroller";
import HeroHighlights from "./HeroHighlights";
import { InvitationDialog } from "./InvitationDialog";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const isMobile = useIsMobile();
  const [unstacked, setUnstacked] = useState(false);
  const lastScrollY = useRef(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { toast } = useToast();
  const emailValidationTimeoutRef = useRef<NodeJS.Timeout>();

  // Email validation mutation
  const emailValidationMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Validation failed");
      return result;
    },
    onSuccess: (data) => {
      // If email needs correction, show suggestion
      if (!data.isValid && data.suggestedFix) {
        setEmailSuggestion(data.suggestedFix);
      } else {
        setEmailSuggestion(null);
      }
      setIsValidating(false);
    },
    onError: (error: Error) => {
      console.warn('Email validation error:', error.message);
      setEmailSuggestion(null);
      setIsValidating(false);
    },
  });

  // Organization invitation mutation for direct submission
  const orgInviteMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/organization-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(JSON.stringify(result));
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: data.message,
        duration: 5000,
      });
      setEmail("");
      setEmailSuggestion(null);
    },
    onError: (error: any) => {
      // Try to parse error response for suggested corrections
      try {
        const errorData = JSON.parse(error.message);
        if (errorData.suggestedEmail) {
          setEmailSuggestion(errorData.suggestedEmail);
          toast({
            title: "Email Domain Issue",
            description: `${errorData.error}. ${errorData.suggestion}`,
            variant: "destructive",
            duration: 8000,
          });
        } else {
          toast({
            title: "Not Recognized",
            description: errorData.error || error.message,
            variant: "destructive",
            duration: 5000,
          });
        }
      } catch {
        toast({
          title: "Error",
          description: "Please check your email and try again",
          variant: "destructive",
          duration: 5000,
        });
      }
    },
  });

  // Handle email input changes with debounced validation
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailSuggestion(null);

    // Clear existing timeout
    if (emailValidationTimeoutRef.current) {
      clearTimeout(emailValidationTimeoutRef.current);
    }

    // Only validate if email looks complete (has @ and domain)
    if (newEmail.includes('@') && newEmail.split('@')[1]?.includes('.')) {
      setIsValidating(true);
      emailValidationTimeoutRef.current = setTimeout(() => {
        emailValidationMutation.mutate(newEmail);
      }, 500); // Wait 500ms after user stops typing
    }
  }, [emailValidationMutation]);

  // Handle invitation button click
  const handleGetInvitation = useCallback(() => {
    if (!email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // If there's a suggestion, use it instead
    const emailToSubmit = emailSuggestion || email;
    orgInviteMutation.mutate(emailToSubmit);
  }, [email, emailSuggestion, orgInviteMutation, toast]);

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

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Top Banner */}
        <div className="px-4 md:px-6">
        <Badge className="mb-6 md:mb-8 px-3 py-2 text-xs md:text-base lg:text-lg md:px-6 md:py-3 font-medium bg-blue-600/20 text-blue-300 border-blue-400/30 glow-primary">
          From World's Top 100 Universities & Companies✨
        </Badge>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight">
          <span className="whitespace-nowrap">Elites' Fast-Track to</span><br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block mx-auto transition-all duration-500">
            {rotatingWords[wordIndex]}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto">
          Where the world's most ambitious meet—and get things done.
        </p>

        {/* CTA Area with Email Validation */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="Organization Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`glass-effect text-white placeholder:text-gray-400 min-h-[48px] text-base pr-10 ${
                    emailValidationMutation.data?.isValid && !isValidating 
                      ? 'border-green-400/50' 
                      : ''
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isValidating ? (
                    <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  ) : emailValidationMutation.data?.isValid && !emailSuggestion ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : null}
                </div>
              </div>
              {emailSuggestion && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-blue-900/90 backdrop-blur-sm border border-blue-400/30 rounded-md p-2 text-sm">
                  <div className="flex items-center gap-2 text-blue-200">
                    <AlertCircle className="h-4 w-4" />
                    <span>Did you mean: </span>
                    <button
                      onClick={() => {
                        setEmail(emailSuggestion);
                        setEmailSuggestion(null);
                      }}
                      className="text-accent hover:text-accent/80 underline font-medium"
                    >
                      {emailSuggestion}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Button 
              onClick={handleGetInvitation}
              className="gradient-gold text-black font-semibold px-6 sm:px-8 glow-gold min-h-[48px] whitespace-nowrap" 
              disabled={!email.includes('@') || orgInviteMutation.isPending || (!emailValidationMutation.data?.isValid && !emailSuggestion)}
            >
              {orgInviteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                "Get Your Invitation"
              )}
            </Button>
          </div>
          <p className="text-sm md:text-base text-muted-foreground mb-6 px-2">
            ❓ <span 
              onClick={() => setIsDialogOpen(true)}
              className="underline cursor-pointer hover:text-primary"
            >
              Not from Listed Org?
            </span>{" "}
            <span 
              onClick={() => {
                const waitlistSection = document.getElementById('waitlist');
                if (waitlistSection) {
                  waitlistSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="underline cursor-pointer hover:text-accent"
            >
              Join Weekly Waitlist
            </span>
          </p>
        </div>
        </div>

        {/* University and Company Logos Scroll */}
        <div className="overflow-hidden w-screen relative left-1/2 -translate-x-1/2">
          <div className="text-xs md:text-sm text-muted-foreground mb-1 font-medium text-center px-4 md:px-6">
            Used by Professionals, Alumni & Students from
          </div>
          <div className="w-full">
            <HorizontalScroller items={topUniversities} />
            <HorizontalScroller items={topCompanies} />
          </div>
        </div>

        {/* Hero Highlights (ImpactStrip + Notice Banner) */}
        <div className="px-4 md:px-6">
          <HeroHighlights />
        </div>
      </div>

      {/* Invitation Dialog */}
      <InvitationDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
      />
    </section>
  );
};

export default HeroSection;