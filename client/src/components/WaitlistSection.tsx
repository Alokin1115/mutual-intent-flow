import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const WaitlistSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedinX: "",
    reason: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // console.log("Waitlist submission:", formData); // Removed for production
  };

  return (
    <section className="py-16 md:py-20 px-4 md:px-6" id="waitlist">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">Waitlist Wild Card</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            For Non-Org Members Who Belong With The Elite
          </p>
        </div>

        <Card className="relative overflow-hidden md:max-w-2xl md:mx-auto">
          {/* Dark Gold Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-orange-600/20"></div>
          
          <CardHeader className="relative text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-accent mb-4 px-2">
              Think You Belong Here?
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-foreground/80 px-2">
              If you are not from the listed org and think you belong here with elites & high achievers, 
              then pre-register to get your invitation link this week.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="glass-effect border-accent/30 focus:border-accent min-h-[48px] text-base"
                    placeholder="Your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="glass-effect border-accent/30 focus:border-accent min-h-[48px] text-base"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">LinkedIn/X Link</label>
                <Input
                  type="url"
                  value={formData.linkedinX}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedinX: e.target.value }))}
                  className="glass-effect border-accent/30 focus:border-accent min-h-[48px] text-base"
                  placeholder="https://linkedin.com/in/yourprofile"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Why do you belong here?</label>
                <Textarea
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  className="glass-effect border-accent/30 focus:border-accent min-h-[120px] text-base"
                  placeholder="Tell us about your achievements, ambitions, and why you belong with the elite..."
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full gradient-gold text-black font-bold py-4 text-base sm:text-lg glow-gold hover:scale-105 transition-all duration-300 min-h-[56px]"
              >
                Join the Weekly Waitlist
              </Button>
            </form>

            {/* Weekly Curation Notice */}
            <div className="mt-8 text-center">
              <div className="inline-block bg-red-500/20 border border-red-400/30 rounded-xl px-6 py-3">
                <p className="text-red-300 font-semibold">
                  ⚠️ Only &gt;1% get invited each Friday
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Curation Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center glass-effect rounded-xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-accent mb-2">2,847</div>
            <div className="text-xs md:text-sm text-muted-foreground">Applications This Week</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">28</div>
            <div className="text-xs md:text-sm text-muted-foreground">Approved Last Friday</div>
          </div>
          <div className="text-center glass-effect rounded-xl p-4 md:p-6">
            <div className="text-2xl md:text-3xl font-bold text-accent mb-2">1.2%</div>
            <div className="text-xs md:text-sm text-muted-foreground">Acceptance Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;