import React, { useState, useRef, ReactNode, useEffect } from 'react';

interface InteractiveButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  glowOnHover?: boolean;
}

const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  className = '',
  onClick,
  variant = 'primary',
  glowOnHover = true
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isPressed, setIsPressed] = useState(false);

  // Base styles for different variants
  const baseClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'bg-transparent border border-primary text-primary hover:bg-primary/10'
  };

  useEffect(() => {
    if (!buttonRef.current) return;
    
    const button = buttonRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!button) return;
      
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setGlowPosition({ x, y });
    };
    
    button.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (button) {
        button.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`relative px-6 py-3 rounded-lg font-medium overflow-hidden transition-all duration-200 ${baseClasses[variant]} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        transform: isPressed ? 'scale(0.98)' : isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* Glow effect */}
      {glowOnHover && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered 
              ? `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)` 
              : 'none',
            opacity: isPressed ? 0.5 : 1,
            mixBlendMode: 'overlay',
            transition: isHovered ? 'none' : 'background 0.5s ease'
          }}
        />
      )}
      
      {/* Content - with subtle up shift on press */}
      <div 
        className="relative"
        style={{
          transform: isPressed ? 'translateY(1px)' : 'translateY(0)',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {children}
      </div>
    </button>
  );
};

export default InteractiveButton;