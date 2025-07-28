import { useState, useEffect } from "react";

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

const TimelineBenefitsSection = () => {
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
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 px-2">
            Timeline Design: Benefits Achieved with <span className="text-accent">Few Dollars</span>
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

        {/* Timeline Container */}
        <div className="max-w-6xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 via-primary to-primary/30 sm:transform sm:-translate-x-1/2">
            {/* Progress indicator */}
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent to-primary transition-all duration-1000"
              style={{ 
                height: `${((currentTestimonial + 1) / benefitsSections[currentSection].testimonials.length) * 100}%` 
              }}
            />
          </div>

          {/* Section Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute left-4 sm:left-1/2 w-6 h-6 bg-accent rounded-full border-4 border-background sm:transform sm:-translate-x-1/2 animate-pulse"></div>
            <div className="ml-16 sm:ml-0">
              <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                {benefitsSections[currentSection].title}
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground">
                {benefitsSections[currentSection].subtitle}
              </p>
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-8 sm:space-y-12">
            {benefitsSections[currentSection].testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 transform ${
                  index <= currentTestimonial ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-50'
                } ${
                  index % 2 === 0 
                    ? 'ml-16 sm:ml-0 sm:pr-8 sm:text-right' 
                    : 'ml-16 sm:ml-auto sm:pl-8 sm:w-1/2'
                }`}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-[-3.25rem] sm:left-auto ${
                  index % 2 === 0 ? 'sm:right-[-1.5rem]' : 'sm:left-[-1.5rem]'
                } top-6 w-4 h-4 rounded-full border-4 border-background transition-all duration-500 ${
                  index === currentTestimonial 
                    ? 'bg-accent scale-125 shadow-lg shadow-accent/50' 
                    : index < currentTestimonial 
                      ? 'bg-primary' 
                      : 'bg-muted'
                }`}>
                  {index === currentTestimonial && (
                    <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75"></div>
                  )}
                </div>

                {/* Connection Line */}
                <div className={`absolute left-[-2.75rem] sm:left-auto ${
                  index % 2 === 0 ? 'sm:right-[-1rem]' : 'sm:left-[-1rem]'
                } top-8 w-8 sm:w-12 h-0.5 transition-all duration-500 ${
                  index <= currentTestimonial ? 'bg-primary' : 'bg-muted'
                }`}></div>

                {/* Card */}
                <div className={`glass-effect rounded-xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                  index === currentTestimonial 
                    ? 'border-accent/50 glow-accent bg-accent/5' 
                    : 'border-primary/20 hover:border-primary/40'
                }`}>
                  {/* Quote Icon */}
                  <div className={`text-4xl mb-4 ${
                    index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'
                  }`}>
                    <span className="text-accent opacity-60">"</span>
                  </div>
                  
                  <p className="text-base sm:text-lg font-medium leading-relaxed">
                    {testimonial}
                  </p>
                  
                  {/* Timeline Position Indicator */}
                  <div className={`mt-4 text-sm text-muted-foreground ${
                    index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'
                  }`}>
                    Success Story #{index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Stats */}
          <div className="mt-16 sm:mt-20 text-center relative">
            <div className="absolute left-4 sm:left-1/2 w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-full border-4 border-background sm:transform sm:-translate-x-1/2 animate-pulse shadow-lg"></div>
            <div className="ml-16 sm:ml-0 glass-effect rounded-xl p-6 sm:p-8 border-accent/30">
              <p className="text-base sm:text-lg font-semibold text-accent mb-2">
                Every week, MutualBook facilitates thousands of intent-driven real-life partnerships
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                Collaborations, deals, hirings—from startups and scholarships to weddings and manufacturing deals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineBenefitsSection;