import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export type PostMeta = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    image: string;
  };
  category: string;
  tags?: string[];
  featured?: boolean;
};

export type Post = PostMeta & {
  content: string;
};

export function getPostSlugs() {
  try {
    return fs.readdirSync(postsDirectory)
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading post slugs:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      id: slug,
      title: data.title || 'Untitled Post',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || 'https://picsum.photos/seed/picsum/1200/630',
      author: {
        name: data.author?.name || 'Venkatesh Shivandi',
        image: data.author?.image || 'https://picsum.photos/seed/author/100/100',
      },
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      featured: data.featured || false,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .process(markdown);
  return result.toString();
}

export function getAllPosts(): Post[] {
  try {
    const slugs = getPostSlugs();
    const posts = slugs
      .map(slug => getPostBySlug(slug))
      .filter((post): post is Post => post !== null)
      .sort((post1, post2) => (new Date(post2.date).getTime() - new Date(post1.date).getTime()));
    return posts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export function getPostsByCategory(category: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.featured);
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set(allPosts.map(post => post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tagsSet = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags?.forEach(tag => {
      tagsSet.add(tag);
    });
  });
  
  return Array.from(tagsSet);
} 