'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { PlusCircle, Edit, Trash2, EyeIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPosts, deletePost as deletePostFromStorage } from "@/lib/post-manager";
import type { Post } from "@/types/post";
import { useToast } from "@/hooks/use-toast";

const categoriesMap: { [key: string]: string } = {
  "ai-news": "AI News",
  "tutorials": "Tutorials",
  "case-studies": "Case Studies",
  "industry-insights": "Industry Insights",
  "how-to-guides": "How-To Guides",
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadPosts = () => {
      setIsLoading(true);
      const fetchedPosts = getAllPosts();
      setPosts(fetchedPosts.map(p => ({...p, categoryName: categoriesMap[p.category] || p.category })));
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  const handleDeletePost = (postId: string, postTitle: string) => {
    const success = deletePostFromStorage(postId);
    if (success) {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      toast({
        title: "Post Deleted",
        description: `The post "${postTitle}" has been deleted successfully.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete the post.",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><p>Loading posts...</p></div>;
  }

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
          {posts.length === 0 ? (
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
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{post.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{post.categoryName || post.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{post.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.published ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"}`}>
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
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
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" title="Delete Post">
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the post
                                "{post.title}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeletePost(post.id, post.title)} className="bg-destructive hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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