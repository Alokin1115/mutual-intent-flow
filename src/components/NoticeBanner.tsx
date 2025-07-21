import React from "react";

const NoticeBanner = () => (
  <div className="flex flex-col items-center bg-white/5 border-l-4 border-accent rounded-xl p-4 px-2 mb-16 shadow-md max-w-xs mx-auto">
    <div className="text-3xl mb-2">⚡</div>
    <div className="text-base font-semibold text-center mb-1">
      Matching your <span className="text-accent font-bold">intent</span>, <span className="text-accent font-bold">urgency</span> & <span className="text-accent font-bold">expectation</span>
    </div>
    <div className="text-sm text-muted-foreground text-center mb-1">
      Real-time calls with your future
    </div>
    <div className="text-sm text-center">
      <span className="font-bold text-primary">co-founder</span>, <span className="font-bold text-primary">investor</span>, <span className="font-bold text-primary">mentor</span>, <span className="font-bold text-primary">employer</span> or <span className="font-bold text-primary">life partner</span>
    </div>
    <div className="text-xs text-muted-foreground text-center mt-2">
      Like thousands already have.
    </div>
  </div>
);

export { NoticeBanner }; 