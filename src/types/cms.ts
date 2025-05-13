
import type { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string; // Markdown
  problem: string; // Markdown
  tools: string[];
  outcome: string; // Markdown
  imageUrl?: string;
  imageHint?: string;
  liveLink?: string;
  repoLink?: string;
  published: boolean;
  date: string; // YYYY-MM-DD
  author: string; // Default to "Venkatesh S." for now
  tags?: string[];
}

export interface Achievement {
  id: string; // for key prop
  iconName: string; // Corresponds to a key in iconMap
  text: string;
}

export interface AboutContent {
  id: string; // e.g., "main-about-content"
  mainText: string; // Markdown
  imageUrl?: string;
  imageHint?: string;
  achievements: Achievement[];
}

// For mapping icon names to actual components
export const ICONS: { [key: string]: LucideIcon } = {
  Award: require('lucide-react').Award,
  Brain: require('lucide-react').Brain,
  Users: require('lucide-react').Users,
  Lightbulb: require('lucide-react').Lightbulb,
  // Add more icons as needed for achievements or other parts
};
