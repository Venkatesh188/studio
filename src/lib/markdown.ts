import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const projectsDirectory = path.join(process.cwd(), 'content/projects');

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

export type ProjectMeta = {
  id: string;
  title: string;
  description: string;
  problem: string;
  tools: string[];
  outcome: string;
  imageUrl: string;
  imageHint: string;
  liveLink?: string;
  repoLink?: string;
  paperLink?: string;
  order: number;
};

export function getPostSlugs() {
  try {
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md')).map(file => file.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading post directory:', error);
    return [];
  }
}

export function getProjectSlugs() {
  try {
    return fs.readdirSync(projectsDirectory).filter(file => file.endsWith('.md')).map(file => file.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading projects directory:', error);
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

export function getProjectBySlug(slug: string): ProjectMeta | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      id: slug,
      title: data.title || 'Untitled Project',
      description: data.description || '',
      problem: data.problem || '',
      tools: data.tools || [],
      outcome: data.outcome || '',
      imageUrl: data.imageUrl || 'https://picsum.photos/seed/picsum/400/250',
      imageHint: data.imageHint || '',
      liveLink: data.liveLink || undefined,
      repoLink: data.repoLink || undefined, 
      paperLink: data.paperLink || undefined,
      order: data.order || 0,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
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

export function getAllProjects(): ProjectMeta[] {
  try {
    const slugs = getProjectSlugs();
    const projects = slugs
      .map(slug => getProjectBySlug(slug))
      .filter((project): project is ProjectMeta => project !== null)
      .sort((a, b) => a.order - b.order);
    return projects;
  } catch (error) {
    console.error('Error getting all projects:', error);
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