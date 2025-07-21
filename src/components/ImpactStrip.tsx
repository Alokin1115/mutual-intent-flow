import { useState, useEffect, useRef } from "react";

const ImpactStrip = () => {
  const cards = [
    {
      value: '5,000+',
      color: 'text-primary',
      label: 'Verified Professionals Joined This Week',
    },
    {
      value: '4,847',
      color: 'text-accent',
      label: 'Confirmed Collaborations Last Week',
    },
    {
      value: '9.5 hrs',
      color: 'text-primary',
      label: 'Average From First Call to Collab',
    },
    {
      value: '0',
      color: 'text-accent',
      label: 'Randomness | 20+ Use Cases',
    },
  ];
  const cardHeight = 120;
  const gap = 16;
  const visibleCount = 3;
  const [dragOffset, setDragOffset] = useState(0); // in px
  const [startY, setStartY] = useState(null);
  const [lastOffset, setLastOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const containerRef = useRef(null);

  // Clamp dragOffset to valid range
  const maxOffset = (cards.length - 1) * (cardHeight + gap);
  const clampedOffset = Math.max(0, Math.min(dragOffset, maxOffset));

  // IntersectionObserver to check if the strip is centered (loosened threshold)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleIntersect = (entries) => {
      const entry = entries[0];
      const rect = entry.boundingClientRect;
      const viewportHeight = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const lowerBound = viewportHeight * 0.1;
      const upperBound = viewportHeight * 0.9;
      setIsCentered(center > lowerBound && center < upperBound);
    };
    const observer = new window.IntersectionObserver(handleIntersect, {
      threshold: [0, 1],
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Prevent page scroll while dragging, only if not at top or bottom and only if centered
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleTouchMove = (e) => {
      if (dragging && isCentered) {
        const atTop = clampedOffset <= 0;
        const atBottom = clampedOffset >= maxOffset;
        if ((atTop && (startY - e.touches[0].clientY) < 0) || (atBottom && (startY - e.touches[0].clientY) > 0)) {
          return;
        }
        e.preventDefault();
      }
    };
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [dragging, clampedOffset, maxOffset, startY, isCentered]);

  // Touch handlers
  const handleTouchStart = (e) => {
    if (!isCentered) return;
    if (e.touches.length === 1) {
      setStartY(e.touches[0].clientY);
      setDragging(true);
    }
  };
  const handleTouchMove = (e) => {
    if (!isCentered) return;
    if (startY !== null && e.touches.length === 1) {
      const delta = startY - e.touches[0].clientY;
      setDragOffset(Math.max(0, Math.min(lastOffset + delta, maxOffset)));
    }
  };
  const handleTouchEnd = () => {
    setLastOffset(clampedOffset);
    setStartY(null);
    setDragging(false);
  };

  return (
    <section className="w-full flex justify-center">
      <div
        ref={containerRef}
        className="relative h-[50vh] max-w-xs w-full my-8 overflow-hidden touch-pan-y"
        style={{ overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {cards.map((card, i) => {
          const position = i - clampedOffset / (cardHeight + gap);
          if (position < -1 || position > visibleCount - 0.5) return null;
          const translateY = position * 40;
          const scale = 1 - Math.abs(position) * 0.12;
          const opacity = 1 - Math.abs(position) * 0.5;
          return (
            <div
              key={i}
              className={`absolute left-0 right-0 mx-auto rounded-xl p-6 text-center glass-effect shadow-xl transition-all duration-300 ${card.color}`}
              style={{
                top: 0,
                width: '100%',
                height: `${cardHeight}px`,
                marginBottom: `${gap}px`,
                transform: `translateY(${translateY}px) scale(${scale})`,
                zIndex: cards.length - i,
                opacity,
                pointerEvents: opacity < 0.1 ? 'none' : 'auto',
              }}
            >
              <div className="text-3xl font-bold mb-2">{card.value}</div>
              <div className="text-sm text-muted-foreground">{card.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { ImpactStrip }; 