
'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme, type Theme } from '@/hooks/use-theme';
import { Moon, Sun, Trees } from 'lucide-react';
import type { Icon } from 'lucide-react';

interface ThemeOption {
  value: Theme;
  label: string;
  icon: Icon;
}

const themeOptions: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'forest', label: 'Forest', icon: Trees },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const CurrentThemeIcon = themeOptions.find(opt => opt.value === theme)?.icon || Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Switch to ${theme} theme`}>
          <CurrentThemeIcon className="h-5 w-5 text-primary" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptions.map((option) => (
          <DropdownMenuItem key={option.value} onClick={() => setTheme(option.value)}>
            <option.icon className="mr-2 h-4 w-4" />
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
