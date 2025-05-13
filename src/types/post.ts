export interface Post {
  id: string;
  slug: string;
  title: string;
  category: string; // category slug
  categoryName?: string; // category display name
  content: string;
  excerpt: string;
  coverImage?: string;
  imageUrl?: string; // for blog post detail, similar to coverImage
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