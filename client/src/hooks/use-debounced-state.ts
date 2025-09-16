import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that creates a debounced version of a state value
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
export function useDebouncedState<T>(value: T, delay: number = 500): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(value);
  const [debouncedState, setDebouncedState] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Update the inner state immediately
    setState(value);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set a new timeout to update the debounced value after the delay
    timeoutRef.current = setTimeout(() => {
      setDebouncedState(value);
    }, delay);
    
    // Cleanup on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return [debouncedState, setState];
}

/**
 * Custom hook that returns a debounced function
 * @param callback The function to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced function
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}