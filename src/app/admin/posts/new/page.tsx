
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
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { createPost as createPostInStorage } from "@/lib/post-manager";
import type { Category } from "@/types/post";


const categories: Category[] = [
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
  content: z.string().min(50, { message: "Content must be at least 50 characters (MDX supported)." }),
  excerpt: z.string().max(200, { message: "Excerpt cannot exceed 200 characters." }).optional().default(""),
  coverImage: z.string().url({ message: "Please enter a valid URL for the cover image." }).optional().or(z.literal('')),
  published: z.boolean().default(false),
});

type PostFormValues = z.infer<typeof postSchema>;

export default function NewPostPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      content: "",
      excerpt: "",
      coverImage: "",
      published: false,
    },
  });

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    try {
      const newPost = createPostInStorage(data);
      toast({
        title: "Post Created",
        description: `The post "${newPost.title}" has been saved successfully.`,
        variant: "default",
      });
      router.push("/admin/posts"); 
    } catch (error) {
       console.error("Failed to create post:", error);
       toast({
        title: "Error",
        description: "Failed to create the post. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    form.setValue("title", title);
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-") 
      .replace(/[^\w-]+/g, "") 
      .replace(/--+/g, "-") 
      .replace(/^-+/, "") 
      .replace(/-+$/, ""); 
    form.setValue("slug", slug, { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create New Post</h1>
        <p className="text-muted-foreground">Fill in the details for your new blog post or tutorial.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>Enter the content and metadata for your post. Use MDX for the content field to include rich formatting, code snippets, images, and interactive components (rendering of custom React components in MDX requires further setup).</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...form.register("title")} onChange={handleTitleChange} className="mt-1" />
              {form.formState.errors.title && <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>}
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...form.register("slug")} placeholder="e.g., my-awesome-post" className="mt-1" />
              {form.formState.errors.slug && <p className="text-sm text-destructive mt-1">{form.formState.errors.slug.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Label htmlFor="content">Content (MDX supported)</Label>
              <Textarea 
                id="content" 
                {...form.register("content")} 
                rows={15} 
                className="mt-1 font-mono text-sm" 
                placeholder="Enter content using MDX. E.g.,\n# My Heading\n\nSome **bold** text and *italic* text.\n\n```javascript\nconsole.log('Hello, MDX!');\n```\n\n<MyCustomComponent />\n\n![Alt text](image-url.jpg)" 
              />
              {form.formState.errors.content && <p className="text-sm text-destructive mt-1">{form.formState.errors.content.message}</p>}
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt (Optional)</Label>
              <Textarea id="excerpt" {...form.register("excerpt")} rows={3} className="mt-1" placeholder="A short summary of the post..." />
              {form.formState.errors.excerpt && <p className="text-sm text-destructive mt-1">{form.formState.errors.excerpt.message}</p>}
            </div>

            <div>
              <Label htmlFor="coverImage">Cover Image URL (Optional)</Label>
              <Input id="coverImage" {...form.register("coverImage")} type="url" className="mt-1" placeholder="https://example.com/image.jpg" />
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
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Create Post"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
