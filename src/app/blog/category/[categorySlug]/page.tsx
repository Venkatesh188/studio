
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Tag, CalendarDays, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostsByCategory } from "@/lib/post-manager";
import type { Post, Category } from "@/types/post";

const blogCategories: Category[] = [
  { name: "AI News", slug: "ai-news", description: "Latest updates and breakthroughs in the world of AI." },
  { name: "Tutorials", slug: "tutorials", description: "Step-by-step guides to learn new AI skills." },
  { name: "Case Studies", slug: "case-studies", description: "Real-world applications and successes of AI." },
  { name: "Industry Insights", slug: "industry-insights", description: "Expert perspectives on AI trends and impacts." },
  { name: "How-To Guides", slug: "how-to-guides", description: "Practical instructions for AI tools and techniques." },
];

const categoriesMap: { [key: string]: string } = Object.fromEntries(
  blogCategories.map(cat => [cat.slug, cat.name])
);

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.categorySlug as string;

  const [postsInCategory, setPostsInCategory] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoryName = categoriesMap[categorySlug] || "Selected Category";

  useEffect(() => {
    if (categorySlug) {
      setIsLoading(true);
      const fetchedPosts = getPostsByCategory(categorySlug);
      setPostsInCategory(fetchedPosts.map(p => ({ ...p, categoryName: categoriesMap[p.category] || p.category })));
      setIsLoading(false);
    }
  }, [categorySlug]);

  if (isLoading) {
    return (
      <SectionWrapper id={`category-${categorySlug}-loading`} title={`Loading ${categoryName} Posts...`} subtitle="Please wait">
        <div className="text-center">
          <p className="text-muted-foreground mb-6">Fetching posts...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (!categoriesMap[categorySlug]) {
     return (
      <SectionWrapper id="category-not-found" title="Category Not Found" subtitle="Oops!">
        <div className="text-center">
          <p className="text-muted-foreground mb-6">The category you are looking for does not exist.</p>
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
    <SectionWrapper id={`category-${categorySlug}`} title={categoryName} subtitle="Blog Posts">
      <div className="mb-8">
        <Link href="/blog" className="text-sm text-primary hover:underline inline-flex items-center">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to All Categories
        </Link>
      </div>

      {postsInCategory.length === 0 ? (
        <p className="text-muted-foreground text-center py-10">No posts found in this category yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {postsInCategory.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader className="p-0">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="relative w-full h-48">
                    <Image 
                        src={post.coverImage || post.imageUrl || "https://picsum.photos/seed/defaultcat/400/250"} 
                        alt={post.title} 
                        layout="fill" 
                        objectFit="cover" 
                        data-ai-hint={post.imageHint || "tech article"}
                        className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </CardHeader>
              <CardContent className="flex-grow p-6 space-y-3">
                 <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Tag className="h-3.5 w-3.5" /> <span>{post.categoryName}</span>
                  <CalendarDays className="h-3.5 w-3.5" /> <span>{post.date}</span>
                </div>
                <CardTitle className="text-xl hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground h-20 overflow-hidden">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-2 flex justify-between items-center">
                 <div className="flex items-center text-xs text-muted-foreground">
                    <User className="h-3.5 w-3.5 mr-1.5" /> {post.author}
                  </div>
                <Button variant="link" asChild className="p-0 text-primary hover:text-primary/80 text-sm">
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}

