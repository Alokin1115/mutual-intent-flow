const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-border/20">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent glow-primary">
            My MutualBook
          </h2>
          <p className="text-xl text-muted-foreground mt-4 font-medium">
            Do Incredible Things Together.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
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
        <div className="flex justify-center gap-6 mb-12">
          <a 
            href="#" 
            className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all duration-300"
          >
            <span className="text-xl">𝕏</span>
          </a>
          <a 
            href="#" 
            className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all duration-300"
          >
            <span className="text-xl">💼</span>
          </a>
          <a 
            href="#" 
            className="w-12 h-12 rounded-full glass-effect flex items-center justify-center hover:border-primary/50 hover:scale-110 transition-all duration-300"
          >
            <span className="text-xl">📧</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-muted-foreground">
          <p>&copy; 2024 My MutualBook. All rights reserved.</p>
          <p className="mt-2">Elite connections. Real results. Zero randomness.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;