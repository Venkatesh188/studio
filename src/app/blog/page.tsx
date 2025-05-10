
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Tag, CalendarDays, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Dummy data - replace with Firestore data fetching
const recentPosts = [
  { id: "1", title: "The Future of Generative AI", slug: "future-of-generative-ai", excerpt: "Exploring upcoming trends and impacts of generative AI models across industries.", imageUrl: "https://picsum.photos/seed/blogpost1/400/250", imageHint: "ai future", category: "AI News", date: "2024-07-28", author: "Venkatesh S." },
  { id: "2", title: "A Beginner's Guide to Prompt Engineering", slug: "beginners-guide-prompt-engineering", excerpt: "Learn the art of crafting effective prompts for better AI-generated results.", imageUrl: "https://picsum.photos/seed/blogpost2/400/250", imageHint: "code screen", category: "Tutorials", date: "2024-07-25", author: "Venkatesh S." },
  { id: "3", title: "AI in Personalized Education", slug: "ai-in-personalized-education", excerpt: "How artificial intelligence is tailoring learning experiences for students worldwide.", imageUrl: "https://picsum.photos/seed/blogpost3/400/250", imageHint: "digital learning", category: "Case Studies", date: "2024-07-22", author: "Venkatesh S." },
  { id: "4", title: "Navigating Ethical AI Development", slug: "navigating-ethical-ai", excerpt: "Key considerations for building responsible and ethical AI systems.", imageUrl: "https://picsum.photos/seed/blogpost4/400/250", imageHint: "ethics compass", category: "Industry Insights", date: "2024-07-19", author: "Venkatesh S." },
];

const blogCategories = [
  { name: "AI News", slug: "ai-news", description: "Latest updates and breakthroughs in the world of AI." },
  { name: "Tutorials", slug: "tutorials", description: "Step-by-step guides to learn new AI skills." },
  { name: "Case Studies", slug: "case-studies", description: "Real-world applications and successes of AI." },
  { name: "Industry Insights", slug: "industry-insights", description: "Expert perspectives on AI trends and impacts." },
  { name: "How-To Guides", slug: "how-to-guides", description: "Practical instructions for AI tools and techniques." },
];

export default function BlogPage() {
  return (
    <SectionWrapper id="blog-page" title="Venkatesh.ai Blog" subtitle="Insights, Tutorials, and News on Artificial Intelligence">
      
      {/* Recent Posts Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-foreground mb-8">Recent Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.slice(0,3).map((post) => ( // Show first 3 recent posts
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
                  <Tag className="h-3.5 w-3.5" /> <span>{post.category}</span>
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
      </div>

      {/* Categories Section */}
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
