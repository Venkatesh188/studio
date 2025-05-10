// This is a placeholder page for a single blog post.
// In a real application, you would fetch the post data based on the slug.
// For now, it will display some dummy content.

import SectionWrapper from "@/components/shared/SectionWrapper";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

// Dummy post data - replace with actual data fetching logic
const getPostBySlug = async (slug: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 200)); 
  const posts = [
    { id: "1", slug: "future-of-generative-ai", title: "The Future of Generative AI", content: "This is the full content for 'The Future of Generative AI'. It explores upcoming trends and impacts of generative AI models across industries. \n\nGenerative AI is rapidly evolving... \n\n## Key Trends\n\n- Trend 1\n- Trend 2\n\n## Conclusion\n\nThe future is exciting!", imageUrl: "https://picsum.photos/seed/blogdetail1/800/400", imageHint: "futuristic ai", category: "AI News", date: "2024-07-28", author: "Venkatesh S.", tags: ["Generative AI", "Future Tech", "Machine Learning"] },
    { id: "2", slug: "beginners-guide-prompt-engineering", title: "A Beginner's Guide to Prompt Engineering", content: "Full content for 'A Beginner's Guide to Prompt Engineering'. Learn the art of crafting effective prompts for better AI-generated results. \n\n### What is Prompt Engineering?\n\nIt's the process of structuring text that can be interpreted and understood by a generative AI model. \n\n### Best Practices\n\n1. Be specific.\n2. Provide context.\n3. Iterate.", imageUrl: "https://picsum.photos/seed/blogdetail2/800/400", imageHint: "coding tutorial", category: "Tutorials", date: "2024-07-25", author: "Venkatesh S.", tags: ["Prompt Engineering", "AI Beginners", "Tutorial"] },
  ];
  return posts.find(p => p.slug === slug);
};


export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return (
      <SectionWrapper id="post-not-found" title="Post Not Found" subtitle="Oops!">
        <div className="text-center">
          <p className="text-muted-foreground mb-6">The blog post you are looking for does not exist or has been moved.</p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  // Basic markdown to HTML conversion (very simplified)
  const renderMarkdown = (markdown: string) => {
    return markdown
      .split('\n\n').map((paragraph, i) => {
        if (paragraph.startsWith('### ')) {
          return <h3 key={i} className="text-xl font-semibold mt-6 mb-2">{paragraph.substring(4)}</h3>;
        }
        if (paragraph.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-semibold mt-8 mb-3">{paragraph.substring(3)}</h2>;
        }
        if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').map(item => item.substring(2));
            return <ul key={i} className="list-disc list-inside space-y-1 my-4 ml-4 text-foreground/90">{items.map((li, idx) => <li key={idx}>{li}</li>)}</ul>
        }
        if (paragraph.startsWith('1. ')) {
             const items = paragraph.split('\n').map(item => item.substring(3));
            return <ol key={i} className="list-decimal list-inside space-y-1 my-4 ml-4 text-foreground/90">{items.map((li, idx) => <li key={idx}>{li}</li>)}</ol>
        }
        return <p key={i} className="text-foreground/90 leading-relaxed my-4">{paragraph}</p>;
      }).reduce((acc: JSX.Element[], elem) => acc.concat(elem), []);
  };


  return (
    <SectionWrapper id={`post-${post.slug}`} className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <Link href="/blog" className="text-sm text-primary hover:underline inline-flex items-center mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{post.title}</h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center"><CalendarDays className="mr-1.5 h-4 w-4" /> {post.date}</span>
            <span className="inline-flex items-center"><User className="mr-1.5 h-4 w-4" /> {post.author}</span>
            <span className="inline-flex items-center"><Tag className="mr-1.5 h-4 w-4" /> {post.category}</span>
          </div>
        </header>

        {post.imageUrl && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image 
                src={post.imageUrl} 
                alt={post.title} 
                layout="fill" 
                objectFit="cover" 
                data-ai-hint={post.imageHint}
            />
          </div>
        )}

        <article className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground">
          {/* This is where you'd render Markdown content. For now, a simple split. */}
          {renderMarkdown(post.content)}
        </article>

        {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
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

export async function generateStaticParams() {
  const posts = [
    { slug: "future-of-generative-ai" },
    { slug: "beginners-guide-prompt-engineering" },
  ];
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
