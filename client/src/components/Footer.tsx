const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-border/20 relative overflow-x-hidden">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 relative z-20">
          <div className="relative flex items-center justify-center">
            {/* Torch/flashlight glow background for logo */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
              <div className="w-[200px] h-[100px] sm:w-[300px] sm:h-[150px] md:w-[400px] md:h-[200px] rounded-full opacity-40" style={{
                background: 'radial-gradient(circle at center, rgba(236,72,153,0.3) 0%, rgba(245,158,11,0.1) 40%, rgba(0,0,0,0) 70%)',
                filter: 'blur(20px)'
              }}></div>
            </div>
            {/* Main logo with effects */}
            <img 
              src="/Mutualbook complete logo.png" 
              alt="MutualBook" 
              className="relative z-30 h-16 md:h-20 lg:h-24 object-contain opacity-90"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(236,72,153,0.5)) drop-shadow(0 0 10px rgba(245,158,11,0.3))'
              }}
            />
            {/* Blurred shadow logo for extra glow */}
            <img 
              src="/Mutualbook complete logo.png" 
              alt="MutualBook" 
              className="absolute inset-0 opacity-20 blur-[15px] select-none pointer-events-none z-10 h-16 md:h-20 lg:h-24 object-contain"
            />
          </div>
          <p className="text-xl text-muted-foreground mt-4 font-medium">
            Do Incredible Things Together.
          </p>
        </div>
        {/* Links */}
        <div className="flex justify-center gap-8 mb-12 relative z-20">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#careers" className="text-muted-foreground hover:text-primary transition-colors">
            Careers
          </a>
          <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">
            Privacy
          </a>
          <a href="#terms" className="text-muted-foreground hover:text-primary transition-colors">
            Terms
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>
        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-12 relative z-20">
          <a 
            href="#" 
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-effect flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all duration-300 min-h-[48px] min-w-[48px]"
            aria-label="Follow us on X"
          >
            <span className="text-lg sm:text-xl">𝕏</span>
          </a>
          <a 
            href="#" 
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-effect flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all duration-300 min-h-[48px] min-w-[48px]"
            aria-label="Connect on LinkedIn"
          >
            <span className="text-lg sm:text-xl">💼</span>
          </a>
          <a 
            href="#" 
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-effect flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all duration-300 min-h-[48px] min-w-[48px]"
            aria-label="Contact us via email"
          >
            <span className="text-lg sm:text-xl">📧</span>
          </a>
        </div>
        {/* Copyright */}
        <div className="text-sm text-muted-foreground relative z-20">
          <p>&copy; 2025 My MutualBook. All rights reserved.</p>
          <p className="mt-2">Built with ❤️ in San Francisco</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;