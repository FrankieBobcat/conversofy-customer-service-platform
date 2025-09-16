import { useState, useEffect } from 'react';
import { useTheme, ThemePalette } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Palette, Sparkles, Check, TerminalSquare } from 'lucide-react';

// ThemeCard for a more visual theme switcher
const ThemeCard = ({ 
  theme, 
  isActive, 
  onClick 
}: { 
  theme: ThemePalette; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  // Generate gradient preview using primary and accent colors
  const gradientStyle = theme.accent 
    ? { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)` }
    : { background: theme.primary };

  return (
    <DropdownMenuItem
      key={theme.name}
      onClick={onClick}
      className={`
        flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100/10
        ${isActive ? 'bg-primary/10 border-l-2 border-primary' : ''}
      `}
    >
      <div
        className="w-10 h-10 rounded-md flex-shrink-0 shadow-sm transition-all"
        style={gradientStyle}
      />
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{theme.name}</span>
          {isActive && (
            <span className="text-primary">
              <Check className="h-4 w-4" />
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground line-clamp-2 mt-1">
          {theme.description}
        </span>
        <div className="flex gap-1 mt-1">
          <span className="text-xs px-1.5 rounded-sm bg-primary/10 text-primary">{theme.variant}</span>
        </div>
      </div>
    </DropdownMenuItem>
  );
};

export function ThemeSwitcher() {
  const { currentTheme, setTheme, themes, isChangingTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  
  // Create loading messages that cycle
  useEffect(() => {
    if (isChangingTheme) {
      const messages = [
        "Updating color scheme...", 
        "Applying new theme...",
        "Refreshing user interface...",
        "Optimizing visual experience..."
      ];
      
      let index = 0;
      const interval = setInterval(() => {
        setLoadingMessage(messages[index % messages.length]);
        index++;
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [isChangingTheme]);

  const handleThemeChange = async (theme: ThemePalette) => {
    if (theme.name === currentTheme.name) {
      setIsOpen(false);
      return;
    }
    
    setIsChanging(true);
    await setTheme(theme);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-md border-gray-700 bg-gray-800/50 text-white hover:bg-gray-700/70 hover:text-white"
          disabled={isChangingTheme}
        >
          {isChangingTheme ? (
            <div className="flex items-center">
              <span className="animate-pulse">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>
          ) : (
            <Palette className="h-4 w-4" />
          )}
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-72 border-gray-800 bg-gray-900 text-white overflow-hidden p-1"
      >
        <DropdownMenuLabel className="px-4 py-2 flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary" />
          <span>Customize Your Experience</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-800" />
        
        {isChangingTheme ? (
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <div className="relative mb-4">
              <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-primary/30 border-b-primary/10 border-l-primary/50 animate-spin"></div>
            </div>
            <p className="text-sm font-medium">{loadingMessage}</p>
            <p className="text-xs text-gray-400 mt-1">Please wait while we update the theme</p>
          </div>
        ) : (
          <div className="max-h-[350px] overflow-y-auto py-1">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.name}
                theme={theme}
                isActive={currentTheme.name === theme.name}
                onClick={() => handleThemeChange(theme)}
              />
            ))}
          </div>
        )}
        
        <div className="p-2 bg-gray-850 mt-1 rounded-sm flex items-center gap-2 text-xs text-gray-400">
          <TerminalSquare className="h-3 w-3" />
          <span>Changes apply immediately</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}