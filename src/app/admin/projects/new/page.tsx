
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { createProject as createProjectInStorage } from "@/lib/project-manager";

const projectSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters." }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug can only contain lowercase letters, numbers, and hyphens." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters (HTML supported)." }),
  problem: z.string().min(20, { message: "Problem statement must be at least 20 characters (HTML supported)." }),
  tools: z.string().min(1, {message: "Please list at least one tool, comma-separated."}), 
  outcome: z.string().min(20, { message: "Outcome must be at least 20 characters (HTML supported)." }),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  imageHint: z.string().optional(),
  liveLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  repoLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  published: z.boolean().default(false),
  tags: z.string().optional(), 
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      problem: "",
      tools: "",
      outcome: "",
      imageUrl: "",
      imageHint: "",
      liveLink: "",
      repoLink: "",
      published: false,
      tags: "",
    },
  });

  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    try {
      const projectDataToSave = {
        ...data,
        tools: data.tools.split(',').map(tool => tool.trim()).filter(tool => tool),
        tags: data.tags?.split(',').map(tag => tag.trim()).filter(tag => tag) || [],
      };
      const newProject = createProjectInStorage(projectDataToSave);
      toast({
        title: "Project Created",
        description: `The project "${newProject.title}" has been saved successfully.`,
        variant: "default",
      });
      router.push("/admin/projects"); 
    } catch (error) {
       console.error("Failed to create project:", error);
       toast({
        title: "Error",
        description: "Failed to create the project. Please try again.",
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
        <h1 className="text-3xl font-bold text-foreground">Create New Project</h1>
        <p className="text-muted-foreground">Fill in the details for your new portfolio project.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Enter the information for your project. Use HTML for description, problem, and outcome fields.</CardDescription>
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
              <Input id="slug" {...form.register("slug")} placeholder="e.g., my-awesome-project" className="mt-1" />
              {form.formState.errors.slug && <p className="text-sm text-destructive mt-1">{form.formState.errors.slug.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="description">Description (HTML supported)</Label>
              <Textarea id="description" {...form.register("description")} rows={5} className="mt-1" placeholder="Enter project description. Use HTML for formatting." />
              {form.formState.errors.description && <p className="text-sm text-destructive mt-1">{form.formState.errors.description.message}</p>}
            </div>

            <div>
              <Label htmlFor="problem">Problem Statement (HTML supported)</Label>
              <Textarea id="problem" {...form.register("problem")} rows={3} className="mt-1" placeholder="Describe the problem this project solves. Use HTML for formatting." />
              {form.formState.errors.problem && <p className="text-sm text-destructive mt-1">{form.formState.errors.problem.message}</p>}
            </div>

            <div>
              <Label htmlFor="tools">Tools Used (comma-separated)</Label>
              <Input id="tools" {...form.register("tools")} placeholder="Python, TensorFlow, Scikit-learn" className="mt-1" />
              {form.formState.errors.tools && <p className="text-sm text-destructive mt-1">{form.formState.errors.tools.message}</p>}
            </div>

            <div>
              <Label htmlFor="outcome">Outcome (HTML supported)</Label>
              <Textarea id="outcome" {...form.register("outcome")} rows={3} className="mt-1" placeholder="Describe the outcome or results. Use HTML for formatting." />
              {form.formState.errors.outcome && <p className="text-sm text-destructive mt-1">{form.formState.errors.outcome.message}</p>}
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" {...form.register("imageUrl")} type="url" className="mt-1" placeholder="https://example.com/image.jpg" />
              {form.formState.errors.imageUrl && <p className="text-sm text-destructive mt-1">{form.formState.errors.imageUrl.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="imageHint">Image AI Hint (Optional, 1-2 words)</Label>
              <Input id="imageHint" {...form.register("imageHint")} className="mt-1" placeholder="e.g. tech abstract" />
            </div>

            <div>
              <Label htmlFor="liveLink">Live Demo Link (Optional)</Label>
              <Input id="liveLink" {...form.register("liveLink")} type="url" className="mt-1" placeholder="https://projectdemo.com" />
              {form.formState.errors.liveLink && <p className="text-sm text-destructive mt-1">{form.formState.errors.liveLink.message}</p>}
            </div>

            <div>
              <Label htmlFor="repoLink">Repository Link (Optional)</Label>
              <Input id="repoLink" {...form.register("repoLink")} type="url" className="mt-1" placeholder="https://github.com/user/repo" />
              {form.formState.errors.repoLink && <p className="text-sm text-destructive mt-1">{form.formState.errors.repoLink.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="tags">Tags (comma-separated, Optional)</Label>
              <Input id="tags" {...form.register("tags")} placeholder="AI, Machine Learning, Data Science" className="mt-1" />
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
              <Label htmlFor="published" className="text-sm font-medium">Publish Project</Label>
            </div>


            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Create Project"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
