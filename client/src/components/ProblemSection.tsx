const ProblemSection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6" id="about">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 leading-tight">
          Why <span className="text-red-400">LinkedIn, X, and DMs</span> Fail
          the Ambitious
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="glass-effect rounded-xl p-6 md:p-8 border border-red-500/20">
            <div className="text-4xl md:text-5xl mb-4">📱</div>
            <h3 className="text-lg md:text-xl font-semibold mb-3">
              You scroll. They distract.
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Endless feeds designed to keep you scrolling, not achieving.
            </p>
          </div>

          <div className="glass-effect rounded-xl p-6 md:p-8 border border-red-500/20">
            <div className="text-4xl md:text-5xl mb-4">👤</div>
            <h3 className="text-lg md:text-xl font-semibold mb-3">
              Profiles, not action-ready people.
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Comments, not conversations. Surface-level connections.
            </p>
          </div>

          <div className="glass-effect rounded-xl p-6 md:p-8 border border-red-500/20">
            <div className="text-4xl md:text-5xl mb-4">📧</div>
            <h3 className="text-lg md:text-xl font-semibold mb-3">
              Cold emails, ghosted replies.
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Endless "let's connect" messages that lead nowhere.
            </p>
          </div>

          <div className="glass-effect rounded-xl p-6 md:p-8 border border-red-500/20">
            <div className="text-4xl md:text-5xl mb-4">🎭</div>
            <h3 className="text-lg md:text-xl font-semibold mb-3">
              Built for attention. Not action.
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Attention-seeking content & people, not real builders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
