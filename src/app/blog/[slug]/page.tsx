
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import type { WordPressPost } from "@/types/wordpress";
import { getPostBySlug } from "@/lib/wordpress/api";
import { RenderHtmlContent } from "@/lib/htmlRenderer";
import { format } from 'date-fns';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [post, setPost] = useState<WordPressPost | null | undefined>(undefined);

  useEffect(() => {
    if (slug) {
      const fetchPostData = async () => {
        try {
          const fetchedPost = await getPostBySlug(slug);
          setPost(fetchedPost);
        } catch (error) {
          console.error("Failed to fetch post:", error);
          setPost(null);
        }
      };
      fetchPostData();
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
          <p className="text-muted-foreground mb-6">The blog post you are looking for does not exist or could not be loaded.</p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    );
  }
  
  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');
  const authorName = post.author?.node?.name || 'Venkatesh S.';
  const category = post.categories?.edges?.[0]?.node;

  return (
    <SectionWrapper id={`post-${post.slug}`} className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <Link href="/blog" className="text-sm text-primary hover:underline inline-flex items-center mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{post.title}</h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center"><CalendarDays className="mr-1.5 h-4 w-4" /> {formattedDate}</span>
            {authorName && <span className="inline-flex items-center"><User className="mr-1.5 h-4 w-4" /> {authorName}</span>}
            {category && <span className="inline-flex items-center"><Tag className="mr-1.5 h-4 w-4" /> {category.name}</span>}
          </div>
        </header>

        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill={true}
              style={{ objectFit: "cover" }}
              data-ai-hint={post.featuredImage.node.altText?.substring(0,15) || "tech article"}
              priority
            />
          </div>
        )}

        <article className="bg-card p-6 sm:p-8 rounded-lg shadow-md">
          <RenderHtmlContent htmlString={post.content} />
        </article>

        {post.tags?.edges && post.tags.edges.length > 0 && (
          <div className="mt-10 pt-6 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.edges.map(edge => (
                <Badge key={edge.node.id} variant="secondary">{edge.node.name}</Badge>
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
