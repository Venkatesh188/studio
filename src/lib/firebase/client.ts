// Mock Firebase Auth - provides a similar API to Firebase but uses localStorage

// Auth-related types to match Firebase Auth
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin?: boolean;
}

interface UserCredential {
  user: User;
}

interface Auth {
  currentUser: User | null;
  onAuthStateChanged: (listener: (user: User | null) => void) => () => void;
}

const STORAGE_KEY = 'studio_mock_user';

// Safe localStorage access
export const safeStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

// Default admin credentials - CHANGE AFTER FIRST LOGIN
const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'admin123'
};

// Mock auth implementation
class MockAuth implements Auth {
  currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  constructor() {
    // Load user from localStorage on initialization, but only in browser
    if (typeof window !== 'undefined') {
      try {
        const storedUser = safeStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          this.currentUser = JSON.parse(storedUser);
          // Notify any listeners that might be registered after a page refresh
          setTimeout(() => {
            this.notifyListeners();
          }, 0);
        }
        
        // Initialize default admin in users list if not exists
        const existingUsers = safeStorage.getItem('mock_users');
        if (!existingUsers) {
          const users = {
            [DEFAULT_ADMIN.email]: { 
              email: DEFAULT_ADMIN.email, 
              password: DEFAULT_ADMIN.password,
              isAdmin: true
            }
          };
          safeStorage.setItem('mock_users', JSON.stringify(users));
          console.info('Default admin account created. Please change credentials after first login.');
        }
      } catch (error) {
        console.error("Error loading auth state:", error);
      }
    }
  }

  // Firebase auth API compatible method
  onAuthStateChanged(listener: (user: User | null) => void) {
    this.listeners.push(listener);
    
    // Call immediately with current state
    listener(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    for (const listener of this.listeners) {
      try {
        listener(this.currentUser);
      } catch (e) {
        console.error('Error in auth state change listener', e);
      }
    }
  }
}

// Mock sign-in function that mimics Firebase's signInWithEmailAndPassword
export async function signInWithEmailAndPassword(auth: MockAuth, email: string, password: string): Promise<UserCredential> {
  if (!email || !password) {
    throw new Error('auth/invalid-credential');
  }

  // Check against stored users
  const existingUsers = safeStorage.getItem('mock_users');
  let users: Record<string, {email: string, password: string, isAdmin?: boolean}> = {};
  
  if (existingUsers) {
    users = JSON.parse(existingUsers);
  }
  
  // Check if user exists and password matches
  const user = users[email];
  if (!user) {
    throw new Error('auth/user-not-found');
  }
  
  if (user.password !== password) {
    throw new Error('auth/wrong-password');
  }
  
  // Create user object
  const userObj: User = {
    uid: `mock-uid-${Date.now()}`,
    email: email,
    displayName: email.split('@')[0],
    photoURL: null,
    isAdmin: user.isAdmin || false
  };

  // Store in localStorage to persist across page refreshes
  safeStorage.setItem(STORAGE_KEY, JSON.stringify(userObj));
  
  // Update the auth instance
  auth.currentUser = userObj;
  
  // Notify listeners
  if (auth instanceof MockAuth) {
    (auth as any).notifyListeners();
  }

  return { user: userObj };
}

// Mock create user function
export async function createUserWithEmailAndPassword(auth: MockAuth, email: string, password: string): Promise<UserCredential> {
  if (!email || !password) {
    throw new Error('auth/invalid-email');
  }

  if (password.length < 6) {
    throw new Error('auth/weak-password');
  }

  // Check if user already exists (for demo - would be in backend)
  const existingUsers = safeStorage.getItem('mock_users');
  let users: Record<string, {email: string, password: string}> = {};
  
  if (existingUsers) {
    users = JSON.parse(existingUsers);
    if (users[email]) {
      throw { code: 'auth/email-already-in-use' };
    }
  }

  // Create a new user
  const user: User = {
    uid: `mock-uid-${Date.now()}`,
    email: email,
    displayName: null,
    photoURL: null,
  };

  // Save to users list
  users[email] = { email, password };
  safeStorage.setItem('mock_users', JSON.stringify(users));

  // Update current user
  auth.currentUser = user;
  safeStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  
  // Notify listeners
  if (auth instanceof MockAuth) {
    (auth as any).notifyListeners();
  }

  return { user };
}

// Mock update profile function
export async function updateProfile(user: User, { displayName, photoURL }: { displayName?: string | null, photoURL?: string | null }): Promise<void> {
  if (displayName !== undefined) {
    user.displayName = displayName;
  }
  
  if (photoURL !== undefined) {
    user.photoURL = photoURL;
  }

  // Update in localStorage
  safeStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  
  // If this is the current user, notify listeners
  if (auth.currentUser && auth.currentUser.uid === user.uid) {
    auth.currentUser = user;
    if (auth instanceof MockAuth) {
      (auth as any).notifyListeners();
    }
  }
}

// Mock sign-out function
export async function signOut(auth: MockAuth): Promise<void> {
  safeStorage.removeItem(STORAGE_KEY);
  auth.currentUser = null;
  
  // Notify listeners
  if (auth instanceof MockAuth) {
    (auth as any).notifyListeners();
  }
}

// Mock database (In actual Firebase, this would be Firestore)
class MockFirestore {
  // This is just a stub for compatibility
}

// Initialize mock services
const auth = new MockAuth();
const db = new MockFirestore();

export { auth, db }; 