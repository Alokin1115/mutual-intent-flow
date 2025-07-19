import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pricingTiers = [
  {
    name: "Free Fridays",
    price: "$0",
    tagline: "For students", 
    buttonText: "Join Free",
    features: ["Limited Friday access", "Basic matching", "Community chat", "Student verification"],
    highlight: false
  },
  {
    name: "Tier I",
    price: "$30/mo",
    tagline: "Serious Intent",
    buttonText: "Subscribe", 
    features: ["Unlimited access", "Advanced filters", "Priority matching", "Video calls", "Profile verification"],
    highlight: false
  },
  {
    name: "Tier II", 
    price: "$50/mo",
    tagline: "Urgent Intents",
    buttonText: "Subscribe",
    features: ["Everything in Tier I", "Instant matching", "Premium support", "Analytics dashboard", "Success manager"],
    highlight: true
  },
  {
    name: "Tier III",
    price: "$120/yr", 
    tagline: "Exclusive Member",
    buttonText: "Join Now",
    features: ["Everything in Tier II", "Annual savings", "Exclusive events", "Direct founder access", "Early beta features"],
    highlight: false
  },
  {
    name: "Golden Class",
    price: "$1,000–$10,000",
    tagline: "Invite Only",
    buttonText: "Apply",
    features: ["Top 0.01% professionals", "Billionaire network access", "Closed-door invitations", "White-glove service", "Custom matching"],
    highlight: false,
    premium: true
  }
];

const PricingSection = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6" id="pricing">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 px-2">
            You'll Make It Back In <span className="text-accent">One Call</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 px-2">Choose your level of commitment</p>
          <p className="text-base sm:text-lg font-medium text-primary px-2">
            "If one call leads to your future partner, it pays for itself 100x."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-300 sm:hover:scale-105 ${
                tier.highlight 
                  ? 'border-primary/50 glow-primary sm:scale-105' 
                  : tier.premium 
                    ? 'border-accent/50 gradient-gold' 
                    : 'glass-effect border-border/20'
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
                <CardTitle className={`text-lg sm:text-xl lg:text-2xl font-bold ${tier.premium ? 'text-black' : ''}`}>
                  {tier.name}
                </CardTitle>
                <div className={`text-2xl sm:text-3xl font-bold mb-2 ${tier.premium ? 'text-black' : 'text-primary'}`}>
                  {tier.price}
                </div>
                <CardDescription className={`text-sm sm:text-base ${tier.premium ? 'text-black/70' : ''}`}>
                  {tier.tagline}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 sm:space-y-3 mb-6">
                  {tier.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className={`flex items-start text-xs sm:text-sm ${tier.premium ? 'text-black' : 'text-muted-foreground'}`}
                    >
                      <span className="text-green-400 mr-2 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full font-semibold text-sm sm:text-base min-h-[44px] ${
                    tier.highlight 
                      ? 'gradient-primary text-black glow-primary' 
                      : tier.premium
                        ? 'bg-black text-accent hover:bg-black/80'
                        : 'glass-effect border-primary/20 hover:border-primary/50'
                  }`}
                >
                  {tier.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Golden Class Details */}
        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
          <Card className="gradient-gold border-accent/30">
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl font-bold text-black mb-4 px-2">
                Golden Class (Premium Experience, Invite Only)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-black">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">$1,000/year & $10,000/year</h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li>• Priority call to top 0.01% professionals & executives</li>
                    <li>• Closed-door invitations with founders, executives & billionaires</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">Exclusive Benefits</h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li>• First-access to beta features & benefits</li>
                    <li>• Increased visibility & fully customizable filtering</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;