'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Tag, CalendarDays, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getRecentPosts } from "@/lib/post-manager";
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

export default function BlogPage() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const posts = getRecentPosts(3); // Get 3 most recent published posts
    setRecentPosts(posts.map(p => ({...p, categoryName: categoriesMap[p.category] || p.category })));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <SectionWrapper id="blog-page-loading" title="Venkatesh.ai Blog" subtitle="Insights, Tutorials, and News on Artificial Intelligence"><p className="text-center">Loading posts...</p></SectionWrapper>;
  }

  return (
    <SectionWrapper id="blog-page" title="Venkatesh.ai Blog" subtitle="Insights, Tutorials, and News on Artificial Intelligence">
      
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-foreground mb-8">Recent Posts</h2>
        {recentPosts.length === 0 ? (
          <p className="text-muted-foreground text-center">No recent posts available.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader className="p-0">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative w-full h-48">
                      <Image 
                        src={post.coverImage || post.imageUrl || "https://picsum.photos/seed/fallback/400/250"} 
                        alt={post.title} 
                        layout="fill" 
                        objectFit="cover" 
                        data-ai-hint={post.imageHint || "tech blog"}
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Tag className="h-3.5 w-3.5" /> <span>{post.categoryName || post.category}</span>
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
      </div>

      <div>
        <h2 className="text-3xl font-semibold text-foreground mb-8">Explore by Category</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogCategories.map((category) => (
            <Card key={category.slug} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-primary hover:text-primary/90">
                  <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/blog/category/${category.slug}`}>
                    View Posts <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}