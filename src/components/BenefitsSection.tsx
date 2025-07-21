import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
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

const AUTO_SCROLL_INTERVAL = 5000;

const BenefitsSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteracting = useRef(false);

  // Auto-scroll between sections
  useEffect(() => {
    if (isUserInteracting.current) return;
    autoScrollRef.current = setInterval(() => {
      setCurrentSection((prev) => (prev === benefitsSections.length - 1 ? 0 : prev + 1));
      setCurrentTestimonial(0);
    }, AUTO_SCROLL_INTERVAL);
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [currentSection]);

  // Pause auto-scroll on user interaction
  const handleTabClick = (index: number) => {
    isUserInteracting.current = true;
    setCurrentSection(index);
    setCurrentTestimonial(0);
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    setTimeout(() => {
      isUserInteracting.current = false;
    }, AUTO_SCROLL_INTERVAL * 2);
  };

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleTabClick((currentSection + 1) % benefitsSections.length),
    onSwipedRight: () => handleTabClick((currentSection - 1 + benefitsSections.length) % benefitsSections.length),
    trackMouse: true,
  });

  // Testimonial carousel auto-scroll
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === benefitsSections[currentSection].testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(testimonialInterval);
  }, [currentSection]);

  return (
    <section className="py-20 px-3 md:px-12 lg:px-24">
      <div className="container mx-auto !px-0 !mx-0">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-8">
            Benefits Achieved with <span className="text-accent">Few Dollars</span>
          </h2>
          <p className="text-xl text-muted-foreground">Real success stories from our members</p>
        </div>

        {/* Section Tabs - Responsive */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12"
          role="tablist"
          aria-label="Benefit Sections"
        >
          {benefitsSections.map((section, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={currentSection === index}
              aria-controls={`section-panel-${index}`}
              tabIndex={currentSection === index ? 0 : -1}
              onClick={() => handleTabClick(index)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                currentSection === index
                  ? "gradient-primary text-black glow-primary"
                  : "glass-effect text-white hover:border-primary/50"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content Area - Swipeable on mobile */}
        <div
          {...swipeHandlers}
          className="w-full md:max-w-4xl md:mx-auto transition-all duration-500"
          id={`section-panel-${currentSection}`}
          role="tabpanel"
          aria-labelledby={`section-tab-${currentSection}`}
        >
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
              <div className="bg-secondary/20 rounded-xl p-8 text-center min-h-[120px] flex items-center justify-center transition-all duration-500">
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                      currentTestimonial === index ? "bg-primary" : "bg-muted"
                    }`}
                    aria-label={`Show testimonial ${index + 1}`}
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