import React, { useState, useRef, ReactNode, useEffect } from 'react';

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number; // Higher = more magnetic pull
  distance?: number; // Distance at which the magnetic effect starts
  scale?: number; // How much to scale on hover (1 = no scale)
  onClick?: () => void;
}

const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  className = '',
  strength = 0.5,
  distance = 100,
  scale = 1.05,
  onClick
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Distance from mouse to center of element
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calculate distance between mouse and element center
    const mouseDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Only apply the effect if the mouse is within our defined distance
    if (mouseDistance < distance) {
      // Calculate strength based on distance (closer = stronger)
      const distanceStrength = 1 - mouseDistance / distance;
      
      // Move towards mouse by percentage of distance * our strength factor
      setPosition({
        x: distanceX * distanceStrength * strength,
        y: distanceY * distanceStrength * strength
      });
    } else {
      // If outside our distance threshold, reset position
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [strength, distance]);

  return (
    <div
      ref={elementRef}
      className={`magnetic-element ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? scale : 1})`,
        transition: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default MagneticElement;