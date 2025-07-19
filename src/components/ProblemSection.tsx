const ProblemSection = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6" id="about">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 px-2">
          Why <span className="text-red-400">LinkedIn, X, and DMs</span> Fail the Ambitious
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="glass-effect rounded-xl p-6 sm:p-8 border border-red-500/20">
            <div className="text-4xl sm:text-6xl mb-4">📱</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">You scroll. They distract.</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Endless feeds designed to keep you scrolling, not achieving.</p>
          </div>
          
          <div className="glass-effect rounded-xl p-6 sm:p-8 border border-red-500/20">
            <div className="text-4xl sm:text-6xl mb-4">👤</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Profiles, not people.</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Comments, not conversations. Surface-level connections.</p>
          </div>
          
          <div className="glass-effect rounded-xl p-6 sm:p-8 border border-red-500/20">
            <div className="text-4xl sm:text-6xl mb-4">📧</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Cold emails, ghosted replies.</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Endless "let's connect" messages that lead nowhere.</p>
          </div>
          
          <div className="glass-effect rounded-xl p-6 sm:p-8 border border-red-500/20">
            <div className="text-4xl sm:text-6xl mb-4">🎭</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">Built for attention. Not action.</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Attention-seeking content & people, not real builders.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;