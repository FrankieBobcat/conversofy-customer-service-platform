import { useEffect, useState, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

export function CursorEffects() {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  
  // Detect if we're on a touch device
  const isTouchDevice = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  
  useEffect(() => {
    if (isTouchDevice) return; // Skip all effects on touch devices
    
    const updatePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (!cursorVisible) {
        setCursorVisible(true);
      }
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    const handleMouseEnter = () => {
      setCursorVisible(true);
    };
    
    const handleMouseLeave = () => {
      setCursorVisible(false);
    };
    
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add special treatments for interactive elements
    const addInteractiveStyles = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .interactive');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (ringRef.current) {
            ringRef.current.classList.add('cursor-ring-expanded');
          }
          if (dotRef.current) {
            dotRef.current.classList.add('cursor-dot-hidden');
          }
        });
        
        el.addEventListener('mouseleave', () => {
          if (ringRef.current) {
            ringRef.current.classList.remove('cursor-ring-expanded');
          }
          if (dotRef.current) {
            dotRef.current.classList.remove('cursor-dot-hidden');
          }
        });
      });
    };
    
    // Allow time for the DOM to be ready
    setTimeout(addInteractiveStyles, 500);
    
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorVisible, isTouchDevice]);
  
  // Update cursor elements when mouse position changes
  useEffect(() => {
    if (isTouchDevice || !cursorVisible) return;
    
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
    
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
    
    if (trailRef.current) {
      trailRef.current.style.transform = `translate(${mousePosition.x}px, ${mousePosition.y}px)`;
    }
    
  }, [mousePosition, cursorVisible, isTouchDevice]);
  
  if (isTouchDevice) return null;
  
  return (
    <>
      {/* Center dot */}
      <div 
        ref={dotRef}
        className={`cursor-dot fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-transform ${
          isClicking ? 'scale-50' : ''
        } ${
          cursorVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transition: isClicking ? 'transform 0.1s ease-out' : 'transform 0.15s ease-out, opacity 0.15s ease-out',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Outer ring */}
      <div 
        ref={ringRef}
        className={`cursor-ring fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 ${
          isClicking ? 'scale-75' : ''
        } ${
          cursorVisible ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          transition: 'transform 0.2s ease-out, width 0.3s ease-out, height 0.3s ease-out, opacity 0.15s ease-out',
          mixBlendMode: 'difference'
        }}
      />
      
      {/* Trail effect */}
      <div 
        ref={trailRef}
        className={`cursor-trail fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9997] transform -translate-x-1/2 -translate-y-1/2 ${
          cursorVisible ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
          transition: 'opacity 0.15s ease-out, transform 0.8s ease-out',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${isClicking ? 1.5 : 1})`,
          mixBlendMode: 'difference'
        }}
      />
      
      {/* We add these styles directly to the component instead of using jsx */}
    </>
  );
}