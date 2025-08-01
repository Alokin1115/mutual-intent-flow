import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-effect py-3">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className={`transition-all duration-300 ${
          scrolled ? 'glow-primary' : ''
        }`}>
          <img 
            src="/Mutualbook complete logo.png" 
            alt="MutualBook" 
            className="h-8 md:h-10 w-auto object-contain"
          />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
          <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How It Works</a>
          <a href="#whos-here" className="text-sm hover:text-primary transition-colors">Who's Here</a>
          <a href="#pricing" className="text-sm hover:text-primary transition-colors">Pricing</a>
          <a href="#waitlist" className="text-sm hover:text-primary transition-colors">Waitlist</a>
        </div>
        
        {/* Desktop CTA Button */}
        <Button className="hidden md:block gradient-gold text-black font-semibold px-6 py-2 rounded-full glow-gold" disabled>
          Get Invite
        </Button>
        
        {/* Mobile Get Invite Button */}
        <Button className="md:hidden gradient-gold text-black font-semibold px-4 py-2 rounded-full glow-gold text-sm" disabled>
          Get Invite
        </Button>
      </div>
      
      
    </nav>
  );
};

export default Navbar;