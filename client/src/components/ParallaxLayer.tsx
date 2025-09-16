import React, { useEffect, useState, useRef, ReactNode } from 'react';

interface ParallaxLayerProps {
  children?: ReactNode;
  speed?: number; // Positive values move slower than scroll, negative values move faster
  className?: string;
  translateY?: boolean;
  translateX?: boolean;
  scale?: boolean;
  rotate?: boolean;
  opacity?: boolean;
  customTransform?: string;
  baseOffset?: number;
}

export default function ParallaxLayer({
  children,
  speed = 0.1,
  className = '',
  translateY = true,
  translateX = false,
  scale = false,
  rotate = false,
  opacity = false,
  customTransform = '',
  baseOffset = 0
}: ParallaxLayerProps) {
  const [scrollY, setScrollY] = useState(0);
  const layerRef = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [elementVisible, setElementVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  // Get the initial position of the element and window height
  useEffect(() => {
    const updatePosition = () => {
      if (!layerRef.current) return;
      
      const rect = layerRef.current.getBoundingClientRect();
      setElementTop(rect.top + window.scrollY);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      if (!layerRef.current) return;
      
      // Check if element is in view or near view (expanded range for smoother appearance)
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const elementHeight = layerRef.current.offsetHeight;
      
      const isNearView = 
        scrollPosition + viewportHeight * 1.2 > elementTop && 
        scrollPosition < elementTop + elementHeight + viewportHeight * 0.5;
      
      setElementVisible(isNearView);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementTop]);

  // Calculate the transform value based on scroll position and options
  const getTransform = () => {
    if (!elementVisible) return customTransform; // Keep customTransform during exit
    
    // Calculate how far to move based on scroll position relative to the element
    const scrollOffset = scrollY - (elementTop - windowHeight);
    const offset = baseOffset + (scrollOffset * speed);
    
    let transform = '';
    
    if (translateY) {
      transform += `translateY(${offset}px) `;
    }
    
    if (translateX) {
      transform += `translateX(${offset * 0.3}px) `;
    }
    
    if (scale) {
      // Scale between 0.95 and 1.05 based on scroll
      const scaleValue = 1 + (offset * 0.0001);
      transform += `scale(${scaleValue}) `;
    }
    
    if (rotate) {
      // Subtle rotation based on scroll
      const rotateValue = offset * 0.02;
      transform += `rotate(${rotateValue}deg) `;
    }
    
    if (customTransform) {
      transform += customTransform;
    }
    
    return transform.trim();
  };

  // Calculate opacity value if enabled
  const getOpacityValue = () => {
    if (!opacity || !elementVisible) return 1;
    
    // Calculate distance from middle of viewport
    const viewportMiddle = scrollY + (windowHeight / 2);
    const elementMiddle = elementTop + (layerRef.current?.offsetHeight || 0) / 2;
    const distanceFromMiddle = Math.abs(viewportMiddle - elementMiddle);
    
    // Fade based on distance from middle of viewport
    // The 600 value controls how quickly it fades (higher = more gradual fade)
    const fadeDistance = 600;
    return Math.max(0, Math.min(1, 1 - (distanceFromMiddle / fadeDistance)));
  };

  return (
    <div
      ref={layerRef}
      className={`parallax-layer ${className}`}
      style={{
        transform: getTransform(),
        opacity: getOpacityValue(),
        transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.2s ease',
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
}