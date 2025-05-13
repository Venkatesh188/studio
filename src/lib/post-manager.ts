
'use client';

import type { Post } from '@/types/post';

const POSTS_STORAGE_KEY = 'blogPosts';

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

const initializeDummyPosts = () => {
  if (typeof window !== 'undefined' && !localStorage.getItem(POSTS_STORAGE_KEY)) {
    const dummyPosts: Post[] = [
      { id: "1", slug: "understanding-llms", title: "Understanding Large Language Models", category: "ai-news", 
        content: `
# Understanding Large Language Models

Large Language Models (LLMs) are a type of artificial intelligence (AI) model capable of processing and generating human-like text. They are trained on massive datasets of text and code, enabling them to understand context, answer questions, write essays, translate languages, and much more.

## Key Concepts

*   **Transformer Architecture:** Most modern LLMs are based on the transformer architecture, which uses attention mechanisms to weigh the importance of different words in a sequence.
*   **Pre-training & Fine-tuning:** LLMs are typically pre-trained on a vast corpus of general text and then fine-tuned on more specific datasets for particular tasks.
*   **Prompt Engineering:** The art of crafting effective input prompts to guide LLMs to produce desired outputs.

Checkout this image:
![An abstract representation of AI concepts](https://picsum.photos/seed/llm-content/600/300)

<p>LLMs represent a significant advancement in natural language processing and have wide-ranging applications across industries.</p>
        `, 
        excerpt: "Short summary about LLMs and their growing importance in the field of AI.", 
        coverImage: "https://picsum.photos/seed/llm/400/200", imageHint: "abstract ai", published: true, date: "2024-07-28", author: "Venkatesh S.", tags: ["LLM", "AI", "NLP"] 
      },
      { id: "2", slug: "tfjs-tutorial", title: "Getting Started with TensorFlow.js", category: "tutorials", 
        content: `
# Getting Started with TensorFlow.js

This tutorial will guide you through setting up your first TensorFlow.js project. TensorFlow.js is an open-source library that allows you to define, train, and run machine learning models directly in the browser or Node.js.

## Step 1: Setup

First, include the TensorFlow.js library in your HTML file:

\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
\`\`\`

Or install it via npm:
\`\`\`bash
npm install @tensorflow/tfjs
\`\`\`

## Step 2: Define a Model

Here's a simple example of defining a sequential model:

\`\`\`javascript
// Define a simple sequential model
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// Compile the model
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Generate some synthetic data for training
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Train the model
async function trainModel() {
  await model.fit(xs, ys, {epochs: 250});
  console.log('Model trained!');
}

trainModel();
\`\`\`
<p>This is a very basic introduction. Explore the official documentation for more advanced features!</p>
        `, 
        excerpt: "A beginner-friendly guide to TensorFlow.js for web developers looking to run ML in the browser.", 
        coverImage: "https://picsum.photos/seed/tfjs/400/200", imageHint: "code computer", published: false, date: "2024-07-25", author: "Venkatesh S.", tags: ["TensorFlow.js", "JavaScript", "Machine Learning"] 
      },
      { id: "3", slug: "ai-in-healthcare", title: "AI in Healthcare: A Case Study", category: "case-studies", 
        content: `
# AI in Healthcare: A Case Study

This post explores a real-world case study of AI application in diagnosing diseases, specifically focusing on retinal image analysis for diabetic retinopathy.

## The Challenge

Diabetic retinopathy is a leading cause of blindness. Early detection through regular retinal screenings is crucial, but manual analysis by ophthalmologists is time-consuming and resource-intensive.

## The AI Solution

An AI model, typically a Convolutional Neural Network (CNN), was trained on a large dataset of retinal images labeled by severity of diabetic retinopathy.

*   **Data Collection:** High-resolution retinal images.
*   **Preprocessing:** Image normalization, augmentation.
*   **Model Training:** Using a CNN architecture like ResNet or Inception.
*   **Validation:** Testing on an independent dataset and comparing with expert ophthalmologists.

### Results
The AI model achieved a diagnostic accuracy comparable to human experts, significantly reducing the time taken for analysis.

<p>This case study highlights how AI can augment medical professionals, improve efficiency, and make healthcare more accessible.</p>
        `, 
        excerpt: "How AI is transforming diagnostics and patient care, focusing on a diabetic retinopathy case study.", 
        coverImage: "https://picsum.photos/seed/aihealth/400/200", imageHint: "medical tech", published: true, date: "2024-07-22", author: "Venkatesh S.", tags: ["AI", "Healthcare", "Case Study", "CNN"] 
      },
      { id: "4", slug: "future-of-generative-ai", title: "The Future of Generative AI", 
        content: `
# The Future of Generative AI

This is the full content for 'The Future of Generative AI'. It explores upcoming trends and impacts of generative AI models across industries.

Generative AI is rapidly evolving...

## Key Trends
*   Trend 1: Increased model capabilities and accessibility.
*   Trend 2: Integration into various software and platforms.
*   Trend 3: Ethical considerations and responsible AI development becoming paramount.

<p>This is an image embedded using an HTML img tag within MDX:</p>
<img src="https://picsum.photos/seed/blogdetail1/800/400" alt="Futuristic AI" style="width:100%;border-radius:8px;margin-top:1rem;margin-bottom:1rem;" data-ai-hint="futuristic ai" />

### Conclusion
The future is exciting and full of possibilities! We anticipate more personalized and sophisticated AI applications.
        `, 
        imageUrl: "https://picsum.photos/seed/blogdetail1/800/400", imageHint: "futuristic ai", category: "ai-news", date: "2024-07-28", author: "Venkatesh S.", tags: ["Generative AI", "Future Tech", "Machine Learning"], published: true, excerpt: "Exploring upcoming trends and impacts of generative AI models.", coverImage: "https://picsum.photos/seed/genai/400/250" 
      },
    ];
    savePostsToStorage(dummyPosts);
  }
};

initializeDummyPosts();

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
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0], 
    author: 'Venkatesh S.', // Default author, can be changed
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
  // Ensure the ID is not overwritten by updatedData
  const updatedPost = { ...posts[postIndex], ...updatedData, id }; 
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
