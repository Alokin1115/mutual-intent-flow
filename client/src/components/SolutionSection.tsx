import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollActiveCard } from "@/hooks/use-scroll-active-card";

const solutionCards = [
  {
    title: "Aspiration",
    description: "Only serious builders, founders, action-seekers and high-intent doers.",
    icon: "🎯",
    detail: "Curated community of verified professionals from top institutions who are ready to take action, not just talk."
  },
  {
    title: "Accountability", 
    description: "No flaking. No ghosting. 2-way rating system.",
    icon: "⚖️",
    detail: "Mutual accountability ensures everyone follows through. Rate and be rated to maintain quality standards."
  },
  {
    title: "Adaptability",
    description: "20+ use cases from romance to legal co-pilots.",
    icon: "🔄",
    detail: "Whether you need a co-founder, investor, mentor, life partner, or expert advisor - we've got you covered."
  },
  {
    title: "Alignment",
    description: "Emotional filters for expectations + urgency + intent.",
    icon: "🎪",
    detail: "Smart matching based on your actual needs, timeline, and emotional compatibility - not just keywords."
  },
  {
    title: "Agility",
    description: "Skip the chat. Go straight to the real call.",
    icon: "⚡",
    detail: "No more endless messaging. Connect directly through real-time audio/video calls for immediate action."
  },
  {
    title: "Autonomy",
    description: "No AI algorithms. You decide who matters.",
    icon: "🎛️",
    detail: "You're in complete control. No black-box algorithms deciding your connections. Pure human choice."
  }
];

const SolutionSection = () => {
  const isMobile = useIsMobile();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Use scroll-based activation on mobile
  const scrollActiveIdx = useScrollActiveCard(cardRefs.current);

  useEffect(() => {
    if (isMobile) {
      setHoveredCard(scrollActiveIdx ?? null);
    }
  }, [isMobile, scrollActiveIdx]);

  // Reset hoveredCard on desktop
  useEffect(() => {
    if (!isMobile) setHoveredCard(null);
  }, [isMobile]);

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 px-2 text-[44px]">
            Why <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">MutualBook</span> Works
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 px-2">The 6 A's Framework</p>
          <p className="text-base sm:text-lg font-medium text-accent px-2">
            "It's like YC Demo Day + Bumble + Zoom, all driven by bold ambition & intents."
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {solutionCards.map((card, index) => (
            <Card 
              key={index}
              ref={el => cardRefs.current[index] = el}
              data-idx={index}
              className={`glass-effect border-primary/20 cursor-pointer transition-all duration-300 sm:hover:scale-105 hover:border-primary/50 min-h-[280px] sm:min-h-[320px] ${
                hoveredCard === index ? 'glow-primary' : ''
              }`}
              onMouseEnter={() => !isMobile && setHoveredCard(index)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
              onClick={() => !isMobile && setHoveredCard(hoveredCard === index ? null : index)}
            >
              <CardHeader className="pb-4">
                <div className="text-4xl sm:text-5xl mb-4">{card.icon}</div>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base lg:text-lg">
                  {card.description}
                </CardDescription>
              </CardHeader>
              {(hoveredCard === index) && (
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {card.detail}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;