"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onSearch?: (query: string) => void;
  promptCount: number;
}

export function Header({ onSearch, promptCount }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/home" className="flex items-center gap-3 group">
          <span className="font-serif-title text-2xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:opacity-80 transition-opacity">
            closedNote
          </span>
          <span
            aria-label="closedNote version"
            className="px-2 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium rounded-full group-hover:bg-neutral-300 dark:group-hover:bg-neutral-700 transition-colors"
          >
            v0.1
          </span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 text-xs rounded-full">
              Ctrl+K
            </span>
          </div>
        </form>

        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Notes Available:{" "}
            <span className="font-semibold">{promptCount}</span>
          </span>
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {user.displayName}
              </span>
              <button
                onClick={() => logout()}
                className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 text-xs font-medium rounded-full"
              >
                Logout
              </button>
              <Link
                href="/prompts/new"
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 text-white text-sm font-medium rounded-full transition-colors"
              >
                + New prompt
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 text-white text-sm font-medium rounded-full transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 text-sm font-medium rounded-full transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
