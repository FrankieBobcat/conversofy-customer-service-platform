import { CSSProperties, ReactNode } from 'react';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  className?: string;
  style?: CSSProperties;
  isLoading?: boolean;
  children: ReactNode;
  shimmerEffect?: boolean;
  // How many skeleton items to render
  count?: number;
  // Animation delay between multiple items
  staggered?: boolean;
  // Shape of skeleton: 'rect', 'circle', 'text'
  variant?: 'rect' | 'circle' | 'text' | 'card';
}

export function SkeletonLoader({
  className,
  style,
  isLoading = true,
  children,
  shimmerEffect = true,
  count = 1,
  staggered = false,
  variant = 'rect',
}: SkeletonLoaderProps) {
  if (!isLoading) return <>{children}</>;

  // Different variants of skeletons
  let variantClasses = '';
  
  switch (variant) {
    case 'circle':
      variantClasses = 'rounded-full aspect-square';
      break;
    case 'text':
      variantClasses = 'h-4 w-full max-w-[300px]';
      break;
    case 'card':
      variantClasses = 'rounded-xl h-full w-full';
      break;
    default:
      variantClasses = 'rounded-md';
  }

  const shimmerClasses = shimmerEffect ? 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent' : '';

  // Create multiple skeletons if count > 1
  if (count > 1) {
    return (
      <div className={className} style={style}>
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton
            key={index}
            className={cn(
              variantClasses,
              shimmerClasses,
              staggered && `animate-delay-${index * 100}`,
              "mb-2 last:mb-0"
            )}
            shimmer={false} // We're using our custom shimmer
            style={{
              animationDelay: staggered ? `${index * 0.1}s` : undefined,
              ...style,
            }}
          />
        ))}
      </div>
    );
  }

  // Single skeleton
  return (
    <Skeleton
      className={cn(
        className,
        variantClasses,
        shimmerClasses
      )}
      style={style}
      shimmer={!shimmerEffect} // Only use default pulse if not using shimmer
    />
  );
}

// Predefined skeleton layouts
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-[180px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
    </div>
  );
}

export function BlogPostSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-[95%]" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  );
}

export function TestimonialSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col space-y-3", className)}>
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
    </div>
  );
}

export function BusinessSolutionSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3 bg-gray-800/30 p-6 rounded-xl border border-gray-700", className)}>
      <div className="w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
        <Skeleton className="h-6 w-6 rounded" />
      </div>
      <Skeleton className="h-5 w-[70%]" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
      <div className="space-y-1 pt-2">
        <Skeleton className="h-3 w-[80%]" />
        <Skeleton className="h-3 w-[85%]" />
        <Skeleton className="h-3 w-[65%]" />
      </div>
    </div>
  );
}

// Add custom animation to tailwind.config.js:
// animate-shimmer: 'shimmer 2s infinite',
// keyframes: {
//   shimmer: {
//     '100%': {
//       transform: 'translateX(100%)',
//     },
//   },
// },