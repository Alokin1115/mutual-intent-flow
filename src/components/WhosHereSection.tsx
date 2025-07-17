import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const professions = [
  { title: "Neurosurgeons", icon: "🧠", color: "bg-blue-500/20 text-blue-300" },
  { title: "Quantum Physicists", icon: "⚛️", color: "bg-purple-500/20 text-purple-300" },
  { title: "Startup Founders", icon: "🚀", color: "bg-green-500/20 text-green-300" },
  { title: "Hollywood Screenwriters", icon: "🎬", color: "bg-yellow-500/20 text-yellow-300" },
  { title: "Fashion Designers", icon: "👗", color: "bg-pink-500/20 text-pink-300" },
  { title: "Crypto Whales", icon: "🐋", color: "bg-orange-500/20 text-orange-300" },
  { title: "Nobel Nominees", icon: "🏆", color: "bg-gold-500/20 text-yellow-200" },
  { title: "Tech Executives", icon: "💼", color: "bg-indigo-500/20 text-indigo-300" }
];

const industries = [
  "AI/ML", "Biotech", "FinTech", "EdTech", "HealthTech", "CleanTech", 
  "Entertainment", "Fashion", "Real Estate", "Consulting", "Investment Banking",
  "Venture Capital", "Private Equity", "Legal", "Medicine", "Academia"
];

const educationTags = [
  "Harvard MBA", "Stanford CS", "MIT PhD", "Wharton Finance", "Yale Law",
  "IIT Bombay", "Oxford PPE", "Cambridge Engineering", "Berkeley EECS",
  "Columbia Journalism", "NYU Stern", "INSEAD", "LBS", "Caltech Physics"
];

const WhosHereSection = () => {
  return (
    <section className="py-20 px-6" id="whos-here">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-8">Who's Here</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            "Neurosurgeons to quantum physicists, Travelers to Fashion Designers, 
            Hollywood screenwriters to startup unicorn founders, crypto whales to Nobel Peace Prize nominees…"
          </p>
        </div>

        {/* Professions Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">Professions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {professions.map((profession, index) => (
              <Card key={index} className="glass-effect border-primary/20 hover:scale-105 transition-all duration-300 hover:glow-primary">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{profession.icon}</div>
                  <Badge className={`${profession.color} font-medium`}>
                    {profession.title}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">Industries</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {industries.map((industry, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="px-4 py-2 glass-effect hover:border-accent/50 hover:text-accent transition-all duration-300"
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>

        {/* Education Tags */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">Education</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {educationTags.map((tag, index) => (
              <Badge 
                key={index} 
                className="px-4 py-2 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-all duration-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Avatars/Portraits Section */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">Real Members</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                <div className="w-full h-full rounded-full bg-muted/10 flex items-center justify-center text-2xl">
                  {['👨‍💼', '👩‍🔬', '👨‍💻', '👩‍⚕️', '👨‍🎨', '👩‍💼'][index % 6]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Affirmation */}
        <div className="mt-16 text-center">
          <Card className="glass-effect border-primary/20 max-w-2xl mx-auto glow-primary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                Status Affirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-accent">
                MutualBook empowers elite, high-achieving professionals who have the freedom of choice 
                to take a leapfrog action to do greater things together.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhosHereSection;