
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpenText, Tag, CalendarDays, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { WordPressPost, WordPressCategory } from "@/types/wordpress";
import { getRecentPosts, getAllCategories } from "@/lib/wordpress/api";
import { RenderHtmlContent } from "@/lib/htmlRenderer";
import { format } from 'date-fns';

export default function BlogSection() {
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
        setCategories(categoriesData.filter(cat => cat.count && cat.count > 0));
      } catch (error) {
        console.error("Failed to fetch blog section data:", error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <SectionWrapper id="blog-loading" title="Insights & Tutorials" subtitle="Latest from the Blog">
        <p className="text-center text-muted-foreground">Loading blog content...</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="blog" title="Insights & Tutorials" subtitle="Latest from the Blog">
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {recentPosts.length === 0 && !isLoading ? (
          <p className="col-span-full text-center text-muted-foreground">No recent posts to display.</p>
        ) : (
          recentPosts.map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader className="p-0">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="relative w-full h-48">
                    <Image
                      src={post.featuredImage?.node?.sourceUrl || "https://picsum.photos/seed/blogsection/400/250"}
                      alt={post.featuredImage?.node?.altText || post.title}
                      fill={true}
                      style={{objectFit:"cover"}}
                      data-ai-hint={post.featuredImage?.node?.altText?.substring(0,15) || "tech blog"}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </CardHeader>
              <CardContent className="flex-grow p-6 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                   {post.categories?.edges?.[0]?.node && (
                      <><Tag className="h-3.5 w-3.5" /> <span>{post.categories.edges[0].node.name}</span></>
                    )}
                  <CalendarDays className="h-3.5 w-3.5" /> <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                </div>
                <CardTitle className="text-xl hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                {post.excerpt && <RenderHtmlContent htmlString={post.excerpt} className="text-sm text-muted-foreground h-16 overflow-hidden prose-sm dark:prose-invert" />}
              </CardContent>
              <div className="p-6 pt-0 flex justify-between items-center">
                 <div className="flex items-center text-xs text-muted-foreground">
                    {post.author?.node?.name && <><User className="h-3.5 w-3.5 mr-1.5" /> {post.author.node.name}</>}
                  </div>
                <Button variant="link" asChild className="p-0 text-primary hover:text-primary/80 text-sm">
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {categories.length > 0 && (
        <div className="text-center mb-10">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Explore Categories</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button key={category.id} variant="outline" asChild>
                <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/blog">
            <BookOpenText className="mr-2 h-5 w-5" /> Visit Full Blog
          </Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
