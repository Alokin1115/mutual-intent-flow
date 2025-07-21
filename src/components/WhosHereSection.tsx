import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef, useEffect } from "react";

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


const startupSectors = [
  "SaaS", "FoodTech", "AgriTech", "PropTech", "InsurTech", "MarTech", "TravelTech", "SportsTech", "GovTech", "RetailTech",
  "SpaceTech", "Robotics", "3D Printing", "Wearables", "IoT", "eCommerce", "D2C Brands", "Marketplace", "Crowdfunding", "Gaming"
];

const modernEconomySectors = [
  "Influencer", "Creator Economy", "eSports", "Podcasting", "YouTube", "Streaming", "Remote Work", "Gig Economy", "Digital Nomads", "NFTs",
  "Web3", "Crypto Trading", "Online Courses", "Social Commerce", "Subscription Boxes", "Micro SaaS", "No-Code", "Dropshipping", "Virtual Events", "Online Fitness", "Personal Branding"
];

const WhosHereSection = () => {
  return (
    <section className="py-20 px-0" id="whos-here">
      <div className="w-full !px-0 !mx-0">
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

        {/* Modern Economy and Startup Sectors */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">Modern Economy and Startup Sectors</h3>
          <div className="flex flex-col gap-[2px]">
            <IndustriesScroller industries={startupSectors} />
            <IndustriesScroller industries={industries} reverse />
            <IndustriesScroller industries={modernEconomySectors} />
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
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
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

// --- IndustriesScroller component for auto-scroll and drag ---
const IndustriesScroller = ({ industries, compact, reverse }: { industries: string[], compact?: boolean, reverse?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll effect with seamless infinite loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let paused = false;
    function startAutoScroll() {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = setInterval(() => {
        if (paused) return;
        if (!container) return;
        const scrollWidth = container.scrollWidth / 2;
        if (reverse) {
          if (container.scrollLeft <= 0) {
            container.scrollLeft = scrollWidth;
          } else {
            container.scrollLeft -= 1.5;
          }
          if (container.scrollLeft < 0) container.scrollLeft = scrollWidth;
        } else {
          if (container.scrollLeft >= scrollWidth) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += 1.5;
          }
        }
      }, 16);
    }
    startAutoScroll();
    // Pause on mouse enter/touch
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
    container.addEventListener('touchstart', pause);
    container.addEventListener('touchend', resume);
    return () => {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
      container.removeEventListener('touchstart', pause);
      container.removeEventListener('touchend', resume);
    };
  }, [reverse, industries]);

  // Drag-to-scroll handlers
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - container.offsetLeft;
    dragScrollLeft.current = container.scrollLeft;
    container.style.cursor = 'grabbing';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    container.scrollLeft = dragScrollLeft.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    const container = containerRef.current;
    if (container) container.style.cursor = '';
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    isDragging.current = true;
    dragStartX.current = e.touches[0].pageX - container.offsetLeft;
    dragScrollLeft.current = container.scrollLeft;
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    const container = containerRef.current;
    if (!container) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    container.scrollLeft = dragScrollLeft.current - walk;
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-nowrap overflow-x-auto px-0 py-2 max-w-full cursor-grab active:cursor-grabbing gap-3`}
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE 10+
      }}
      tabIndex={0}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <style>{`
        .industries-scroller::-webkit-scrollbar { display: none; }
      `}</style>
      {[...industries, ...industries].map((industry, index) => (
        <Badge
          key={index}
          variant="outline"
          className={`glass-effect hover:border-accent/50 hover:text-accent transition-all duration-300 whitespace-nowrap px-4 py-2`}
        >
          {industry}
        </Badge>
      ))}
    </div>
  );
};

export default WhosHereSection;