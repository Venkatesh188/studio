
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, use } from "react";
import { getPostBySlug as getPostBySlugFromStorage } from "@/lib/post-manager";
import type { Post } from "@/types/post";
// import { useParams } from "next/navigation"; // No longer needed with use(params)
import { RenderHtmlContent } from "@/lib/htmlRenderer"; 

const categoriesMap: { [key: string]: string } = {
  "ai-news": "AI News",
  "tutorials": "Tutorials",
  "case-studies": "Case Studies",
  "industry-insights": "Industry Insights",
  "how-to-guides": "How-To Guides",
};


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params; // Destructure slug directly from props.params
  const [post, setPost] = useState<Post | null | undefined>(undefined); 

  useEffect(() => {
    if (slug) {
      const fetchedPost = getPostBySlugFromStorage(slug);
      if (fetchedPost && fetchedPost.published) {
        setPost({...fetchedPost, categoryName: categoriesMap[fetchedPost.category] || fetchedPost.category});
      } else {
        setPost(null); 
      }
    } else {
      setPost(null); 
    }
  }, [slug]);

  if (post === undefined) { 
    return (
      <SectionWrapper id="post-loading" title="Loading Post..." subtitle="Please wait">
        <div className="text-center">
          <p className="text-muted-foreground mb-6">Fetching post details...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (!post) { 
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
                fill={true}
                style={{objectFit: "cover"}}
                data-ai-hint={post.imageHint || "tech article"}
            />
          </div>
        )}

        <article className="bg-card p-6 sm:p-8 rounded-lg shadow-md">
          {/* Apply enhanced styling via RenderHtmlContent's internal prose classes */}
          <RenderHtmlContent htmlString={post.content} />
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

