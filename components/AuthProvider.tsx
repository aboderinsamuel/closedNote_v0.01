"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/lib/types";
import {
  getCurrentUser,
  logoutUser,
  registerUser,
  authenticateUser,
  onAuthStateChange,
} from "@/lib/auth";
import { logSupabaseHealth } from "@/lib/supabase-health-check";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  signup: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Run health check in development
    if (process.env.NODE_ENV === "development") {
      logSupabaseHealth().catch(console.error);
    }

    // Initialize user from session
    getCurrentUser().then((currentUser) => {
      console.log("[AuthProvider] Initial user:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    // Listen to auth state changes
    const unsubscribe = onAuthStateChange((updatedUser) => {
      console.log("[AuthProvider] Auth state changed:", updatedUser);
      setUser(updatedUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    console.log("[AuthProvider] Attempting login for:", email);
    const res = await authenticateUser(email, password);
    console.log("[AuthProvider] Login result:", res);
    if (res.ok) {
      const currentUser = await getCurrentUser();
      console.log("[AuthProvider] User after login:", currentUser);
      setUser(currentUser);
    }
    return res;
  };

  const signup = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    const res = await registerUser(email, password, displayName);
    if (res.ok) {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    return res;
  };

  const logout = async () => {
    console.log("[AuthProvider] Logout requested");
    
    try {
      // Clear user state immediately
      setUser(null);
      
      // Sign out from Supabase
      await logoutUser();
      
      console.log("[AuthProvider] Logout complete, redirecting...");
      
      // Wait a bit to ensure session is cleared
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Force full page reload to login page
      window.location.href = "/login";
    } catch (err) {
      console.error("[AuthProvider] Logout failed:", err);
      // Still redirect even if there's an error
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
