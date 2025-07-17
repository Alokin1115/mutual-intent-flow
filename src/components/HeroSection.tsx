import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const companies = [
  "Google", "Meta", "MIT", "Stanford", "Microsoft", "Nvidia", "Y Combinator", 
  "Fortune 500", "University of Chicago", "Duke", "Northwestern", "UC Berkeley", 
  "Cornell", "Columbia", "Princeton", "Harvard", "Yale", "Caltech", "UPenn", 
  "Johns Hopkins", "Brown", "Dartmouth", "UCLA", "Michigan", "Carnegie Mellon", 
  "Georgia Tech", "IITs", "NITs", "BITS"
];

const rotatingWords = ["Collaboration", "Networking", "Growth"];

const HeroSection = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [email, setEmail] = useState("");

  return (
    <section className="min-h-screen gradient-hero relative overflow-hidden pt-24 pb-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/40 rounded-full blur-lg animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-accent/30 rounded-full blur-xl animate-float" style={{animationDelay: "2s"}}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Top Banner */}
        <Badge className="mb-8 px-6 py-3 text-lg font-medium bg-blue-600/20 text-blue-300 border-blue-400/30 glow-primary">
          🟦 From the World's Top 500 Universities & Companies ✨ Verified
        </Badge>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          Elites' Fast-Track to{" "}
          <span className="gradient-primary bg-clip-text text-transparent inline-block transition-all duration-500">
            {rotatingWords[wordIndex]}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Where the world's most ambitious meet—and get things done.
        </p>

        {/* CTA Area */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex gap-3 mb-4">
            <Input 
              type="email" 
              placeholder="Organization Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-effect text-white placeholder:text-gray-400"
            />
            <Button 
              className="gradient-gold text-black font-semibold px-8 glow-gold" 
              disabled={!email}
            >
              Get Your Invitation
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            ❓ <span className="underline cursor-pointer hover:text-primary">Not from Listed Org?</span>{" "}
            <span className="underline cursor-pointer hover:text-accent">Join Weekly Waitlist</span>
          </p>
        </div>

        {/* Company Logos Scroll */}
        <div className="overflow-hidden mb-16">
          <div className="flex animate-marquee space-x-8 whitespace-nowrap">
            {companies.concat(companies).map((company, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-sm font-medium glass-effect">
                {company}
              </Badge>
            ))}
          </div>
        </div>

        {/* Notice Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 max-w-4xl mx-auto mb-16">
          <p className="text-lg font-medium">
            Real-time calls with your future co-founder, investor, mentor, employer or life partner—matching your intent, urgency, and expectation like thousands already have.
          </p>
        </div>

        {/* Impact Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-sm text-muted-foreground">Verified Professionals Joined This Week</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">4,847</div>
            <div className="text-sm text-muted-foreground">Confirmed Collaborations Last Week</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">9.5 hrs</div>
            <div className="text-sm text-muted-foreground">Average From First Call to Collab</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">0</div>
            <div className="text-sm text-muted-foreground">Randomness | 20+ Use Cases</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;