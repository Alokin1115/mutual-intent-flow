import { useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface HorizontalScrollerProps {
  items: { name: string; logo: string }[];
  reverse?: boolean;
  compact?: boolean;
  className?: string;
}

export const HorizontalScroller = ({ items, reverse, compact, className }: HorizontalScrollerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll effect with seamless infinite loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let paused = false;
    function startAutoScroll() {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = setInterval(() => {
        if (paused) return;
        if (!container) return;
        const scrollWidth = container.scrollWidth / 2;
        if (reverse) {
          if (container.scrollLeft <= 0) {
            container.scrollLeft = scrollWidth;
          } else {
            container.scrollLeft -= 1.5;
          }
          if (container.scrollLeft < 0) container.scrollLeft = scrollWidth;
        } else {
          if (container.scrollLeft >= scrollWidth) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += 1.5;
          }
        }
      }, 16);
    }
    startAutoScroll();
    // Pause on mouse enter/touch
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
    container.addEventListener('touchstart', pause);
    container.addEventListener('touchend', resume);
    return () => {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
      container.removeEventListener('touchstart', pause);
      container.removeEventListener('touchend', resume);
    };
  }, [reverse, items]);

  // Drag-to-scroll handlers
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - container.offsetLeft;
    dragScrollLeft.current = container.scrollLeft;
    container.style.cursor = 'grabbing';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const container = containerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    container.scrollLeft = dragScrollLeft.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    const container = containerRef.current;
    if (container) container.style.cursor = '';
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    isDragging.current = true;
    dragStartX.current = e.touches[0].pageX - container.offsetLeft;
    dragScrollLeft.current = container.scrollLeft;
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  };
  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    const container = containerRef.current;
    if (!container) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - dragStartX.current) * 1.2;
    container.scrollLeft = dragScrollLeft.current - walk;
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-nowrap overflow-x-auto px-0 py-2 max-w-full cursor-grab active:cursor-grabbing gap-3 ${className || ''}`}
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE 10+
      }}
      tabIndex={0}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <style>{`
        .horizontal-scroller::-webkit-scrollbar { display: none; }
      `}</style>
      {[...items, ...items].map((item, index) => (
        <span
          key={index}
          className="flex items-center justify-center mx-3"
        >
          {item.logo ? (
            <img src={item.logo} alt={item.name} title={item.name} className="h-14 w-auto max-w-[160px] object-contain" />
          ) : (
            <span className="text-base font-medium text-white">{item.name}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default HorizontalScroller; 