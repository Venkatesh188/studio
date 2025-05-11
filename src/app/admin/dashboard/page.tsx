'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Newspaper, PlusCircle, BarChart3, Tags, Clock } from "lucide-react";

export default function AdminDashboardPage() {
  // Stats based on our created blog posts
  const stats = {
    totalPosts: 4,
    categories: 4, // AI News, Tutorials, Case Studies, Industry Insights
    tags: 10, // Approximate count from all our posts
    lastPublished: "July 28, 2024"
  };

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome! Manage your website content from here.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <Newspaper className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.categories}</div>
              <BarChart3 className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.tags}</div>
              <Tags className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{stats.lastPublished}</div>
              <Clock className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Newspaper className="h-6 w-6" />
              Manage Posts
            </CardTitle>
            <CardDescription>Create, edit, and delete blog posts and tutorials.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Keep your audience engaged with fresh content.
              </p>
              <Button asChild className="w-full">
                <Link href="/admin/posts">
                  <Newspaper className="mr-2 h-4 w-4" /> View All Posts
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/posts/new">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create New Post
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Posts Preview */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              Recent Posts
            </CardTitle>
            <CardDescription>Your latest published content.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="font-medium">The Future of Generative AI</span>
                <span className="text-xs text-muted-foreground">Jul 28</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">A Beginner's Guide to Prompt Engineering</span>
                <span className="text-xs text-muted-foreground">Jul 25</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">AI in Personalized Education</span>
                <span className="text-xs text-muted-foreground">Jul 22</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Navigating Ethical AI Development</span>
                <span className="text-xs text-muted-foreground">Jul 19</span>
              </li>
            </ul>
            <div className="mt-4">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/admin/posts">
                  View All Posts
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Tags */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              Popular Tags
            </CardTitle>
            <CardDescription>Most used content tags.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                AI News <span className="text-xs opacity-70">2</span>
              </div>
              <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                Tutorials <span className="text-xs opacity-70">2</span>
              </div>
              <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                Ethics <span className="text-xs opacity-70">1</span>
              </div>
              <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                Case Studies <span className="text-xs opacity-70">1</span>
              </div>
              <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                Education <span className="text-xs opacity-70">1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
