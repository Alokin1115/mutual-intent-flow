const ProblemSection = () => {
  return (
    <section className="py-20 px-3 md:px-12 lg:px-24" id="about">
      <div className="container mx-auto !px-0 !mx-0 text-center">
        <h2 className="text-5xl font-bold mb-16">
          Why <span className="text-red-400">LinkedIn, X, and DMs</span> Fail the Ambitious
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-3xl md:mx-auto">
          <div className="glass-effect rounded-xl p-8 border border-red-500/20">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-3">You scroll. They distract.</h3>
            <p className="text-muted-foreground">Endless feeds designed to keep you scrolling, not achieving.</p>
          </div>
          
          <div className="glass-effect rounded-xl p-8 border border-red-500/20">
            <div className="text-6xl mb-4">👤</div>
            <h3 className="text-xl font-semibold mb-3">Profiles, not people.</h3>
            <p className="text-muted-foreground">Comments, not conversations. Surface-level connections.</p>
          </div>
          
          <div className="glass-effect rounded-xl p-8 border border-red-500/20">
            <div className="text-6xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-3">Cold emails, ghosted replies.</h3>
            <p className="text-muted-foreground">Endless "let's connect" messages that lead nowhere.</p>
          </div>
          
          <div className="glass-effect rounded-xl p-8 border border-red-500/20">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold mb-3">Built for attention. Not action.</h3>
            <p className="text-muted-foreground">Attention-seeking content & people, not real builders.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;