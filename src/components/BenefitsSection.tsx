import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const benefitsSections = [
  {
    title: "Personal Goals",
    subtitle: "Found love, romance partners, internships, scholarships, roommates",
    testimonials: [
      "💕 Met my co-founder at Stanford through MutualBook - now we're building the next unicorn!",
      "🏠 Found the perfect roommate in SF who shares my entrepreneurial mindset",
      "💍 Engaged to someone I met on MutualBook - both MIT grads, now building together",
      "🎓 Got a full scholarship to Harvard through a connection made here"
    ]
  },
  {
    title: "Professional Collaborations", 
    subtitle: "Made startup cofounders, investor deals, jobs, sponsorships, go-to-market partners",
    testimonials: [
      "🚀 Closed $2M seed round with investor I met in first week on MutualBook",
      "💼 Got my dream job at Meta through a connection made here",
      "🎬 Our short film is now OSCAR nominated - all thanks to the team I found here",
      "🤝 Found my perfect go-to-market partner, now doing $1M ARR together"
    ]
  },
  {
    title: "Professional Growth",
    subtitle: "Mentorships, exec roles, freelance, international relocations, 10X job switch", 
    testimonials: [
      "📈 10X'd my salary moving from startup to FAANG through MutualBook connection",
      "🌍 Relocated to Singapore with a C-level role through network here",
      "💰 Closed 6-figure consulting contract in my first month",
      "🎯 Found my mentor who helped me become VP of Engineering"
    ]
  }
];

const BenefitsSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === benefitsSections[currentSection].testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSection]);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-8">
            Benefits Achieved with <span className="text-accent">Few Dollars</span>
          </h2>
          <p className="text-xl text-muted-foreground">Real success stories from our members</p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {benefitsSections.map((section, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSection(index);
                setCurrentTestimonial(0);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                currentSection === index 
                  ? 'gradient-primary text-black glow-primary' 
                  : 'glass-effect text-white hover:border-primary/50'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect border-primary/20 glow-primary">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-primary mb-4">
                {benefitsSections[currentSection].title}
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                {benefitsSections[currentSection].subtitle}
              </p>
            </CardHeader>
            <CardContent>
              {/* Testimonial Carousel */}
              <div className="bg-secondary/20 rounded-xl p-8 text-center min-h-[120px] flex items-center justify-center">
                <p className="text-lg font-medium animate-pulse-slow">
                  {benefitsSections[currentSection].testimonials[currentTestimonial]}
                </p>
              </div>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {benefitsSections[currentSection].testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonial === index ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Stats */}
          <div className="mt-16 text-center glass-effect rounded-xl p-8">
            <p className="text-lg font-semibold text-accent mb-2">
              Every week, MutualBook facilitates thousands of intent-driven real-life partnerships
            </p>
            <p className="text-muted-foreground">
              Collaborations, deals, hirings—from startups and scholarships to weddings and manufacturing deals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;