
export interface Post {
  id: string;
  slug: string;
  title: string;
  category: string; 
  categoryName?: string; 
  content: string; // Stores MDX content
  excerpt: string;
  coverImage?: string;
  imageUrl?: string; 
  imageHint?: string;
  published: boolean;
  date: string; // YYYY-MM-DD
  author: string;
  tags?: string[];
}

export interface Category {
  slug: string;
  name: string;
  description?: string;
}

