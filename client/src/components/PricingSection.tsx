import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollActiveCard } from "@/hooks/use-scroll-active-card";

const pricingTiers = [
  {
    name: "Free Fridays",
    price: "$0",
    tagline: "For students",
    buttonText: "Secure Early",
    features: [
      "Only 40 calls/month",
      "Limited Friday access",
      "Supports only Personal Usecases",
      "Limited to Unversity",
      "Student verification",
    ],
    highlight: false,
  },
  {
    name: "Tier I",
    price: "$30/mo",
    tagline: "Serious Intent",
    buttonText: "Subscribe",
    features: [
      "Unlimited access",
      "Advanced filters",
      "Priority matching",
      "Audio/Video calls",
      "Profile verification",
    ],
    highlight: false,
  },
  {
    name: "Tier II",
    price: "$50/mo",
    tagline: "Urgent Intents",
    buttonText: "Subscribe",
    features: [
      "Everything in Tier I",
      "Instant matching",
      "Premium support",
      "Analytics dashboard",
      "Success manager",
    ],
    highlight: true,
  },
  {
    name: "Tier III",
    price: "$120/yr",
    tagline: "Exclusive Member",
    buttonText: "Join Now",
    features: [
      "Everything in Tier II",
      "Annual savings",
      "Exclusive events",
      "Direct founder access",
      "Early beta features",
    ],
    highlight: false,
  },
  {
    name: "Golden Class",
    price: "$1,000–$10,000",
    tagline: "Gated Access",
    buttonText: "Apply",
    features: [
      "Top 0.01% professionals",
      "Millionaire network access",
      "Closed-door invitations",
      "White-glove service",
      "Beta access & benefits",
    ],
    highlight: false,
    premium: true,
  },
];

const PricingSection = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isMobile = useIsMobile();
  const scrollActiveIdx = useScrollActiveCard(cardRefs.current);

  // Focus the active button on mobile
  useEffect(() => {
    if (
      isMobile &&
      scrollActiveIdx !== null &&
      buttonRefs.current[scrollActiveIdx] &&
      !pricingTiers[scrollActiveIdx].premium // Only focus if not premium
    ) {
      buttonRefs.current[scrollActiveIdx]?.focus();
    }
  }, [isMobile, scrollActiveIdx]);

  return (
    <section className="py-16 md:py-20 px-4 md:px-6" id="pricing">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">
            You'll Make It Back In <span className="text-accent">One Call</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 px-2">
            Choose your level of commitment
          </p>
          <p className="text-base md:text-lg font-medium text-primary px-2">
            "If one call leads to your future partner, it pays for itself 100x."
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`relative transition-all duration-300 hover:scale-105 group ${
                // Auto-highlight (expand) on mobile scroll for non-premium
                isMobile && scrollActiveIdx === index && !tier.premium
                  ? "glow-primary scale-105 z-10 border-primary/70"
                  : tier.highlight
                    ? "border-primary/50 glow-primary scale-105"
                    : tier.premium
                      ? "border-accent/50 gradient-gold hover:glow-accent"
                      : "glass-effect border-border/20 hover:border-primary/50 hover:glow-primary"
              }`}
            >
              {tier.highlight && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 gradient-primary text-black font-semibold">
                  Most Popular
                </Badge>
              )}

              {tier.premium && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-black font-semibold">
                  Exclusive
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle
                  className={`text-lg md:text-xl lg:text-2xl font-bold ${tier.premium ? "text-black" : ""}`}
                >
                  {tier.name}
                </CardTitle>
                <div
                  className={`text-2xl md:text-3xl font-bold mb-2 ${tier.premium ? "text-black" : "text-primary"}`}
                >
                  {tier.price}
                </div>
                <CardDescription
                  className={`text-sm md:text-base ${tier.premium ? "text-black/70" : ""}`}
                >
                  {tier.tagline}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 md:space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`flex items-start text-xs md:text-sm ${tier.premium ? "text-black" : "text-muted-foreground"}`}
                    >
                      <span className="text-green-400 mr-2 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  ref={(el) => (buttonRefs.current[index] = el)}
                  aria-current={
                    isMobile && scrollActiveIdx === index ? "true" : undefined
                  }
                  tabIndex={isMobile && scrollActiveIdx === index ? 0 : -1}
                  variant={
                    isMobile && scrollActiveIdx === index && !tier.premium
                      ? "active"
                      : undefined
                  }
                  className={`w-full font-semibold transition-all duration-300 ${
                    isMobile && scrollActiveIdx === index && !tier.premium
                      ? "gradient-primary text-black glow-primary shadow-lg border-2 border-primary"
                      : tier.highlight
                        ? "gradient-primary text-black glow-primary group-hover:shadow-xl group-hover:scale-105"
                        : tier.premium
                          ? "bg-black text-accent group-hover:bg-accent group-hover:text-black group-hover:glow-accent group-hover:shadow-xl group-hover:scale-105"
                          : "glass-effect border-primary/20 group-hover:gradient-primary group-hover:text-black group-hover:glow-primary group-hover:shadow-xl group-hover:scale-105"
                  }`}
                >
                  {tier.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
