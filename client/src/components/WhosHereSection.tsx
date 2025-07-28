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
  { title: "Tech Executives", icon: "💼", color: "bg-indigo-500/20 text-indigo-300" },
  { title: "Investment Bankers", icon: "💰", color: "bg-emerald-500/20 text-emerald-300" },
  { title: "Venture Capitalists", icon: "📈", color: "bg-cyan-500/20 text-cyan-300" },
  { title: "AI Researchers", icon: "🤖", color: "bg-violet-500/20 text-violet-300" },
  { title: "Biotech Scientists", icon: "🧬", color: "bg-teal-500/20 text-teal-300" },
  { title: "Data Scientists", icon: "📊", color: "bg-rose-500/20 text-rose-300" },
  { title: "Product Managers", icon: "📱", color: "bg-sky-500/20 text-sky-300" },
  { title: "UX Designers", icon: "🎨", color: "bg-fuchsia-500/20 text-fuchsia-300" },
  { title: "Software Engineers", icon: "💻", color: "bg-slate-500/20 text-slate-300" },
  { title: "Marketing Directors", icon: "📢", color: "bg-amber-500/20 text-amber-300" },
  { title: "Sales Executives", icon: "🎯", color: "bg-lime-500/20 text-lime-300" },
  { title: "Legal Partners", icon: "⚖️", color: "bg-stone-500/20 text-stone-300" },
  { title: "Consulting Partners", icon: "📋", color: "bg-neutral-500/20 text-neutral-300" },
  { title: "Medical Doctors", icon: "👨‍⚕️", color: "bg-red-500/20 text-red-300" },
  { title: "Academic Professors", icon: "🎓", color: "bg-blue-600/20 text-blue-400" },
  { title: "Creative Directors", icon: "🎭", color: "bg-purple-600/20 text-purple-400" },
  { title: "Financial Analysts", icon: "📈", color: "bg-green-600/20 text-green-400" },
  { title: "Operations Managers", icon: "⚙️", color: "bg-yellow-600/20 text-yellow-400" },
  { title: "Human Resources", icon: "👥", color: "bg-pink-600/20 text-pink-400" },
  { title: "Supply Chain", icon: "📦", color: "bg-orange-600/20 text-orange-400" },
  { title: "Architects", icon: "🏗️", color: "bg-indigo-600/20 text-indigo-400" },
  { title: "Chefs", icon: "👨‍🍳", color: "bg-red-600/20 text-red-400" },
  { title: "Artists", icon: "🎨", color: "bg-purple-700/20 text-purple-500" },
  { title: "Musicians", icon: "🎵", color: "bg-pink-700/20 text-pink-500" },
  { title: "Authors", icon: "✍️", color: "bg-emerald-600/20 text-emerald-400" },
  { title: "Journalists", icon: "📰", color: "bg-blue-700/20 text-blue-500" },
  { title: "Politicians", icon: "🏛️", color: "bg-gray-600/20 text-gray-400" },
  { title: "Diplomats", icon: "🤝", color: "bg-teal-600/20 text-teal-400" },
  { title: "Military Officers", icon: "🎖️", color: "bg-green-700/20 text-green-500" },
  { title: "Pilots", icon: "✈️", color: "bg-sky-600/20 text-sky-400" },
  { title: "Lawyers", icon: "⚖️", color: "bg-stone-600/20 text-stone-400" },
  { title: "Psychologists", icon: "🧠", color: "bg-violet-600/20 text-violet-400" },
  { title: "Dentists", icon: "🦷", color: "bg-cyan-600/20 text-cyan-400" },
  { title: "Pharmacists", icon: "💊", color: "bg-rose-600/20 text-rose-400" },
  { title: "Nurses", icon: "👩‍⚕️", color: "bg-red-700/20 text-red-500" },
  { title: "Teachers", icon: "👨‍🏫", color: "bg-blue-800/20 text-blue-600" },
  { title: "Social Workers", icon: "🤗", color: "bg-green-800/20 text-green-600" },
  { title: "Environmentalists", icon: "🌱", color: "bg-emerald-700/20 text-emerald-500" },
  { title: "Scientists", icon: "🔬", color: "bg-purple-800/20 text-purple-600" },
  { title: "Engineers", icon: "⚡", color: "bg-yellow-700/20 text-yellow-500" },
  { title: "Designers", icon: "🎨", color: "bg-pink-800/20 text-pink-600" },
  { title: "Entrepreneurs", icon: "💡", color: "bg-orange-700/20 text-orange-500" },
  { title: "Investors", icon: "📊", color: "bg-teal-700/20 text-teal-500" },
  { title: "Consultants", icon: "💼", color: "bg-gray-700/20 text-gray-500" },
  { title: "Researchers", icon: "🔍", color: "bg-indigo-700/20 text-indigo-500" },
  { title: "Analysts", icon: "📈", color: "bg-cyan-700/20 text-cyan-500" },
  { title: "Managers", icon: "👔", color: "bg-slate-600/20 text-slate-400" },
  { title: "Directors", icon: "🎬", color: "bg-fuchsia-600/20 text-fuchsia-400" },
  { title: "Executives", icon: "🏢", color: "bg-neutral-600/20 text-neutral-400" },
  { title: "Leaders", icon: "👑", color: "bg-amber-600/20 text-amber-400" },
  { title: "Innovators", icon: "💫", color: "bg-lime-600/20 text-lime-400" },
  { title: "Visionaries", icon: "🔮", color: "bg-violet-700/20 text-violet-500" },
  { title: "Pioneers", icon: "🚀", color: "bg-rose-700/20 text-rose-500" },
  { title: "Trailblazers", icon: "🌟", color: "bg-sky-700/20 text-sky-500" }
];

const industries = [
  { name: "AI/ML", icon: "🤖" },
  { name: "Biotech", icon: "🧬" },
  { name: "FinTech", icon: "💳" },
  { name: "EdTech", icon: "📚" },
  { name: "HealthTech", icon: "🏥" },
  { name: "CleanTech", icon: "🌱" },
  { name: "Entertainment", icon: "🎬" },
  { name: "Fashion", icon: "👗" },
  { name: "Real Estate", icon: "🏠" },
  { name: "Consulting", icon: "📋" },
  { name: "Investment ", icon: "💰" },
  { name: "Venture Capital", icon: "📈" },
  { name: "Private Equity", icon: "💼" },
  { name: "Legal", icon: "⚖️" },
  { name: "Medicine", icon: "🏥" },
  { name: "Academia", icon: "🎓" }
];


const startupSectors = [
  { name: "SaaS", icon: "☁️" },
  { name: "FoodTech", icon: "🍕" },
  { name: "AgriTech", icon: "🌾" },
  { name: "PropTech", icon: "🏠" },
  { name: "InsurTech", icon: "🛡️" },
  { name: "MarTech", icon: "📈" },
  { name: "TravelTech", icon: "✈️" },
  { name: "SportsTech", icon: "⚽" },
  { name: "GovTech", icon: "🏛️" },
  { name: "RetailTech", icon: "🛒" },
  { name: "SpaceTech", icon: "🚀" },
  { name: "Robotics", icon: "🤖" },
  { name: "3D Printing", icon: "🖨️" },
  { name: "Wearables", icon: "⌚" },
  { name: "IoT", icon: "🔗" },
  { name: "eCommerce", icon: "🛍️" },
  { name: "D2C Brands", icon: "🎯" },
  { name: "Marketplace", icon: "🏪" },
  { name: "Crowdfunding", icon: "💰" },
  { name: "Gaming", icon: "🎮" }
];

const modernEconomySectors = [
  { name: "Influencer", icon: "⭐" },
  { name: "Creator Economy", icon: "🎨" },
  { name: "eSports", icon: "🏆" },
  { name: "Podcasting", icon: "🎙️" },
  { name: "YouTube", icon: "📺" },
  { name: "Streaming", icon: "📡" },
  { name: "Remote Work", icon: "🏠" },
  { name: "Gig Economy", icon: "🚗" },
  { name: "Digital Nomads", icon: "🌍" },
  { name: "NFTs", icon: "🖼️" },
  { name: "Web3", icon: "🌐" },
  { name: "Crypto Trading", icon: "₿" },
  { name: "Online Courses", icon: "📚" },
  { name: "Social Commerce", icon: "💬" },
  { name: "Subscription Boxes", icon: "📦" },
  { name: "Micro SaaS", icon: "🔧" },
  { name: "No-Code", icon: "🚫" },
  { name: "Dropshipping", icon: "📦" },
  { name: "Virtual Events", icon: "🎪" },
  { name: "Online Fitness", icon: "💪" },
  { name: "Personal Branding", icon: "👤" }
];



const WhosHereSection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6" id="whos-here">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">Who's Here</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto">
            "Neurosurgeons to quantum physicists, Travelers to Fashion Designers, 
            Hollywood screenwriters to startup unicorn founders, crypto whales to Nobel Peace Prize nominees…"
          </p>
        </div>

        {/* Additional Professionals Auto-Scroller */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-primary">More Elite Professionals</h3>
          <div className="flex flex-col gap-[2px] -mx-4 md:-mx-6">
            <ProfessionsScroller professions={professions.slice(8, 24)} />
            <ProfessionsScroller professions={professions.slice(24, 40)} reverse />
            <ProfessionsScroller professions={professions.slice(40, 56)} />
          </div>
        </div>

        {/* Modern Economy and Startup Sectors */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-primary">Modern Economy and Startup Sectors</h3>
          <div className="flex flex-col gap-[2px] -mx-4 md:-mx-6">
            <SectorsScroller sectors={startupSectors} />
            <SectorsScroller sectors={industries} reverse />
            <SectorsScroller sectors={modernEconomySectors} />
          </div>
        </div>

        

        {/* Avatars/Portraits Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8 text-primary">Real Members</h3>
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

// --- ProfessionsScroller component for auto-scroll and drag ---
const ProfessionsScroller = ({ professions, reverse }: { professions: { title: string, icon: string, color: string }[], reverse?: boolean }) => {
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
  }, [reverse, professions]);

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
        .professions-scroller::-webkit-scrollbar { display: none; }
      `}</style>
      {[...professions, ...professions].map((profession, index) => (
        <Card key={index} className="glass-effect border-primary/20 hover:scale-105 transition-all duration-300 hover:glow-primary min-w-[140px] md:min-w-[200px]">
          <CardContent className="p-2 md:p-4 text-center">
            <div className="text-2xl md:text-3xl mb-1 md:mb-2">{profession.icon}</div>
            <Badge className={`${profession.color} font-medium text-xs md:text-sm px-2 py-1`}>
              {profession.title}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// --- SectorsScroller component for auto-scroll and drag with icons ---
const SectorsScroller = ({ sectors, reverse }: { sectors: { name: string, icon: string }[], reverse?: boolean }) => {
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
  }, [reverse, sectors]);

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
        .sectors-scroller::-webkit-scrollbar { display: none; }
      `}</style>
      {[...sectors, ...sectors].map((sector, index) => (
        <Card key={index} className="glass-effect border-primary/20 hover:scale-105 transition-all duration-300 hover:glow-primary min-w-[120px] md:min-w-[180px]">
          <CardContent className="p-2 md:p-4 text-center">
            <div className="text-xl md:text-2xl mb-1 md:mb-2">{sector.icon}</div>
            <Badge className="bg-primary/20 text-primary font-medium text-xs md:text-sm px-2 py-1">
              {sector.name}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};



export default WhosHereSection;