import { useState, useEffect, useRef } from "react";

const ImpactStrip = () => {
  const cards = [
    {
      value: '5,000+',
      color: 'text-primary',
      label: 'Verified Professionals Joined This Week',
    },
    {
      value: '4,847',
      color: 'text-accent',
      label: 'Confirmed Collaborations Last Week',
    },
    {
      value: '9.5 hrs',
      color: 'text-primary',
      label: 'Average From First Call to Collab',
    },
    {
      value: '0',
      color: 'text-accent',
      label: 'Randomness | 20+ Use Cases',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const scrollThreshold = useRef(0);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll-triggered card advancement for mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      
      // Only trigger if section is in view
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView && scrollDelta > 50) {
          scrollThreshold.current += scrollDelta;
          
          // Trigger slide change after accumulated scroll threshold
          if (scrollThreshold.current > 150) {
            if (currentScrollY > lastScrollY.current) {
              // Scrolling down - next card
              setCurrentIndex(prev => (prev + 1) % cards.length);
            } else {
              // Scrolling up - previous card
              setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
            }
            scrollThreshold.current = 0;
          }
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, cards.length]);

  // Auto-advance cards every 4 seconds (only when not mobile)
  useEffect(() => {
    if (isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cards.length, isMobile]);

  return (
    <section ref={sectionRef} className="w-full py-12 px-0">
      <div className="max-w-6xl mx-auto">
        {/* Desktop Layout - Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`glass-effect rounded-xl p-6 text-center transition-all duration-500 hover:scale-105 animate-fade-in ${card.color}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl font-bold mb-3">{card.value}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Layout - Carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`w-full flex-shrink-0 glass-effect p-8 text-center ${card.color}`}
                >
                  <div className="text-5xl font-bold mb-4">{card.value}</div>
                  <div className="text-base text-muted-foreground leading-relaxed">{card.label}</div>
                </div>
              ))}
            </div>
            
            {/* Progress indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ImpactStrip }; 