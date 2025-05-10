
// This is a placeholder page for posts by category.
// In a real application, you would fetch posts based on the categorySlug.

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Tag, CalendarDays, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy data - replace with Firestore data fetching
const allPosts = [
  { id: "1", title: "The Future of Generative AI", slug: "future-of-generative-ai", excerpt: "Exploring upcoming trends and impacts of generative AI models across industries.", imageUrl: "https://picsum.photos/seed/catpost1/400/250", imageHint: "ai data", categorySlug: "ai-news", categoryName: "AI News", date: "2024-07-28", author: "Venkatesh S." },
  { id: "2", title: "A Beginner's Guide to Prompt Engineering", slug: "beginners-guide-prompt-engineering", excerpt: "Learn the art of crafting effective prompts for better AI-generated results.", imageUrl: "https://picsum.photos/seed/catpost2/400/250", imageHint: "learning code", categorySlug: "tutorials", categoryName: "Tutorials", date: "2024-07-25", author: "Venkatesh S." },
  { id: "3", title: "AI in Personalized Education", slug: "ai-in-personalized-education", excerpt: "How artificial intelligence is tailoring learning experiences for students worldwide.", imageUrl: "https://picsum.photos/seed/catpost3/400/250", imageHint: "education tech", categorySlug: "case-studies", categoryName: "Case Studies", date: "2024-07-22", author: "Venkatesh S." },
  { id: "4", title: "Another AI News Update", slug: "another-ai-news", excerpt: "More news from the AI world.", imageUrl: "https://picsum.photos/seed/catpost4/400/250", imageHint: "news screen", categorySlug: "ai-news", categoryName: "AI News", date: "2024-07-20", author: "Venkatesh S." },
];

const categoriesMap: { [key: string]: string } = {
  "ai-news": "AI News",
  "tutorials": "Tutorials",
  "case-studies": "Case Studies",
  "industry-insights": "Industry Insights",
  "how-to-guides": "How-To Guides",
};


export default async function CategoryPage({ params }: { params: { categorySlug: string } }) {
  const { categorySlug } = params;
  const categoryName = categoriesMap[categorySlug] || "Selected Category";
  
  // Filter posts by categorySlug (dummy implementation)
  const postsInCategory = allPosts.filter(post => post.categorySlug === categorySlug);

  if (postsInCategory.length === 0 && !categoriesMap[categorySlug]) {
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
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative w-full h-48">
                    <Image 
                        src={post.imageUrl} 
                        alt={post.title} 
                        layout="fill" 
                        objectFit="cover" 
                        data-ai-hint={post.imageHint}
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

// Generate static paths for dummy categories if needed for build
// export async function generateStaticParams() {
//   const categorySlugs = ["ai-news", "tutorials", "case-studies"];
//   return categorySlugs.map((slug) => ({
//     categorySlug: slug,
//   }));
// }

