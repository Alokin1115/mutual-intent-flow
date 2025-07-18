import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-8">
            Why <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">MutualBook</span> Works
          </h2>
          <p className="text-xl text-muted-foreground mb-8">The 6 A's Framework</p>
          <p className="text-lg font-medium text-accent">
            "It's like YC Demo Day + Bumble + Zoom, all driven by bold ambition & intents."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {solutionCards.map((card, index) => (
            <Card 
              key={index}
              className={`glass-effect border-primary/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary/50 ${
                hoveredCard === index ? 'glow-primary' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader>
                <div className="text-4xl mb-4">{card.icon}</div>
                <CardTitle className="text-2xl font-bold text-primary">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {card.description}
                </CardDescription>
              </CardHeader>
              {hoveredCard === index && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
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