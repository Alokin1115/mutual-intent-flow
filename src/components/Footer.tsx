const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-border/20 relative overflow-x-hidden">
      <div className="container mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 relative z-20">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-primary">
            My MutualBook
          </h2>
          <p className="text-xl text-muted-foreground mt-4 font-medium">
            Do Incredible Things Together.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 relative z-20">
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
        <div className="text-sm text-muted-foreground relative z-20">
          <p>&copy; 2024 My MutualBook. All rights reserved.</p>
          <p className="mt-2">Elite connections. Real results. Zero randomness.</p>
        </div>

        {/* Large Footer Text */}
        <div className="relative mt-20 mb-10 flex flex-col items-center justify-center w-full max-w-[100vw]">
          {/* Torch/flashlight glow background */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <div className="w-[350px] h-[150px] sm:w-[500px] sm:h-[200px] md:w-[700px] md:h-[300px] lg:w-[800px] lg:h-[400px] rounded-full opacity-60" style={{
              background: 'radial-gradient(circle at center, rgba(236,72,153,0.3) 0%, rgba(245,158,11,0.1) 40%, rgba(0,0,0,0) 70%)',
              filter: 'blur(40px)'
            }}></div>
          </div>
          
          {/* Main gradient text */}
          <h3 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl lg:text-[120px] xl:text-[150px] font-bold leading-none tracking-tighter relative z-30 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent select-none w-full max-w-[100vw] text-center whitespace-normal break-words">
            My MutualBook
          </h3>
          {/* Blurred shadow text for extra glow */}
          <h3 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl lg:text-[120px] xl:text-[150px] font-bold leading-none tracking-tighter opacity-20 blur-[30px] absolute inset-0 text-primary select-none pointer-events-none z-10 w-full max-w-[100vw] text-center whitespace-normal break-words">
            My MutualBook
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;