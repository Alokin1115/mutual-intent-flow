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

const testimonials = [
  {
    name: "Naval Ravikant",
    role: "AngelList Founder • Tech Philosopher",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    quote: "You have one life. The most important thing is to surround yourself with people who are playing the long game. MutualBook gets this—it's not about networking, it's about finding your tribe of builders, thinkers, and doers who understand that real wealth comes from deep relationships, not shallow connections."
  },
  {
    name: "Sam Altman",
    role: "OpenAI CEO • Golden Member",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    quote: "The future belongs to those who can build and execute at the intersection of technology and human connection. MutualBook is creating something special—a platform where the world's most ambitious minds can find their perfect collaborators. This is exactly what the next generation of founders and builders need."
  },
  {
    name: "Marc Andreessen",
    role: "Andreessen Horowitz • Co-founder",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    quote: "The best companies are built by teams that share a deep understanding and mutual respect. MutualBook's approach to connecting like-minded professionals is exactly what the startup ecosystem needs."
  }
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

        {/* Additional Professionals Auto-Scroller */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">More Elite Professionals</h3>
          <div className="flex flex-col gap-[2px]">
            <ProfessionsScroller professions={professions.slice(8, 24)} />
            <ProfessionsScroller professions={professions.slice(24, 40)} reverse />
            <ProfessionsScroller professions={professions.slice(40, 56)} />
          </div>
        </div>

        {/* Modern Economy and Startup Sectors */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-primary">Modern Economy and Startup Sectors</h3>
          <div className="flex flex-col gap-[2px]">
            <SectorsScroller sectors={startupSectors} />
            <SectorsScroller sectors={industries} reverse />
            <SectorsScroller sectors={modernEconomySectors} />
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

        {/* Testimonials Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              TRUSTED BY
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              THE SELECTED
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              BACKED BY RESULTS
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              6 months of ghost mode operation with only golden-tier elites. 
              The top 0.001% have validated our vision. Now expanding to the public.
            </p>
          </div>
          
          {/* Modern Testimonial Cards */}
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="relative">
                  {/* Card with Tab */}
                  <div className="bg-white rounded-2xl shadow-xl relative overflow-hidden">
                    {/* Tab Handle */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="w-16 h-6 bg-gray-200 rounded-t-lg flex items-center justify-center">
                        <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Navigation Dots */}
                    <div className="absolute top-4 right-4 flex space-x-1">
                      {testimonials.map((_, dotIndex) => (
                        <div 
                          key={dotIndex} 
                          className={`w-2 h-2 rounded-full ${
                            dotIndex === index ? 'bg-gray-800' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-6 pt-8">
                      {/* Company/Platform Name */}
                      <div className="text-sm font-bold text-gray-800 mb-4">
                        MUTUALBOOK
                      </div>
                      
                      {/* Quote Icon */}
                      <div className="text-4xl text-gray-800 mb-4">
                        "
                      </div>
                      
                      {/* Testimonial Text */}
                      <div className="text-gray-700 leading-relaxed mb-6 text-sm">
                        {testimonial.quote}
                      </div>
                      
                      {/* Author Section */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 text-sm">
                              {testimonial.name}
                            </div>
                            <div className="text-gray-600 text-xs">
                              {testimonial.role}
                            </div>
                          </div>
                        </div>
                        
                        {/* LinkedIn Icon */}
                        <div className="text-blue-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Background Cards for Layering Effect */}
                  <div className="absolute -top-2 -left-2 w-full h-full bg-white rounded-2xl opacity-20 -z-10"></div>
                  <div className="absolute -top-1 -left-1 w-full h-full bg-white rounded-2xl opacity-40 -z-20"></div>
                </div>
              ))}
            </div>
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