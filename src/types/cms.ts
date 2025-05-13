
import type { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string; // HTML
  problem: string; // HTML
  tools: string[];
  outcome: string; // HTML
  imageUrl?: string;
  imageHint?: string;
  liveLink?: string;
  repoLink?: string;
  published: boolean;
  date: string; // YYYY-MM-DD
  author: string; 
  tags?: string[];
}

export interface Achievement {
  id: string; 
  iconName: string; 
  text: string;
}

export interface AboutContent {
  id: string; 
  mainText: string; // HTML
  imageUrl?: string;
  imageHint?: string;
  achievements: Achievement[];
}

export const ICONS: { [key: string]: LucideIcon } = {
  Award: require('lucide-react').Award,
  Brain: require('lucide-react').Brain,
  Users: require('lucide-react').Users,
  Lightbulb: require('lucide-react').Lightbulb,
};
