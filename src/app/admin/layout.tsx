
'use client';

import type { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from '@/components/shared/AdminSidebar';
import { GlobeLock } from 'lucide-react'; // Placeholder icon

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <GlobeLock className="w-16 h-16 mb-4 text-primary animate-spin" />
        <p className="text-xl">Verifying Access...</p>
      </div>
    );
  }

  if (!user) {
    // This will be briefly shown before redirect or if JS is disabled.
    // The useEffect hook handles the redirect for client-side navigation.
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <GlobeLock className="w-16 h-16 mb-4 text-destructive" />
        <p className="text-xl">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 sm:p-8 bg-muted/40">
        {children}
      </main>
    </div>
  );
}
