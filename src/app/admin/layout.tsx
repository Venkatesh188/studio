'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/shared/AdminSidebar';
import { GlobeLock } from 'lucide-react'; // Placeholder icon

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate initial load to show original UI appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <GlobeLock className="w-16 h-16 mb-4 text-primary animate-spin" />
        <p className="text-xl">Verifying Access...</p>
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
