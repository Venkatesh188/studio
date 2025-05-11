'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from '@/components/shared/AdminSidebar';
import { GlobeLock } from 'lucide-react'; // Placeholder icon

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 sm:p-8 bg-muted/40">
        {children}
      </main>
    </div>
  );
}
