const steps = [
  {
    number: "1",
    title: "Secure your Access",
    description: "Only real, high-signal individuals pass through.",
    icon: "🔐"
  },
  {
    number: "2", 
    title: "Set Your Emotional Filters",
    description: "Intent, urgency, expectation tags. All in seconds.",
    icon: "🎯"
  },
  {
    number: "3",
    title: "Go Live",
    description: "Real-time calls with action ready individuals, no messaging delays.",
    icon: "📹"
  },
  {
    number: "4",
    title: "Save Mutuals", 
    description: "Build a personal list for the long game.",
    icon: "💾"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6" id="how-it-works">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">How It Works</h2>
          <p className="text-lg md:text-xl text-muted-foreground">Simple. Fast. Effective.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="text-center group relative"
              >
                {/* Step Number */}
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full gradient-primary flex items-center justify-center text-lg md:text-2xl font-bold text-black group-hover:glow-primary transition-all duration-300">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="text-3xl md:text-4xl mb-4 group-hover:animate-bounce">{step.icon}</div>
                
                {/* Content */}
                <h3 className="text-lg md:text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors px-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors px-2">
                  {step.description}
                </p>
                
                {/* Connector Arrow - Mobile (bottom) */}
                {index < steps.length - 1 && (
                  <div className="sm:hidden flex justify-center mt-6 mb-2">
                    <div className="text-primary text-2xl animate-pulse">↓</div>
                  </div>
                )}
                
                {/* Connector Arrow - Desktop (right) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 xl:-right-8">
                    <div className="text-primary text-xl xl:text-2xl animate-pulse">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;