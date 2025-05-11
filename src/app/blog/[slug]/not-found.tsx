import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BlogPostNotFound() {
  return (
    <div className="container max-w-3xl py-20 px-4 sm:px-6 lg:px-8 mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Blog Post Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">
        The blog post you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/blog" className="inline-flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>
    </div>
  );
} 