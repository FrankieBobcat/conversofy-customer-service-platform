import React, { useEffect, useState, useRef } from 'react';

interface ParallaxSectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  textColor?: string;
  subtitleColor?: string;
}

export default function ParallaxSectionTitle({
  title,
  subtitle,
  className = '',
  textColor = 'text-blue-500',
  subtitleColor = 'text-white/80'
}: ParallaxSectionTitleProps) {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionTop, setSectionTop] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  // Get the initial position of the element and window height
  useEffect(() => {
    const updatePosition = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      setSectionTop(rect.top + window.scrollY);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  // Handle scroll and calculate parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      if (!sectionRef.current) return;
      
      // Check if section is in view
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const elementHeight = sectionRef.current.offsetHeight;
      
      const isInView = 
        scrollPosition + viewportHeight > sectionTop && 
        scrollPosition < sectionTop + elementHeight + viewportHeight;
      
      setSectionVisible(isInView);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionTop]);

  // Calculate parallax offset based on scroll position
  const getParallaxOffset = () => {
    if (!sectionVisible) return 0;
    
    // Calculate how far we've scrolled past the start of the section
    const scrollPastSection = scrollY - (sectionTop - windowHeight);
    
    // Apply a reduced effect for subtle movement (0.1 = 10% of scroll speed)
    return scrollPastSection * 0.15;
  };

  const mainTitleOffset = getParallaxOffset();
  const subtitleOffset = mainTitleOffset * 0.7; // Subtitle moves slower than the title

  return (
    <div 
      ref={sectionRef}
      className={`text-center mb-12 ${className}`}
    >
      <h2 
        className={`text-3xl md:text-4xl font-bold ${textColor}`}
        style={{
          transform: `translateY(${-mainTitleOffset}px)`,
          transition: 'transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)',
          willChange: 'transform'
        }}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p 
          className={`mt-4 text-lg ${subtitleColor}`}
          style={{
            transform: `translateY(${-subtitleOffset}px)`,
            transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
            willChange: 'transform'
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}