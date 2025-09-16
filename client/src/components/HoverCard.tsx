import React, { useState, useRef, ReactNode, useEffect } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  glareEnabled?: boolean;
  tiltEnabled?: boolean;
  tiltMaxAngle?: number;
  glareMaxOpacity?: number;
  perspective?: number;
}

const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className = '',
  glareEnabled = true,
  tiltEnabled = true,
  tiltMaxAngle = 10,
  glareMaxOpacity = 0.1,
  perspective = 1000
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  // Handle mouse movement over the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tiltEnabled) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card (0 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Convert to tilt angle (-maxAngle to +maxAngle)
    const tiltX = (tiltMaxAngle / 2) - (y * tiltMaxAngle);
    const tiltY = (x * tiltMaxAngle) - (tiltMaxAngle / 2);
    
    // Update state
    setTilt({ x: tiltX, y: tiltY });
    
    // Update glare position
    if (glareEnabled && glareRef.current) {
      setGlarePosition({ x: x * 100, y: y * 100 });
    }
  };

  // Reset when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Cleanup effect for touch device compatibility
  useEffect(() => {
    // Detect if device is touch-only
    const isTouchDevice = 'ontouchstart' in window || 
                       navigator.maxTouchPoints > 0;
    
    // If touch device, disable effects
    if (isTouchDevice) {
      setTilt({ x: 0, y: 0 });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`hover-card ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        transform: isHovered && tiltEnabled
          ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'rotateX(0) rotateY(0)',
        transition: isHovered ? 'none' : 'transform 0.3s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hover-card-content relative">
        {children}
        
        {/* Glare effect overlay */}
        {glareEnabled && (
          <div
            ref={glareRef}
            className="hover-card-glare"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glareMaxOpacity}) 0%, rgba(255,255,255,0) 80%)`,
              opacity: isHovered ? 1 : 0
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HoverCard;