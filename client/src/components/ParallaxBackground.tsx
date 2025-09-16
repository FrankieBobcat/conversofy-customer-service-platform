import { useEffect, useState, useRef, memo } from 'react';

interface ParallaxElement {
  id: number;
  x: string;
  y: string;
  size: number;
  opacity: number;
  blur: number;
  color: string;
  speed: number;
}

interface ParallaxBackgroundProps {
  count?: number;
  className?: string;
}

// Performance optimized ParallaxElement component
const ParallaxBubble = memo(({ element, scrollY }: { element: ParallaxElement; scrollY: number }) => {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: `${element.size}px`,
        height: `${element.size}px`,
        left: element.x,
        top: element.y,
        backgroundColor: element.color,
        opacity: element.opacity,
        filter: `blur(${element.blur}px)`,
        transform: `translateY(${scrollY * element.speed * 0.15}px)`,
        transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)',
        willChange: 'transform'
      }}
    />
  );
});

ParallaxBubble.displayName = 'ParallaxBubble';

function ParallaxBackground({
  count = 15,
  className = ''
}: ParallaxBackgroundProps) {
  const [elements, setElements] = useState<ParallaxElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const scrollThrottleRef = useRef<number | null>(null);

  // Initialize random elements only once and memoize
  useEffect(() => {
    const primaryColors = [
      'hsla(199, 89%, 48%, 0.15)', // primary blue at 15% opacity
      'hsla(199, 89%, 60%, 0.12)', // lighter blue at 12% opacity
      'hsla(210, 100%, 40%, 0.08)', // accent blue at 8% opacity
    ];

    // Reduce the number of elements for better performance on mobile
    const actualCount = window.innerWidth < 768 ? Math.floor(count * 0.6) : count;

    const newElements: ParallaxElement[] = Array.from({ length: actualCount }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 60 + 20, // 20-80px
      opacity: Math.random() * 0.2 + 0.1, // 0.1-0.3 opacity
      blur: Math.random() * 30 + 10, // 10-40px blur
      color: primaryColors[Math.floor(Math.random() * primaryColors.length)],
      speed: Math.random() * 0.8 + 0.2, // 0.2-1.0 speed factor
    }));

    setElements(newElements);
  }, [count]);

  // Use throttled scroll handler for better performance
  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current !== null) return;
      
      scrollThrottleRef.current = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        scrollThrottleRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollThrottleRef.current !== null) {
        window.cancelAnimationFrame(scrollThrottleRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 ${className}`}
    >
      {elements.map((element) => (
        <ParallaxBubble 
          key={element.id} 
          element={element} 
          scrollY={scrollY} 
        />
      ))}
    </div>
  );
}

// Memoize the entire component to prevent unnecessary re-renders
export default memo(ParallaxBackground);