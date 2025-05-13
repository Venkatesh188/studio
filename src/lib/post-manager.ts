'use client';

import type { Post } from '@/types/post';

const POSTS_STORAGE_KEY = 'blogPosts';

// Helper to get posts from localStorage
const getPostsFromStorage = (): Post[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
    return storedPosts ? JSON.parse(storedPosts) : [];
  } catch (error) {
    console.error('Error parsing posts from localStorage:', error);
    return [];
  }
};

// Helper to save posts to localStorage
const savePostsToStorage = (posts: Post[]): void => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts to localStorage:', error);
  }
};

// Initialize with dummy data if localStorage is empty
const initializeDummyPosts = () => {
  if (typeof window !== 'undefined' && !localStorage.getItem(POSTS_STORAGE_KEY)) {
    const dummyPosts: Post[] = [
      { id: "1", slug: "understanding-llms", title: "Understanding Large Language Models", category: "ai-news", content: "Detailed content here exploring the architecture and applications of LLMs. LLMs are a type of AI model that can process and generate human-like text. They are trained on massive datasets of text and code.", excerpt: "Short summary about LLMs and their growing importance.", coverImage: "https://picsum.photos/seed/llm/400/200", published: true, date: "2024-07-28", author: "Venkatesh S.", tags: ["LLM", "AI", "NLP"] },
      { id: "2", slug: "tfjs-tutorial", title: "Getting Started with TensorFlow.js", category: "tutorials", content: "This tutorial will guide you through setting up your first TensorFlow.js project. TensorFlow.js is an open-source library that allows you to define, train, and run machine learning models in JavaScript.", excerpt: "A beginner-friendly guide to TensorFlow.js for web developers.", coverImage: "https://picsum.photos/seed/tfjs/400/200", published: false, date: "2024-07-25", author: "Venkatesh S.", tags: ["TensorFlow.js", "JavaScript", "Machine Learning"] },
      { id: "3", slug: "ai-in-healthcare", title: "AI in Healthcare: A Case Study", category: "case-studies", content: "Exploring a real-world case study of AI application in diagnosing diseases. AI is revolutionizing healthcare by improving diagnostic accuracy, personalizing treatments, and streamlining administrative tasks.", excerpt: "How AI is transforming diagnostics and patient care.", coverImage: "https://picsum.photos/seed/aihealth/400/200", published: true, date: "2024-07-22", author: "Venkatesh S.", tags: ["AI", "Healthcare", "Case Study"] },
      { id: "4", slug: "future-of-generative-ai", title: "The Future of Generative AI", content: "This is the full content for 'The Future of Generative AI'. It explores upcoming trends and impacts of generative AI models across industries. \n\nGenerative AI is rapidly evolving... \n\n## Key Trends\n\n- Trend 1: Increased model capabilities and accessibility.\n- Trend 2: Integration into various software and platforms.\n\n## Conclusion\n\nThe future is exciting and full of possibilities!", imageUrl: "https://picsum.photos/seed/blogdetail1/800/400", imageHint: "futuristic ai", category: "ai-news", date: "2024-07-28", author: "Venkatesh S.", tags: ["Generative AI", "Future Tech", "Machine Learning"], published: true, excerpt: "Exploring upcoming trends and impacts of generative AI models.", coverImage: "https://picsum.photos/seed/genai/400/250" },
      { id: "5", slug: "beginners-guide-prompt-engineering", title: "A Beginner's Guide to Prompt Engineering", content: "Full content for 'A Beginner's Guide to Prompt Engineering'. Learn the art of crafting effective prompts for better AI-generated results. \n\n### What is Prompt Engineering?\n\nIt's the process of structuring text that can be interpreted and understood by a generative AI model. \n\n### Best Practices\n\n1. Be specific and clear in your instructions.\n2. Provide context and examples when necessary.\n3. Iterate on your prompts to refine the output.", imageUrl: "https://picsum.photos/seed/blogdetail2/800/400", imageHint: "coding tutorial", category: "tutorials", date: "2024-07-25", author: "Venkatesh S.", tags: ["Prompt Engineering", "AI Beginners", "Tutorial"], published: true, excerpt: "Learn the art of crafting effective prompts for better AI-generated results.", coverImage: "https://picsum.photos/seed/prompt/400/250" },
      { id: "6", slug: "ai-in-personalized-education", title: "AI in Personalized Education", category: "case-studies", content: "Exploring how AI tailors learning experiences for students. This includes adaptive learning platforms, intelligent tutoring systems, and personalized content recommendations. \n\n## Benefits\n\n- Improved student engagement.\n- Better learning outcomes.\n- Catering to individual learning paces.", excerpt: "How artificial intelligence is tailoring learning experiences for students worldwide.", coverImage: "https://picsum.photos/seed/aiedu/400/250", published: true, date: "2024-07-22", author: "Venkatesh S.", tags: ["AI", "Education", "Personalization"] },
      { id: "7", slug: "navigating-ethical-ai", title: "Navigating Ethical AI Development", category: "industry-insights", content: "Key considerations for building responsible and ethical AI systems. This involves addressing bias, ensuring transparency, and maintaining accountability. \n\n### Core Principles\n\n- Fairness: AI systems should treat all individuals equitably.\n- Accountability: Mechanisms for responsibility when AI systems make errors.\n- Transparency: Understanding how AI models arrive at their decisions.", excerpt: "Key considerations for building responsible and ethical AI systems.", coverImage: "https://picsum.photos/seed/ethicsai/400/250", published: true, date: "2024-07-19", author: "Venkatesh S.", tags: ["Ethical AI", "AI Governance", "Responsible AI"] },

    ];
    savePostsToStorage(dummyPosts);
  }
};

initializeDummyPosts(); // Call this once when the module loads

export const getAllPosts = (): Post[] => {
  return getPostsFromStorage();
};

export const getPostById = (id: string): Post | undefined => {
  const posts = getPostsFromStorage();
  return posts.find(post => post.id === id);
};

export const getPostBySlug = (slug: string): Post | undefined => {
  const posts = getPostsFromStorage();
  return posts.find(post => post.slug === slug);
};

export const createPost = (newPostData: Omit<Post, 'id' | 'date' | 'author'>): Post => {
  const posts = getPostsFromStorage();
  const newPost: Post = {
    ...newPostData,
    id: Date.now().toString(), // Simple unique ID
    date: new Date().toISOString().split('T')[0], // Current date
    author: 'Venkatesh S.', // Default author for now
  };
  const updatedPosts = [...posts, newPost];
  savePostsToStorage(updatedPosts);
  return newPost;
};

export const updatePost = (id: string, updatedData: Partial<Post>): Post | undefined => {
  const posts = getPostsFromStorage();
  const postIndex = posts.findIndex(post => post.id === id);
  if (postIndex === -1) {
    return undefined;
  }
  const updatedPost = { ...posts[postIndex], ...updatedData, id }; // Ensure ID is not overwritten
  posts[postIndex] = updatedPost;
  savePostsToStorage(posts);
  return updatedPost;
};

export const deletePost = (id: string): boolean => {
  let posts = getPostsFromStorage();
  const initialLength = posts.length;
  posts = posts.filter(post => post.id !== id);
  if (posts.length < initialLength) {
    savePostsToStorage(posts);
    return true;
  }
  return false;
};

export const getPostsByCategory = (categorySlug: string): Post[] => {
    const posts = getPostsFromStorage();
    return posts.filter(post => post.category === categorySlug && post.published);
};

export const getPublishedPosts = (): Post[] => {
    const posts = getPostsFromStorage();
    return posts.filter(post => post.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getRecentPosts = (limit: number = 3): Post[] => {
    return getPublishedPosts().slice(0, limit);
};