import { ImpactStrip } from "./ImpactStrip";
import { NoticeBanner } from "./NoticeBanner";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroHighlights = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <ImpactStrip />
      {isMobile ? (
        <NoticeBanner />
      ) : (
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 max-w-3xl mx-auto my-12 shadow-lg">
          <div className="flex items-center justify-center mb-3">
            <span className="text-2xl mr-2">⚡</span>
            <span className="font-semibold text-lg text-primary">Real-time, high-intent connections</span>
          </div>
          <p className="text-lg text-center mb-2">
            Meet your future <span className="font-bold text-accent">co-founder</span>, <span className="font-bold text-accent">investor</span>, <span className="font-bold text-accent">mentor</span>, <span className="font-bold text-accent">employer</span>, or <span className="font-bold text-accent">life partner</span>—faster than ever.
          </p>
          <p className="text-base text-muted-foreground text-center">
            Matching your <span className="font-semibold text-primary">intent</span>, <span className="font-semibold text-primary">urgency</span>, and <span className="font-semibold text-primary">expectation</span>—just like thousands already have.
          </p>
        </div>
      )}
    </>
  );
};

export default HeroHighlights; 