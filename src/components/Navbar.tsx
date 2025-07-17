import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-effect py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className={`text-xl font-bold transition-all duration-300 ${
          scrolled ? 'glow-primary' : ''
        }`}>
          My MutualBook
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
          <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How It Works</a>
          <a href="#whos-here" className="text-sm hover:text-primary transition-colors">Who's Here</a>
          <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
          <a href="#waitlist" className="text-sm hover:text-primary transition-colors">Waitlist</a>
        </div>
        
        <Button className="gradient-gold text-black font-semibold px-6 py-2 rounded-full glow-gold" disabled>
          Get Invite
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;