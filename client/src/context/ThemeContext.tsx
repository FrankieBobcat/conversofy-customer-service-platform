import React, { createContext, useContext, useState, useEffect } from 'react';

// Define professional theme palette options
export type ThemePalette = {
  name: string;
  primary: string;
  description: string;
  variant: 'professional' | 'tint' | 'vibrant';
  accent?: string;
};

// Predefined professional color palettes
export const themePalettes: ThemePalette[] = [
  {
    name: 'Conversofy Blue',
    primary: 'hsl(199 89% 48%)',
    description: 'Our signature blue for customer service solutions',
    variant: 'vibrant',
    accent: 'hsl(210 100% 40%)'
  },
  {
    name: 'Royal Purple',
    primary: 'hsl(270 65% 45%)',
    description: 'Deep purple for a premium brand experience',
    variant: 'vibrant',
    accent: 'hsl(280 70% 35%)'
  },
  {
    name: 'Business Teal',
    primary: 'hsl(158 64% 37%)',
    description: 'Professional teal for modern business solutions',
    variant: 'professional',
    accent: 'hsl(165 70% 30%)'
  },
  {
    name: 'Dynamic Red',
    primary: 'hsl(345 80% 50%)',
    description: 'Rich crimson for dynamic service experiences',
    variant: 'tint',
    accent: 'hsl(350 75% 40%)'
  },
  {
    name: 'Support Amber',
    primary: 'hsl(35 95% 55%)',
    description: 'Warm amber for friendly customer experiences',
    variant: 'vibrant',
    accent: 'hsl(30 90% 50%)'
  },
  {
    name: 'Professional Azure',
    primary: 'hsl(210 90% 54%)',
    description: 'Bright azure for business communication',
    variant: 'tint',
    accent: 'hsl(215 85% 45%)'
  },
  {
    name: 'Service Emerald',
    primary: 'hsl(145 60% 40%)',
    description: 'Rich emerald for reliable service solutions',
    variant: 'professional',
    accent: 'hsl(150 55% 35%)'
  },
];

type ThemeContextType = {
  currentTheme: ThemePalette;
  setTheme: (theme: ThemePalette) => Promise<void>;
  themes: ThemePalette[];
  isChangingTheme: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemePalette>(themePalettes[0]);
  const [isChangingTheme, setIsChangingTheme] = useState(false);

  // Function to update theme in theme.json through server
  const setTheme = async (theme: ThemePalette) => {
    try {
      setIsChangingTheme(true);
      
      // Apply theme colors to CSS variables immediately
      document.documentElement.style.setProperty('--primary', theme.primary);
      if (theme.accent) {
        document.documentElement.style.setProperty('--accent', theme.accent);
      }
      
      // Update theme.json file via server endpoint
      await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          primary: theme.primary, 
          variant: theme.variant,
          appearance: 'dark', // Keep dark mode as default
          radius: 0.75
        }),
      });
      
      setCurrentTheme(theme);
      
      // Add a short delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // No need to force reload anymore
    } catch (error) {
      console.error('Failed to update theme:', error);
    } finally {
      setIsChangingTheme(false);
    }
  };

  // Load initial theme on component mount
  useEffect(() => {
    const fetchCurrentTheme = async () => {
      try {
        const response = await fetch('/api/theme');
        if (response.ok) {
          const themeData = await response.json();
          
          // Find matching theme from our palettes
          const matchingTheme = themePalettes.find(
            theme => theme.primary === themeData.primary
          ) || themePalettes[0];
          
          setCurrentTheme(matchingTheme);
          
          // Apply theme colors to CSS variables
          document.documentElement.style.setProperty('--primary', matchingTheme.primary);
          if (matchingTheme.accent) {
            document.documentElement.style.setProperty('--accent', matchingTheme.accent);
          }
        }
      } catch (error) {
        console.error('Failed to fetch current theme:', error);
      }
    };

    fetchCurrentTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: themePalettes, isChangingTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};