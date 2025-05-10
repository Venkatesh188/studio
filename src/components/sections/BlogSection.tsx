
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpenText, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Dummy data for recent posts - replace with actual data fetching
const recentPosts = [
  { id: "1", title: "The Future of Generative AI", excerpt: "Exploring upcoming trends and impacts of generative AI models across industries.", imageUrl: "https://picsum.photos/seed/genai/400/250", imageHint: "abstract ai", category: "AI News", slug: "future-of-generative-ai" },
  { id: "2", title: "A Beginner's Guide to Prompt Engineering", excerpt: "Learn the art of crafting effective prompts for better AI-generated results.", imageUrl: "https://picsum.photos/seed/prompt/400/250", imageHint: "code learning", category: "Tutorials", slug: "beginners-guide-prompt-engineering" },
  { id: "3", title: "AI in Personalized Education", excerpt: "How artificial intelligence is tailoring learning experiences for students worldwide.", imageUrl: "https://picsum.photos/seed/aiedu/400/250", imageHint: "education technology", category: "Case Studies", slug: "ai-in-personalized-education" },
];

const blogCategories = [
  { name: "AI News", slug: "ai-news" },
  { name: "Tutorials", slug: "tutorials" },
  { name: "Case Studies", slug: "case-studies" },
  { name: "Industry Insights", slug: "industry-insights" },
  { name: "How-To Guides", slug: "how-to-guides" },
];

export default function BlogSection() {
  return (
    <SectionWrapper id="blog" title="Insights & Tutorials" subtitle="Latest from the Blog">
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {recentPosts.map((post) => (
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
            <CardContent className="flex-grow p-6 space-y-2">
              <span className="text-xs text-primary font-semibold uppercase">{post.category}</span>
              <CardTitle className="text-xl hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground h-16 overflow-hidden">
                {post.excerpt}
              </CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
              <Button variant="link" asChild className="p-0 text-primary hover:text-primary/80">
                <Link href={`/blog/${post.slug}`}>
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mb-10">
        <h3 className="text-2xl font-semibold text-foreground mb-4">Explore Categories</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {blogCategories.map((category) => (
            <Button key={category.slug} variant="outline" asChild>
              <Link href={`/blog/category/${category.slug}`}>{category.name}</Link>
            </Button>
          ))}
        </div>
      </div>

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
