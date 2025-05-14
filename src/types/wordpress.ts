
// src/types/wordpress.ts

export interface WordPressMediaItem {
  sourceUrl: string;
  altText?: string;
  mediaDetails?: {
    width?: number;
    height?: number;
  };
}

export interface WordPressUser {
  name: string;
  slug: string;
  avatar?: {
    url: string;
  };
}

export interface WordPressTerm { // For Categories and Tags
  id: string;
  name: string;
  slug: string;
  count?: number;
  description?: string;
}

export interface WordPressPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string; // ISO 8601 date string
  content: string; // HTML content
  featuredImage?: {
    node?: WordPressMediaItem;
  };
  author?: {
    node?: WordPressUser;
  };
  categories?: {
    edges: Array<{ node: WordPressTerm }>;
  };
  tags?: {
    edges: Array<{ node: WordPressTerm }>;
  };
  // Add any other fields you might query
}

export interface WordPressCategory extends WordPressTerm {
  // Category specific fields if any
}

export interface WordPressTag extends WordPressTerm {
  // Tag specific fields if any
}

// For Projects Custom Post Type
// This assumes you have ACF fields grouped under 'projectFields'
export interface ProjectAcfFields {
  problemStatement?: string; // HTML content expected
  toolsUsed?: string; // Comma-separated string or repeater if structured in ACF
  outcome?: string; // HTML content expected
  liveLink?: string;
  repositoryLink?: string;
  imageAiHint?: string;
}

export interface WordPressProject {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string; // Main description, HTML content
  featuredImage?: {
    node?: WordPressMediaItem;
  };
  projectFields?: ProjectAcfFields; // Your ACF group
  tags?: {
    edges: Array<{ node: WordPressTerm }>;
  };
  author?: {
    node?: {
      name: string;
    }
  };
}


export interface WordPressPage {
  id: string;
  title: string;
  slug: string;
  content: string; // HTML content
  date?: string;
  featuredImage?: {
    node?: WordPressMediaItem;
  };
  // Example for ACF specific fields on an "About" page
  aboutPageFields?: {
    mainText?: string; // If you use an ACF field for main text instead of default content
    imageAiHint?: string;
    achievements?: Array<{
      icon?: string; // Name or class for Lucide icon
      text?: string;
    }>;
  };
  // Add other page-specific fields or ACF groups as needed
}
