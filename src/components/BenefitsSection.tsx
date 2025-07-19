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
    <section className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 px-2">
            Benefits Achieved with <span className="text-accent">Few Dollars</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground px-2">Real success stories from our members</p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-2">
          {benefitsSections.map((section, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSection(index);
                setCurrentTestimonial(0);
              }}
              className={`px-4 sm:px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base min-h-[44px] flex items-center justify-center ${
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
              <CardTitle className="text-2xl sm:text-3xl font-bold text-primary mb-4 px-2">
                {benefitsSections[currentSection].title}
              </CardTitle>
              <p className="text-base sm:text-lg text-muted-foreground px-2">
                {benefitsSections[currentSection].subtitle}
              </p>
            </CardHeader>
            <CardContent>
              {/* Vertically Stacked Testimonials */}
              <div className="flex flex-col space-y-4">
                {benefitsSections[currentSection].testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-secondary/20 rounded-xl p-4 sm:p-6 text-center transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:bg-secondary/30 cursor-pointer"
                  >
                    <p className="text-base sm:text-lg font-medium">
                      {testimonial}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Stats */}
          <div className="mt-12 sm:mt-16 text-center glass-effect rounded-xl p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-accent mb-2">
              Every week, MutualBook facilitates thousands of intent-driven real-life partnerships
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              Collaborations, deals, hirings—from startups and scholarships to weddings and manufacturing deals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;