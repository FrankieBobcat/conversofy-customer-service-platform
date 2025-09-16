import { memo } from 'react';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  overlay?: boolean;
  overlayColor?: string;
}

function OptimizedImage({
  src,
  alt,
  className = '',
  width = 800,
  height = 600,
  style = {},
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  overlay = false,
  overlayColor = 'bg-gradient-to-t from-black/20 to-transparent'
}: OptimizedImageProps) {
  // Adjust style with provided objectFit and objectPosition
  const imageStyle: React.CSSProperties = {
    objectFit,
    objectPosition,
    ...style
  };

  return (
    <div className="relative w-full h-full">
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        style={imageStyle}
        onError={(e) => {
          // Fallback for missing images
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.style.opacity = '0.5';
        }}
      />
      {overlay && (
        <div className={`absolute inset-0 ${overlayColor}`}></div>
      )}
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(OptimizedImage);