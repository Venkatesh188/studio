
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
  signIn: (email: string, password?: string) => Promise<void>; // Password optional for mock
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password?: string) => Promise<void>; // Password optional for mock
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin email for mock purposes
const ADMIN_EMAIL = 'rajuvenkatesh188@gmail.com';
// Placeholder for a "database" of users if not using a real backend for auth
const mockUserDatabase: { [email: string]: User & { passwordHash?: string } } = {
  [ADMIN_EMAIL]: { id: 'admin-user-id', email: ADMIN_EMAIL, displayName: 'Admin User', passwordHash: 'hashed_12345678' /* In real app, use a proper hash */ },
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initially true
  const [isAdmin, setIsAdmin] = useState(false);

  // Effect to check for persisted auth state (e.g., from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAdmin(parsedUser.email === ADMIN_EMAIL);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('authUser');
      }
    }
    setLoading(false); // Finish loading after checking localStorage
  }, []);

  const signIn = useCallback(async (email: string, password?: string): Promise<void> => {
    setLoading(true);
    // Simulate API call to a CMS or auth provider
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    // For demo: check against mock database
    const potentialUser = mockUserDatabase[email];
    
    // Simplified check: For admin, only email matters for this mock. Password check is illustrative.
    if (email === ADMIN_EMAIL && potentialUser ) { // Check if potentialUser exists
      // In a real app, verify password against potentialUser.passwordHash
      // For demo, if email is admin, assume login success
      setUser(potentialUser);
      setIsAdmin(true);
      localStorage.setItem('authUser', JSON.stringify(potentialUser));
    } else {
      // For non-admin users, or if CMS login fails
      console.warn("Login attempt for non-admin or unknown user:", email);
      throw new Error("Invalid credentials or user not found. (Mock auth: only admin login allowed)");
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
  
  const signUp = useCallback(async (name: string, email: string, password?: string): Promise<void> => {
    setLoading(true);
    // Simulate API call to CMS for user creation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (mockUserDatabase[email]) {
      setLoading(false);
      throw new Error("User already exists with this email. (Mock auth)");
    }

    // Create a new mock user (in a real app, this would be a backend call)
    // For demo, we'll allow signup but only admin can truly "use" the admin panel.
    const newUser: User = { id: `user-${Date.now()}`, email, displayName: name };
    mockUserDatabase[email] = { ...newUser, passwordHash: `hashed_${password}` /* Illustrative hashing */ };
    
    // For this demo, signup doesn't auto-login or grant admin rights.
    // It just "registers" the user in our mock database.
    console.log(`Simulated sign up for: ${name}, ${email}. User added to mock DB.`);
    
    setLoading(false);
  }, []);


  // AuthProvider now always renders its children to prevent hydration mismatch.
  // Consuming components like AdminLayout will use the `loading` state
  // to show their own specific loading UIs.
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

