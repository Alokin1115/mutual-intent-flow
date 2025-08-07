import { ImpactStrip } from "./ImpactStrip";
import { NoticeBanner } from "./NoticeBanner";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroHighlights = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <ImpactStrip />
      {isMobile ? (
        <div className="px-4 py-6 mx-4 my-6 bg-gradient-to-br from-primary/10 via-background to-accent/10 border border-primary/20 rounded-xl">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center bg-primary/10 rounded-full px-3 py-2">
                <span className="text-xl mr-2">⚡</span>
                <span className="font-bold text-sm text-primary">Real-Time High Intent Mutual Calls</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-base font-medium text-foreground leading-relaxed">
                Matching your <span className="font-bold text-primary">intent</span>, <span className="font-bold text-primary">urgency</span> & <span className="font-bold text-primary">expectation</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Real-time calls with your future co-founder, investor, mentor, employer, client or life partner
              </p>
              <p className="text-xs text-muted-foreground">
                Like thousands already have.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-primary/20 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 max-w-5xl mx-auto my-6 md:my-12 shadow-xl md:shadow-2xl">
          {/* Floating background elements */}
          <div className="absolute top-4 right-6 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 left-6 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          
          {/* Header with enhanced styling */}
          <div className="flex items-center justify-center mb-8 relative z-10">
            <div className="flex items-center bg-primary/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 shadow-lg border border-primary/20">
              <span className="text-2xl md:text-3xl mr-2 md:mr-3 animate-bounce">⚡</span>
              <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Real-time High Intent Mutual Calls
              </span>
            </div>
          </div>
          
          {/* Main content with enhanced typography */}
          <div className="space-y-6 relative z-10">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-medium leading-relaxed text-foreground">
                Meet your future{" "}
                <span className="relative inline-block">
                  <span className="font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent px-2 py-1 rounded-lg">
                    co-founder
                  </span>
                  <div className="absolute inset-0 bg-accent/10 rounded-lg -z-10 animate-pulse"></div>
                </span>
                ,{" "}
                <span className="relative inline-block">
                  <span className="font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent px-2 py-1 rounded-lg">
                    investor
                  </span>
                  <div className="absolute inset-0 bg-primary/10 rounded-lg -z-10 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                </span>
                ,{" "}
                <span className="relative inline-block">
                  <span className="font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent px-2 py-1 rounded-lg">
                    mentor
                  </span>
                  <div className="absolute inset-0 bg-accent/10 rounded-lg -z-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
                </span>
                ,
              </div>
              <div className="text-xl md:text-2xl font-medium leading-relaxed text-foreground mt-2">
                <span className="relative inline-block">
                  <span className="font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent px-2 py-1 rounded-lg">
                    employer
                  </span>
                  <div className="absolute inset-0 bg-primary/10 rounded-lg -z-10 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
                </span>
                ,{" "}
                <span className="relative inline-block">
                  <span className="font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent px-2 py-1 rounded-lg">
                    client
                  </span>
                  <div className="absolute inset-0 bg-accent/10 rounded-lg -z-10 animate-pulse" style={{ animationDelay: "1.7s" }}></div>
                </span>
                , or{" "}
                <span className="relative inline-block">
                  <span className="font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent px-2 py-1 rounded-lg">
                    life partner
                  </span>
                  <div className="absolute inset-0 bg-accent/10 rounded-lg -z-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
                </span>
                —faster than ever.
              </div>
            </div>
            
            {/* Separator line with glow */}
            <div className="flex justify-center my-8">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent shadow-lg"></div>
            </div>
            
            {/* Supporting text with enhanced highlights */}
            <div className="text-center">
              <div className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Matching your{" "}
                <span className="relative inline-block group">
                  <span className="font-bold text-primary transition-all duration-300 group-hover:scale-110">
                    intent
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </span>
                ,{" "}
                <span className="relative inline-block group">
                  <span className="font-bold text-primary transition-all duration-300 group-hover:scale-110">
                    urgency
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </span>
                , and{" "}
                <span className="relative inline-block group">
                  <span className="font-bold text-primary transition-all duration-300 group-hover:scale-110">
                    expectation
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </span>
                —just like thousands already have.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroHighlights; 