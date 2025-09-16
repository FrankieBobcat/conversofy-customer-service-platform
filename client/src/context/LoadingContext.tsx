import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the content loading state
interface LoadingState {
  // Each key represents a section ID in the application
  [sectionId: string]: boolean;
}

// Define the context type
interface LoadingContextType {
  loadingState: LoadingState;
  setLoading: (sectionId: string, isLoading: boolean) => void;
  // Helper to simulate loading states for development/demo purposes
  simulateLoading: (sectionId: string, durationMs?: number) => void;
}

// Create the context with default values
const LoadingContext = createContext<LoadingContextType>({
  loadingState: {},
  setLoading: () => {},
  simulateLoading: () => {},
});

// Context provider component
export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingState, setLoadingState] = useState<LoadingState>({});

  // Function to set loading state for a specific section
  const setLoading = (sectionId: string, isLoading: boolean) => {
    setLoadingState((prev) => ({
      ...prev,
      [sectionId]: isLoading,
    }));
  };

  // Function to simulate loading for demonstration purposes
  const simulateLoading = (sectionId: string, durationMs = 2000) => {
    // Set the section to loading
    setLoading(sectionId, true);
    
    // After the specified duration, set it to not loading
    setTimeout(() => {
      setLoading(sectionId, false);
    }, durationMs);
  };

  return (
    <LoadingContext.Provider value={{ loadingState, setLoading, simulateLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

// Custom hook to use the loading context
export function useLoading() {
  const context = useContext(LoadingContext);
  
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  
  return context;
}

// Shorthand hook to check if a specific section is loading
export function useSectionLoading(sectionId: string) {
  const { loadingState } = useLoading();
  return loadingState[sectionId] || false;
}