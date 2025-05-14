
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Tag, CalendarDays, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { WordPressPost, WordPressCategory } from "@/types/wordpress";
import { getRecentPosts, getAllCategories } from "@/lib/wordpress/api";
import { format } from 'date-fns';

export default function BlogPage() {
  const [recentPosts, setRecentPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<WordPressCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const [postsData, categoriesData] = await Promise.all([
          getRecentPosts(3), // Fetch 3 most recent posts
          getAllCategories()
        ]);
        setRecentPosts(postsData);
        setCategories(categoriesData.filter(cat => cat.count && cat.count > 0)); // Filter categories with posts
      } catch (error) {
        console.error("Failed to fetch blog page data:", error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SectionWrapper id="blog-page-loading" title="Venkatesh.ai Blog" subtitle="Insights, Tutorials, and News on Artificial Intelligence">
        <p className="text-center text-muted-foreground">Loading posts and categories...</p>
      </SectionWrapper>
    );
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
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <div className="relative w-full h-48">
                      <Image 
                        src={post.featuredImage?.node?.sourceUrl || "https://picsum.photos/seed/fallbackblog/400/250"} 
                        alt={post.featuredImage?.node?.altText || post.title} 
                        fill={true}
                        style={{objectFit:"cover"}}
                        data-ai-hint={post.featuredImage?.node?.altText?.substring(0,15) || "tech blog"}
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="flex-grow p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    {post.categories?.edges?.[0]?.node && (
                      <><Tag className="h-3.5 w-3.5" /> <span>{post.categories.edges[0].node.name}</span></>
                    )}
                    <CalendarDays className="h-3.5 w-3.5" /> <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  {post.excerpt && <RenderHtmlContent htmlString={post.excerpt} className="text-sm text-muted-foreground h-20 overflow-hidden prose-sm dark:prose-invert" />}
                </CardContent>
                <div className="p-6 pt-2 flex justify-between items-center">
                   <div className="flex items-center text-xs text-muted-foreground">
                      {post.author?.node?.name && <><User className="h-3.5 w-3.5 mr-1.5" /> {post.author.node.name}</>}
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
        {categories.length === 0 ? (
           <p className="text-muted-foreground text-center">No categories with posts available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-primary hover:text-primary/90">
                    <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
                  </CardTitle>
                  {category.description && <CardDescription>{category.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog/category/${category.slug}`}>
                      View Posts ({category.count || 0}) <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
