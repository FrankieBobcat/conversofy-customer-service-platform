import { useEffect, useState, useRef, ReactNode, memo } from 'react';

interface ScrollParallaxProps {
  children?: ReactNode;
  className?: string;
  speed?: number; // Positive values move slower than scroll, negative values move faster
  direction?: 'up' | 'down' | 'left' | 'right';
  startOffset?: number; // Starting position offset in px
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

function ScrollParallax({
  children,
  className = '',
  speed = 0.2,
  direction = 'up',
  startOffset = 0,
  easing = 'ease-out'
}: ScrollParallaxProps) {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [elementVisible, setElementVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const scrollThrottleRef = useRef<number | null>(null);
  const resizeThrottleRef = useRef<number | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Store the initial position of the element with throttling
    const updatePosition = () => {
      if (resizeThrottleRef.current !== null) return;
      
      resizeThrottleRef.current = window.requestAnimationFrame(() => {
        if (element) {
          const rect = element.getBoundingClientRect();
          setElementTop(rect.top + window.scrollY);
          setWindowHeight(window.innerHeight);
        }
        resizeThrottleRef.current = null;
      });
    };

    // Update on resize with throttling
    window.addEventListener('resize', updatePosition, { passive: true });
    
    // Initial update
    updatePosition();

    return () => {
      window.removeEventListener('resize', updatePosition);
      if (resizeThrottleRef.current !== null) {
        window.cancelAnimationFrame(resizeThrottleRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      // Skip if we're already processing a frame
      if (scrollThrottleRef.current !== null) return;
      
      scrollThrottleRef.current = window.requestAnimationFrame(() => {
        if (!element) {
          scrollThrottleRef.current = null;
          return;
        }
        
        // Calculate how far the user has scrolled from the top of the page
        const scrollTop = window.scrollY;
        
        // Calculate when the element enters and exits the viewport
        const elementHeight = element.offsetHeight;
        const elementInView = (scrollTop + windowHeight) > elementTop && 
                             scrollTop < (elementTop + elementHeight);
        
        if (elementInView) {
          // Calculate the scroll progress relative to the element position
          // 0 when element just enters view, 1 when element is about to leave view
          const scrollPosition = (scrollTop + windowHeight - elementTop) / (windowHeight + elementHeight);
          
          // Apply the parallax effect based on direction and speed
          const moveAmount = scrollPosition * speed * 100;
          setOffset(startOffset + moveAmount);
          setElementVisible(true);
        } else if (elementVisible) { // Only update state if it would change
          setElementVisible(false);
        }
        
        scrollThrottleRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call once to set initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollThrottleRef.current !== null) {
        window.cancelAnimationFrame(scrollThrottleRef.current);
      }
    };
  }, [speed, direction, elementTop, windowHeight, startOffset, elementVisible]);

  // Calculate the transform based on direction
  const getTransform = () => {
    if (!elementVisible) return '';

    switch (direction) {
      case 'up':
        return `translateY(-${offset}px)`;
      case 'down':
        return `translateY(${offset}px)`;
      case 'left':
        return `translateX(-${offset}px)`;
      case 'right':
        return `translateX(${offset}px)`;
      default:
        return `translateY(-${offset}px)`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`parallax ${className}`}
      style={{
        transform: getTransform(),
        transition: `transform 0.1s ${easing}`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(ScrollParallax);