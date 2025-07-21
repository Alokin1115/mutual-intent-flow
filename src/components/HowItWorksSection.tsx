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
    <section className="py-20 px-3 md:px-12 lg:px-24" id="how-it-works">
      <div className="container mx-auto !px-0 !mx-0">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-8">How It Works</h2>
          <p className="text-xl text-muted-foreground">Simple. Fast. Effective.</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                {/* Step Number */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-black group-hover:glow-primary transition-all duration-300">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="text-4xl mb-4 group-hover:animate-bounce">{step.icon}</div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {step.description}
                </p>
                
                {/* Connector Arrow (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <div className="text-primary text-2xl animate-pulse">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Flow Connector for Mobile */}
          <div className="lg:hidden flex justify-center mt-8">
            <div className="text-primary text-4xl animate-bounce">↓</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;