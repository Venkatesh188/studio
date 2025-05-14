
// This file can be removed if all specific types are moved to wordpress.ts
// or kept for non-WordPress related CMS types if any in the future.
// For now, let's keep it minimal or focused on shared aspects if any.

import type { LucideIcon } from 'lucide-react';

// Keeping ICONS here as it's UI related and might be used independently
export const ICONS: { [key: string]: LucideIcon } = {
  Award: require('lucide-react').Award,
  Brain: require('lucide-react').Brain,
  Users: require('lucide-react').Users,
  Lightbulb: require('lucide-react').Lightbulb,
  Zap: require('lucide-react').Zap,
  Cog: require('lucide-react').Cog,
  SearchCode: require('lucide-react').SearchCode,
  BarChart3: require('lucide-react').BarChart3, // Or ChartColumnBig if preferred & exists
  Briefcase: require('lucide-react').Briefcase,
  GraduationCap: require('lucide-react').GraduationCap,
  CheckSquare: require('lucide-react').CheckSquare,
};

// You can add other site-wide types here if needed.
// For example, a structure for navigation items if they are not purely WordPress driven.
export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  type?: 'public' | 'admin'; // Example type
}
