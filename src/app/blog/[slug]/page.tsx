// This is a placeholder page for a single blog post.
// In a real application, you would fetch the post data based on the slug.
// For now, it will display some dummy content.

import { getPostBySlug, getAllPosts, markdownToHtml } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Define params type
type Params = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
  
  return {
    title: `${post.title} - Venkatesh Shivandi`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

// Define the page component with the simple params object structure
export default async function BlogPostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  const content = await markdownToHtml(post.content);
  
  return (
    <article className="container max-w-4xl py-12 px-4 sm:px-6 lg:px-8 mx-auto">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-sm text-primary hover:text-primary/80 mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to blog
      </Link>
      
      <header className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {post.category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-1 h-4 w-4" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
        
        <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>
        
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden relative mr-4">
            <Image 
              src={post.author.image} 
              alt={post.author.name}
              fill
              className="object-cover" 
            />
          </div>
          <div>
            <p className="font-medium">{post.author.name}</p>
          </div>
        </div>
      </header>
      
      <div className="relative w-full h-[400px] mb-12 rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,206,209,0.2)] dark:shadow-[0_4px_20px_rgba(0,255,255,0.25)]">
        <Image 
          src={post.coverImage} 
          alt={post.title}
          fill
          className="object-cover" 
          priority
        />
      </div>
      
      <div 
        className="prose prose-lg dark:prose-invert prose-headings:text-foreground prose-a:text-primary max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center mt-12 pt-6 border-t border-border">
          <Tag className="h-5 w-5 text-muted-foreground mr-2" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
