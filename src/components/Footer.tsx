const Footer = () => {
  return (
    <footer className="py-12 sm:py-20 px-4 sm:px-6 border-t border-border/20">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-primary">
            My MutualBook
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mt-4 font-medium px-2">
            Do Incredible Things Together.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 sm:mb-12">
          <a href="#about" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors py-2 px-3 min-h-[44px] flex items-center">
            About
          </a>
          <a href="#careers" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors py-2 px-3 min-h-[44px] flex items-center">
            Careers
          </a>
          <a href="#privacy" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors py-2 px-3 min-h-[44px] flex items-center">
            Privacy
          </a>
          <a href="#terms" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors py-2 px-3 min-h-[44px] flex items-center">
            Terms
          </a>
          <a href="#contact" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors py-2 px-3 min-h-[44px] flex items-center">
            Contact
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
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
        <div className="text-xs sm:text-sm text-muted-foreground px-2">
          <p>&copy; 2024 My MutualBook. All rights reserved.</p>
          <p className="mt-2">Elite connections. Real results. Zero randomness.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;