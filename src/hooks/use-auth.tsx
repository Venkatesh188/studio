
'use client';

import type { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth } from '@/lib/firebase/client';
import { onAuthStateChanged } from 'firebase/auth';
import { GlobeLock } from 'lucide-react'; // Placeholder icon

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean; // Simplified admin check for now
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Simplified admin check: for demo purposes, if user is logged in, consider admin.
      // In a real app, you'd check roles from Firestore or custom claims.
      setIsAdmin(!!currentUser); 
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Loading state UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <GlobeLock className="w-16 h-16 mb-4 text-primary animate-pulse" />
        <p className="text-xl">Loading Authentication...</p>
      </div>
    );
  }


  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
