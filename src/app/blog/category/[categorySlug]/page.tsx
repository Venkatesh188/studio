
'use client';

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Tag, CalendarDays, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, use } from "react"; // Added use
import type { WordPressPost, WordPressCategory } from "@/types/wordpress";
import { getPostsByCategorySlug, getAllCategories } from "@/lib/wordpress/api";
import { RenderHtmlContent } from "@/lib/htmlRenderer";
import { format } from 'date-fns';

export default function CategoryPage({ params }: { params: { categorySlug: string } }) {
  const { categorySlug } = params; // Destructure slug directly from props.params

  const [postsInCategory, setPostsInCategory] = useState<WordPressPost[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<WordPressCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState<any>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const POSTS_PER_PAGE = 6;

  const fetchCategoryAndPosts = async (slug: string, after: string | null = null) => {
     if (after) setIsLoadingMore(true); else setIsLoading(true);

    try {
      if (!after) { // Only fetch category details on initial load
        const allCategories = await getAllCategories();
        const currentCategory = allCategories.find(cat => cat.slug === slug);
        setCategoryDetails(currentCategory || null);
      }

      const data = await getPostsByCategorySlug(slug, POSTS_PER_PAGE, after);
      setPostsInCategory(prev => after ? [...prev, ...data.posts] : data.posts);
      setPageInfo(data.pageInfo);

    } catch (error) {
      console.error(`Failed to fetch posts for category ${slug}:`, error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };
  
  useEffect(() => {
    if (categorySlug) {
      fetchCategoryAndPosts(categorySlug as string);
    }
  }, [categorySlug]);


  const handleLoadMore = () => {
    if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
      fetchCategoryAndPosts(categorySlug as string, pageInfo.endCursor);
    }
  };


  if (isLoading && postsInCategory.length === 0) {
    return (
      <SectionWrapper id={`category-${categorySlug}-loading`} title={`Loading ${categoryDetails?.name || categorySlug} Posts...`} subtitle="Please wait">
        <div className="text-center">
          <p className="text-muted-foreground mb-6">Fetching posts...</p>
        </div>
      </SectionWrapper>
    );
  }

  if (!categoryDetails && !isLoading) {
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
  
  const categoryName = categoryDetails?.name || "Selected Category";

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
                      src={post.featuredImage?.node?.sourceUrl || "https://picsum.photos/seed/catpost/400/250"}
                      alt={post.featuredImage?.node?.altText || post.title}
                      fill={true}
                      style={{objectFit:"cover"}}
                      data-ai-hint={post.featuredImage?.node?.altText?.substring(0,15) || "tech article"}
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
       {pageInfo?.hasNextPage && (
        <div className="mt-12 text-center">
          <Button onClick={handleLoadMore} disabled={isLoadingMore} size="lg">
            {isLoadingMore ? 'Loading More...' : 'Load More Posts'}
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}
