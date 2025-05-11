import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';
import { cn } from '@/lib/utils';

// Add type declaration for netlifyIdentity
declare global {
  interface Window {
    netlifyIdentity: {
      currentUser(): any;
      on(event: string, callback: Function): void;
    };
  }
}

export function AdminLink({ className }: { className?: string }) {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check for Netlify Identity or our custom auth
  useEffect(() => {
    const checkAdmin = () => {
      // Check for Netlify identity
      if (typeof window !== 'undefined' && window.netlifyIdentity) {
        const user = window.netlifyIdentity.currentUser();
        if (user) {
          setIsAdmin(true);
          return;
        }
      }
      
      // Fallback to our local auth
      const localUser = localStorage.getItem('studio_mock_user');
      if (localUser) {
        try {
          const user = JSON.parse(localUser);
          if (user && user.isAdmin) {
            setIsAdmin(true);
            return;
          }
        } catch (e) {
          console.error('Error parsing user from localStorage', e);
        }
      }
      
      setIsAdmin(false);
    };
    
    checkAdmin();
    
    // Check whenever focus returns to the window
    window.addEventListener('focus', checkAdmin);
    return () => window.removeEventListener('focus', checkAdmin);
  }, []);
  
  if (!isAdmin) return null;
  
  return (
    <Link 
      href="/admin" 
      className={cn(
        "fixed bottom-4 right-4 z-50 bg-background/80 text-primary hover:bg-primary/10 backdrop-blur-sm p-3 rounded-full shadow-md border border-primary/20 transition-all hover:scale-105",
        className
      )}
      title="Admin Dashboard"
    >
      <LockKeyhole className="h-5 w-5" />
      <span className="sr-only">Admin Dashboard</span>
    </Link>
  );
} 