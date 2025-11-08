"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/components/AuthProvider";
import { getAllPrompts } from "@/lib/promptData";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signup(email, password, displayName);
    if (!res.ok) setError(res.error);
    else router.push("/");
  };

  const promptCount = getAllPrompts().length;

  return (
    <Layout header={<Header promptCount={promptCount} />} sidebar={null}>
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Sign up
        </h1>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Display name</label>
            <input
              className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
          >
            Create account
          </button>
        </form>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3">
          Have an account?{" "}
          <Link className="underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </Layout>
  );
}
