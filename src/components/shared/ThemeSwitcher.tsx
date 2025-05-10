
'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const Icon = theme === 'dark' ? Sun : Moon;
  const nextThemeLabel = theme === 'dark' ? 'Light' : 'Dark';

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      aria-label={`Switch to ${nextThemeLabel} mode`}
      title={`Switch to ${nextThemeLabel} mode`}
      className="text-primary hover:bg-primary/10 hover:text-primary"
    >
      <Icon className="h-5 w-5" />
      <span className="sr-only">Toggle theme to {nextThemeLabel}</span>
    </Button>
  );
}
