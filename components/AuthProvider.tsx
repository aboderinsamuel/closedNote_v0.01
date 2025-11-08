"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/lib/types";
import {
  getCurrentUser,
  logoutUser,
  registerUser,
  authenticateUser,
} from "@/lib/auth";

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
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authenticateUser(email, password);
    if (res.ok) setUser(getCurrentUser());
    return res;
  };
  const signup = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    const res = await registerUser(email, password, displayName);
    if (res.ok) setUser(getCurrentUser());
    return res;
  };
  const logout = () => {
    logoutUser();
    setUser(null);
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
