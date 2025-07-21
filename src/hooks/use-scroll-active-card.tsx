import { useEffect, useState } from "react";

/**
 * useScrollActiveCard
 * @param refs Array of refs to card elements
 * @param options Optional: { rootMargin, threshold }
 * @returns index of the card that is currently most visible/closest to viewport center
 */
export function useScrollActiveCard(
  refs: (HTMLElement | null)[],
  options?: { rootMargin?: string; threshold?: number }
) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!refs.length) return;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let minDiff = Infinity;
          let idx = null;
          const viewportHeight = window.innerHeight;
          const viewportCenter = viewportHeight / 2;
          refs.forEach((ref, i) => {
            if (ref) {
              const rect = ref.getBoundingClientRect();
              const cardCenter = rect.top + rect.height / 2;
              // Only consider cards that are at least partially visible
              if (rect.bottom > 0 && rect.top < viewportHeight) {
                const diff = Math.abs(cardCenter - viewportCenter);
                if (diff < minDiff) {
                  minDiff = diff;
                  idx = i;
                }
              }
            }
          });
          setActiveIdx(idx);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [refs]);

  return activeIdx;
} 