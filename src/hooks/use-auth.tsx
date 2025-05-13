
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { GlobeLock } from 'lucide-react'; // Placeholder icon

// Mock User type, can be expanded if more user details are needed from the CMS
interface User {
  id: string;
  email: string;
  displayName?: string;
  // Add other relevant user fields that your CMS might provide
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string) => Promise<void>; // Simplified signIn
  signOut: () => Promise<void>;
  signUp: (name: string, email: string) => Promise<void>; // Simplified signUp
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin email for mock purposes
const ADMIN_EMAIL = 'rajuvenkatesh188@gmail.com';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initially true to simulate loading
  const [isAdmin, setIsAdmin] = useState(false);

  // Effect to check for persisted auth state (e.g., from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(parsedUser.email === ADMIN_EMAIL);
    }
    setLoading(false); // Finish loading after checking localStorage
  }, []);

  const signIn = useCallback(async (email: string): Promise<void> => {
    setLoading(true);
    // Simulate API call to a CMS or auth provider
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    // For demo: if email matches admin, create a mock admin user
    // In a real CMS, the backend would verify credentials and return user data + roles
    if (email === ADMIN_EMAIL) {
      const mockUser: User = { id: 'admin-user-id', email: ADMIN_EMAIL, displayName: 'Admin User' };
      setUser(mockUser);
      setIsAdmin(true);
      localStorage.setItem('authUser', JSON.stringify(mockUser));
    } else {
      // For non-admin users, or if CMS login fails
      // setUser(null); // Or set to a non-admin mock user
      // setIsAdmin(false);
      // localStorage.removeItem('authUser');
      // For this CMS focused task, we'll assume only admin login is relevant now.
      // throw new Error("Invalid credentials or user not found."); // Or handle non-admin login
      console.warn("Login attempt for non-admin or unknown user:", email);
      // To keep it simple for now, we only allow the admin user to "log in"
      throw new Error("Only the admin user can log in at this time.");
    }
    setLoading(false);
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('authUser');
    setLoading(false);
  }, []);
  
  const signUp = useCallback(async (name: string, email: string): Promise<void> => {
    setLoading(true);
    // Simulate API call to CMS for user creation
    await new Promise(resolve => setTimeout(resolve, 500));
    // This is a placeholder. A real CMS would handle user creation.
    // For now, we'll just log it and not create a local user state,
    // as the primary goal is CMS-managed content by an admin.
    console.log(`Simulated sign up for: ${name}, ${email}`);
    // Potentially, a real CMS might auto-login or require separate login.
    // For this demo, we don't auto-login after signup.
    setLoading(false);
    // throw new Error("Signup functionality is illustrative and not connected to a backend.");
  }, []);


  // Loading state UI (can be kept simpler if preferred)
  if (loading && typeof window !== 'undefined' && !localStorage.getItem('authUser')) {
    // Show loading only if there's no persisted user to avoid flash of loading screen
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <GlobeLock className="w-16 h-16 mb-4 text-primary animate-pulse" />
        <p className="text-xl">Initializing App...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signOut, signUp }}>
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
