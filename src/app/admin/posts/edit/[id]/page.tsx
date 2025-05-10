
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

// Dummy data for now
const dummyPosts = [
  { id: "1", title: "Understanding Large Language Models", slug: "understanding-llms", category: "ai-news", content: "Detailed content here...", excerpt: "Short summary", coverImage: "https://picsum.photos/seed/llm/400/200", published: true },
  { id: "2", title: "Getting Started with TensorFlow.js", slug: "tfjs-tutorial", category: "tutorials", content: "Tutorial content...", excerpt: "TF.js guide", coverImage: "", published: false },
];

const categories = [
  { slug: "ai-news", name: "AI News" },
  { slug: "tutorials", name: "Tutorials" },
  { slug: "case-studies", name: "Case Studies" },
  { slug: "industry-insights", name: "Industry Insights" },
  { slug: "how-to-guides", name: "How-To Guides" },
];

const postSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters." }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug can only contain lowercase letters, numbers, and hyphens." }),
  category: z.string().min(1, { message: "Please select a category." }),
  content: z.string().min(50, { message: "Content must be at least 50 characters." }),
  excerpt: z.string().max(200, { message: "Excerpt cannot exceed 200 characters." }).optional(),
  coverImage: z.string().url({ message: "Please enter a valid URL for the cover image." }).optional().or(z.literal('')),
  published: z.boolean().default(false),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function EditPostPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    // Default values will be set in useEffect
  });

  useEffect(() => {
    if (postId) {
      // In a real app, fetch post data from Firestore using postId
      const postToEdit = dummyPosts.find(p => p.id === postId);
      if (postToEdit) {
        form.reset({
          title: postToEdit.title,
          slug: postToEdit.slug,
          category: postToEdit.category,
          content: postToEdit.content,
          excerpt: postToEdit.excerpt || "",
          coverImage: postToEdit.coverImage || "",
          published: postToEdit.published,
        });
      } else {
        toast({ title: "Error", description: "Post not found.", variant: "destructive" });
        router.push("/admin/posts");
      }
      setIsLoading(false);
    }
  }, [postId, form, router, toast]);

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    console.log("Updated post data:", data);
    // Here you would typically send the updated data to your backend/Firestore
    toast({
      title: "Post Updated (Simulated)",
      description: `The post "${data.title}" has been updated.`,
    });
    router.push("/admin/posts");
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><p>Loading post data...</p></div>;
  }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Edit Post</h1>
        <p className="text-muted-foreground">Update the details for your blog post or tutorial.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>Modify the content and metadata for your post.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...form.register("title")} className="mt-1" />
              {form.formState.errors.title && <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...form.register("slug")} className="mt-1" />
              {form.formState.errors.slug && <p className="text-sm text-destructive mt-1">{form.formState.errors.slug.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.category && <p className="text-sm text-destructive mt-1">{form.formState.errors.category.message}</p>}
            </div>

            <div>
              <Label htmlFor="content">Content (Markdown supported)</Label>
              <Textarea id="content" {...form.register("content")} rows={10} className="mt-1" />
              {form.formState.errors.content && <p className="text-sm text-destructive mt-1">{form.formState.errors.content.message}</p>}
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt (Optional)</Label>
              <Textarea id="excerpt" {...form.register("excerpt")} rows={3} className="mt-1" />
              {form.formState.errors.excerpt && <p className="text-sm text-destructive mt-1">{form.formState.errors.excerpt.message}</p>}
            </div>

            <div>
              <Label htmlFor="coverImage">Cover Image URL (Optional)</Label>
              <Input id="coverImage" {...form.register("coverImage")} type="url" className="mt-1" />
              {form.formState.errors.coverImage && <p className="text-sm text-destructive mt-1">{form.formState.errors.coverImage.message}</p>}
            </div>
            
            <div className="flex items-center space-x-2">
               <Controller
                name="published"
                control={form.control}
                render={({ field }) => (
                   <Switch
                    id="published"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="published" className="text-sm font-medium">Publish Post</Label>
            </div>

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => router.push('/admin/posts')}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Update Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
