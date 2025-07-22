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

const FloatingShape = ({ delay = 0, duration = 20, size = 60, className = "" }) => (
  <div 
    className={`absolute rounded-full opacity-20 ${className}`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      animation: `float ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

const GlassmorphismBenefitsSection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === benefitsSections[currentSection].testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSection]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        {/* Floating Geometric Shapes */}
        <FloatingShape delay={0} duration={25} size={80} className="top-10 left-10 bg-gradient-to-r from-primary to-accent" />
        <FloatingShape delay={3} duration={30} size={120} className="top-1/4 right-20 bg-gradient-to-r from-accent to-secondary" />
        <FloatingShape delay={6} duration={20} size={60} className="bottom-1/3 left-1/4 bg-gradient-to-r from-secondary to-primary" />
        <FloatingShape delay={9} duration={35} size={100} className="bottom-20 right-10 bg-gradient-to-r from-primary to-accent" />
        <FloatingShape delay={12} duration={28} size={40} className="top-1/2 left-1/3 bg-gradient-to-r from-accent to-primary" />
        
        {/* Dynamic Gradient Mesh */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x / 10}% ${mousePosition.y / 10}%, rgba(var(--primary), 0.1), transparent 50%)`
          }}
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 px-2">
            Glassmorphism Design: Benefits Achieved with <span className="text-accent">Few Dollars</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground px-2">Real success stories from our members</p>
        </div>

        {/* Section Tabs with Glass Effect */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-2">
          {benefitsSections.map((section, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSection(index);
                setCurrentTestimonial(0);
              }}
              className={`px-4 sm:px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base min-h-[44px] flex items-center justify-center backdrop-blur-md border ${
                currentSection === index 
                  ? 'bg-primary/20 text-primary border-primary/50 shadow-lg shadow-primary/25' 
                  : 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-primary/30'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {/* Section Header Glass Card */}
          <div className="text-center mb-12 backdrop-blur-xl bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4 px-2">
              {benefitsSections[currentSection].title}
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              {benefitsSections[currentSection].subtitle}
            </p>
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-20 blur-sm animate-pulse"></div>
          </div>

          {/* Glassmorphism Cards Grid */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-2">
            {benefitsSections[currentSection].testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group relative backdrop-blur-xl bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/15 hover:shadow-3xl cursor-pointer ${
                  index === currentTestimonial ? 'ring-2 ring-accent/50 bg-white/15' : ''
                }`}
                style={{
                  transform: `perspective(1000px) rotateX(${(mousePosition.y - 500) * 0.01}deg) rotateY(${(mousePosition.x - 500) * 0.01}deg)`,
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-spin-slow blur-sm"></div>
                
                {/* Floating Quote Icon */}
                <div className="relative mb-4">
                  <div className="text-5xl sm:text-6xl text-accent/60 floating-animation">
                    "
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <p className="text-base sm:text-lg font-medium leading-relaxed mb-4">
                    {testimonial}
                  </p>
                  
                  {/* Testimonial Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Story #{index + 1}
                    </div>
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-accent shadow-lg shadow-accent/50 animate-pulse' : 'bg-muted'
                    }`}></div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Weekly Stats Glass Card */}
          <div className="mt-16 sm:mt-20 text-center backdrop-blur-xl bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-accent/5 animate-pulse"></div>
            
            <div className="relative z-10">
              <p className="text-base sm:text-lg font-semibold text-accent mb-2">
                Every week, MutualBook facilitates thousands of intent-driven real-life partnerships
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                Collaborations, deals, hirings—from startups and scholarships to weddings and manufacturing deals.
              </p>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full opacity-30 floating-animation"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-accent to-secondary rounded-full opacity-20 floating-animation" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes floating-animation {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .floating-animation {
            animation: floating-animation 3s ease-in-out infinite;
          }
          
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `
      }} />
    </section>
  );
};

export default GlassmorphismBenefitsSection;