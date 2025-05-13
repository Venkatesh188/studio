
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller, type SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAboutContent, updateAboutContent } from "@/lib/about-manager";
import type { AboutContent, Achievement } from "@/types/cms";
import { ICONS } from "@/types/cms"; // Import the ICONS map
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, PlusCircle } from "lucide-react";

const achievementSchema = z.object({
  id: z.string().optional(), // For existing achievements
  iconName: z.string().min(1, { message: "Icon is required." }),
  text: z.string().min(10, { message: "Achievement text must be at least 10 characters." }),
});

const aboutSchema = z.object({
  mainText: z.string().min(50, { message: "Main text must be at least 50 characters (Markdown)." }),
  imageUrl: z.string().url({ message: "Please enter a valid URL for the image." }).optional().or(z.literal('')),
  imageHint: z.string().optional(),
  achievements: z.array(achievementSchema).min(1, { message: "At least one achievement is required." }),
});

type AboutFormValues = z.infer<typeof aboutSchema>;

const iconOptions = Object.keys(ICONS);

export default function AdminAboutPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      mainText: "",
      imageUrl: "",
      imageHint: "",
      achievements: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "achievements",
  });

  useEffect(() => {
    setIsLoading(true);
    const content = getAboutContent();
    if (content) {
      form.reset({
        mainText: content.mainText,
        imageUrl: content.imageUrl || "",
        imageHint: content.imageHint || "",
        achievements: content.achievements.map(ach => ({ ...ach, id: ach.id || `temp-${Math.random()}` })),
      });
    }
    setIsLoading(false);
  }, [form]);

  const onSubmit: SubmitHandler<AboutFormValues> = async (data) => {
    try {
      const currentContent = getAboutContent(); // To get existing ID
      const contentToSave: AboutContent = {
        id: currentContent.id, // Use existing ID
        ...data,
        achievements: data.achievements.map(ach => ({
          ...ach,
          id: ach.id && !ach.id.startsWith('temp-') ? ach.id : `ach-${Date.now()}-${Math.random().toString(36).substring(2,7)}`
        })),
      };
      updateAboutContent(contentToSave);
      toast({
        title: "About Page Updated",
        description: "The About page content has been updated successfully.",
        variant: "default",
      });
      // router.push("/admin/dashboard"); // Or stay on page
    } catch (error) {
       console.error("Failed to update About page:", error);
       toast({
        title: "Error",
        description: "Failed to update the About page. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><p>Loading About page content...</p></div>;
  }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Manage About Page</h1>
        <p className="text-muted-foreground">Update the content for your 'About Me' section.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>About Page Content</CardTitle>
          <CardDescription>Modify the text, image, and achievements. Use Markdown for the main text.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="mainText">Main Text (Markdown)</Label>
              <Textarea id="mainText" {...form.register("mainText")} rows={10} className="mt-1" />
              {form.formState.errors.mainText && <p className="text-sm text-destructive mt-1">{form.formState.errors.mainText.message}</p>}
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" {...form.register("imageUrl")} type="url" className="mt-1" />
              {form.formState.errors.imageUrl && <p className="text-sm text-destructive mt-1">{form.formState.errors.imageUrl.message}</p>}
            </div>

            <div>
              <Label htmlFor="imageHint">Image AI Hint (Optional, 1-2 words)</Label>
              <Input id="imageHint" {...form.register("imageHint")} className="mt-1" />
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-medium">Achievements</Label>
              {fields.map((field, index) => (
                <Card key={field.id} className="p-4 space-y-3 bg-muted/50">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Achievement {index + 1}</h4>
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <Label htmlFor={`achievements.${index}.iconName`}>Icon</Label>
                    <Controller
                      name={`achievements.${index}.iconName`}
                      control={form.control}
                      render={({ field: selectField }) => (
                        <Select onValueChange={selectField.onChange} value={selectField.value}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                          <SelectContent>
                            {iconOptions.map((iconName) => (
                              <SelectItem key={iconName} value={iconName}>
                                {iconName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {form.formState.errors.achievements?.[index]?.iconName && <p className="text-sm text-destructive mt-1">{form.formState.errors.achievements[index]?.iconName?.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor={`achievements.${index}.text`}>Text</Label>
                    <Textarea id={`achievements.${index}.text`} {...form.register(`achievements.${index}.text`)} rows={2} className="mt-1" />
                    {form.formState.errors.achievements?.[index]?.text && <p className="text-sm text-destructive mt-1">{form.formState.errors.achievements[index]?.text?.message}</p>}
                  </div>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ iconName: iconOptions[0] || "", text: "" , id: `temp-${Date.now()}`})}
                className="flex items-center"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Achievement
              </Button>
               {form.formState.errors.achievements && !form.formState.errors.achievements.root?.message && form.formState.errors.achievements.message && (
                 <p className="text-sm text-destructive mt-1">{form.formState.errors.achievements.message}</p>
               )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Update About Page"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

