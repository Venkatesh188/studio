
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Newspaper, PlusCircle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome! Manage your website content from here.</p>
      </header>

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

        {/* Placeholder for future sections like Categories or Settings */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              {/* Icon for future section */}
              Future Section
            </CardTitle>
            <CardDescription>More management options coming soon.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">
                This section will house additional administrative functionalities.
              </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
