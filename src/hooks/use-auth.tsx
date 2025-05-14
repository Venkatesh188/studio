
'use client';
// src/hooks/use-auth.tsx

import type { ReactNode} from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Mock User type - This is for frontend representation if needed, 
// but actual auth and user management for CMS is via WordPress.
interface User {
  id: string; // WordPress User ID
  email: string;
  displayName?: string;
  // Potentially roles or capabilities if fetched from WP
}

interface AuthContextType {
  user: User | null; // Represents a logged-in WordPress admin *if* we implement frontend mirroring
  loading: boolean; // For async operations related to this mock/future frontend auth
  isAdmin: boolean; // True if the WP user has admin capabilities (future)
  // WP login/logout will happen on the WP site itself.
  // These functions could be used for frontend state management if needed.
  // For now, they are placeholders or can be removed if no frontend login state is managed.
  signIn: (userData: User) => Promise<void>; // Simulate setting a user state
  signOut: () => Promise<void>; // Simulate clearing user state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // No initial auth check from frontend for WP admin
  const [isAdmin, setIsAdmin] = useState(false);

  // This context is now mostly a placeholder.
  // True WordPress admin authentication happens on the WordPress instance.
  // This Next.js app is a consumer of the WordPress API.

  // Placeholder signIn - could be used if we stored some WP user info in frontend
  const signIn = useCallback(async (userData: User): Promise<void> => {
    setLoading(true);
    // In a real scenario with frontend mirroring of WP login, you might store a token.
    // For now, just sets local state.
    setUser(userData);
    // Determine isAdmin based on userData if roles/capabilities are fetched
    setIsAdmin(true); // Assuming any user set via this mock signIn is admin for demo
    localStorage.setItem('mockWpUser', JSON.stringify(userData));
    setLoading(false);
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    setLoading(true);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('mockWpUser');
    setLoading(false);
  }, []);
  
  // Effect to check for a persisted mock user (e.g., from localStorage)
  // This is for demonstration if you want to simulate a "logged in" state on the frontend
  // without actual WP session cookies being accessible directly by client-side JS.
  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem('mockWpUser');
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAdmin(true); // Assume stored user is admin for demo
      } catch (error) {
        console.error("Failed to parse stored mock user:", error);
        localStorage.removeItem('mockWpUser');
      }
    }
    setLoading(false);
  }, []);


  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signOut }}>
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
