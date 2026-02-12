'use client';

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';

// Mock Firebase User
const MOCK_USER: Partial<FirebaseUser> = {
  uid: 'mock-user-123',
  email: 'user@example.com',
  displayName: 'Mock User',
  photoURL: 'https://ui.shadcn.com/avatars/01.png',
  emailVerified: true,
  getIdToken: async () => 'mock-token-xyz',
};

interface AuthContextValue {
  user: FirebaseUser | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Default to logged in with mock user for development convenience
  const [user, setUser] = useState<FirebaseUser | null>(MOCK_USER as FirebaseUser); 
  const [loading, setLoading] = useState(false);

  // No useEffect needed for mock auth

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({ ...MOCK_USER, email } as FirebaseUser);
    setLoading(false);
  };

  const registerWithEmail = async (email: string, password: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser({ ...MOCK_USER, email } as FirebaseUser);
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(MOCK_USER as FirebaseUser);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setLoading(false);
  };

  const getIdToken = async () => {
    if (!user) return null;
    return 'mock-token-xyz';
  };

  const value: AuthContextValue = {
    user,
    loading,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout,
    getIdToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
