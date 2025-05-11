import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getAllPosts, type Post } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog - Venkatesh Shivandi",
  description: "Articles and insights on AI, machine learning, and software development.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container max-w-6xl py-12 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-3">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts, insights, and explorations in artificial intelligence, machine learning, and software development.
        </p>
      </div>

      {/* Featured Post */}
      {posts.find(post => post.featured) && (
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Featured Article</h2>
          <FeaturedPostCard post={posts.find(post => post.featured) as Post} />
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.filter(post => !post.featured).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,206,209,0.3)] dark:hover:shadow-[0_8px_30px_rgba(0,255,255,0.4)]">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-64 md:h-full">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link href={`/blog/${post.id}`} className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">
              Read Article
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {post.category}
            </Badge>
            <span className="text-sm text-muted-foreground">{formatDate(post.date)}</span>
          </div>
          <Link href={`/blog/${post.id}`} className="group-hover:text-primary transition-colors">
            <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
          </Link>
          <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center mt-auto">
            <div className="h-10 w-10 rounded-full overflow-hidden relative mr-3">
              <Image 
                src={post.author.image} 
                alt={post.author.name}
                fill
                className="object-cover" 
              />
            </div>
            <div>
              <p className="font-medium text-sm">{post.author.name}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,206,209,0.2)] dark:hover:shadow-[0_8px_30px_rgba(0,255,255,0.3)]">
      <div className="relative h-52">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link href={`/blog/${post.id}`} className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">
            Read Article
          </Link>
        </div>
      </div>
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {post.category}
          </Badge>
          <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
        </div>
        <Link href={`/blog/${post.id}`} className="group-hover:text-primary transition-colors">
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center mt-auto">
          <div className="h-8 w-8 rounded-full overflow-hidden relative mr-2">
            <Image 
              src={post.author.image} 
              alt={post.author.name}
              fill
              className="object-cover" 
            />
          </div>
          <div>
            <p className="font-medium text-xs">{post.author.name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
