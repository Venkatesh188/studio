'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getPostBySlug as getPostBySlugFromStorage } from "@/lib/post-manager";
import type { Post } from "@/types/post";
import { useParams } from "next/navigation";

// Basic markdown to HTML conversion (very simplified)
const renderMarkdown = (markdown: string) => {
  if (!markdown) return [];
  return markdown
    .split('\n\n').map((paragraph, i) => {
      if (paragraph.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-semibold mt-6 mb-2 text-foreground">{paragraph.substring(4)}</h3>;
      }
      if (paragraph.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-semibold mt-8 mb-3 text-foreground">{paragraph.substring(3)}</h2>;
      }
      if (paragraph.startsWith('- ')) {
          const items = paragraph.split('\n').map(item => item.substring(2));
          return <ul key={i} className="list-disc list-inside space-y-1 my-4 ml-4 text-foreground/90">{items.map((li, idx) => <li key={idx}>{li}</li>)}</ul>
      }
      if (paragraph.match(/^\d+\.\s/)) { // Matches "1. ", "2. ", etc.
           const items = paragraph.split('\n').map(item => item.replace(/^\d+\.\s/, ''));
          return <ol key={i} className="list-decimal list-inside space-y-1 my-4 ml-4 text-foreground/90">{items.map((li, idx) => <li key={idx}>{li}</li>)}</ol>
      }
      return <p key={i} className="text-foreground/90 leading-relaxed my-4">{paragraph}</p>;
    }).reduce((acc: JSX.Element[], elem) => acc.concat(elem), []);
};

const categoriesMap: { [key: string]: string } = {
  "ai-news": "AI News",
  "tutorials": "Tutorials",
  "case-studies": "Case Studies",
  "industry-insights": "Industry Insights",
  "how-to-guides": "How-To Guides",
};


export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null | undefined>(undefined); // undefined for loading, null for not found

  useEffect(() => {
    if (slug) {
      const fetchedPost = getPostBySlugFromStorage(slug);
      if (fetchedPost && fetchedPost.published) {
        setPost({...fetchedPost, categoryName: categoriesMap[fetchedPost.category] || fetchedPost.category});
      } else {
        setPost(null); // Not found or not published
      }
    }
  }, [slug]);

  if (post === undefined) { // Loading state
    return (
      <SectionWrapper id="post-loading" title="Loading Post..." subtitle="Please wait">
        <div className="text-center">
          <p className="text-muted-foreground mb-6">Fetching post details...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (!post) { // Not found or not published
    return (
      <SectionWrapper id="post-not-found" title="Post Not Found" subtitle="Oops!">
        <div className="text-center">
          <p className="text-muted-foreground mb-6">The blog post you are looking for does not exist, has been moved, or is not published.</p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id={`post-${post.slug}`} className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <Link href="/blog" className="text-sm text-primary hover:underline inline-flex items-center mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{post.title}</h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center"><CalendarDays className="mr-1.5 h-4 w-4" /> {post.date}</span>
            <span className="inline-flex items-center"><User className="mr-1.5 h-4 w-4" /> {post.author}</span>
            <span className="inline-flex items-center"><Tag className="mr-1.5 h-4 w-4" /> {post.categoryName || post.category}</span>
          </div>
        </header>

        {(post.coverImage || post.imageUrl) && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image 
                src={post.coverImage || post.imageUrl || "https://picsum.photos/seed/defaultpost/800/400"} 
                alt={post.title} 
                layout="fill" 
                objectFit="cover" 
                data-ai-hint={post.imageHint || "tech article"}
            />
          </div>
        )}

        <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground prose-ul:text-foreground/90 prose-ol:text-foreground/90 dark:prose-invert">
          {renderMarkdown(post.content)}
        </article>

        {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </div>
        )}

        <div className="mt-12 text-center">
           <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Explore More Posts
            </Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}

// Note: generateStaticParams might need adjustments if you want fully static generation with localStorage.
// For dynamic fetching with localStorage, this client-side approach is more straightforward.
// For true SSG/ISR with dynamic content, a build-time data source or API is needed.
// export async function generateStaticParams() {
//   // This would need to access localStorage at build time, which is not possible.
//   // For a real static site, posts would come from a CMS or files.
//   // Example: const posts = await fetchPostsFromCMS();
//   const posts = typeof window !== 'undefined' ? getAllPosts().filter(p => p.published) : [];
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }
