'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2, EyeIcon } from "lucide-react";
import Link from "next/link";

// Dummy data that matches our actual posts
const dummyPosts = [
  { id: "1", title: "The Future of Generative AI", slug: "future-of-generative-ai", category: "AI News", date: "2024-07-28", status: "Published" },
  { id: "2", title: "A Beginner's Guide to Prompt Engineering", slug: "beginners-guide-prompt-engineering", category: "Tutorials", date: "2024-07-25", status: "Published" },
  { id: "3", title: "AI in Personalized Education", slug: "ai-in-personalized-education", category: "Case Studies", date: "2024-07-22", status: "Published" },
  { id: "4", title: "Navigating Ethical AI Development", slug: "navigating-ethical-ai", category: "Industry Insights", date: "2024-07-19", status: "Published" },
];

export default function AdminPostsPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Posts</h1>
          <p className="text-muted-foreground">Create, edit, and organize your blog posts and tutorials.</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Post
          </Link>
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>A list of all your blog posts.</CardDescription>
        </CardHeader>
        <CardContent>
          {dummyPosts.length === 0 ? (
            <p className="text-muted-foreground">No posts found. Start by creating a new one!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  {dummyPosts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{post.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{post.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{post.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Button variant="ghost" size="icon" asChild title="View Post">
                           <Link href={`/blog/${post.slug}`} target="_blank">
                            <EyeIcon className="h-4 w-4 text-muted-foreground hover:text-primary" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild title="Edit Post">
                          <Link href={`/admin/posts/edit/${post.id}`}>
                            <Edit className="h-4 w-4 text-muted-foreground hover:text-primary" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete Post" onClick={() => alert(`Delete post ${post.id}? (Not implemented)`)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
