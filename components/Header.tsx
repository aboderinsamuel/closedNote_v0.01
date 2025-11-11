"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "./AuthProvider";
import { useRouter, usePathname } from "next/navigation";

interface HeaderProps {
  // onSearch retained for backward compatibility but no longer used; global palette handles search.
  onSearch?: (query: string) => void;
  promptCount: number;
  showMobileMenu?: boolean; // Add control for mobile menu visibility
}

export function Header({ promptCount, showMobileMenu = true }: HeaderProps) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    }

    if (isAccountMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isAccountMenuOpen]);

  // The large search bar now opens the global palette; triggers are handled via click/focus.

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 gap-3">
        <div className="flex items-center gap-2">
          {/* Mobile menu button - only show if sidebar exists */}
          {showMobileMenu && (
            <button
              aria-label="Open menu"
              className="md:hidden p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => window.dispatchEvent(new Event("toggle-sidebar"))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          )}

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
          <Link
            href="/docs"
            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 transition-colors"
          >
            Docs
          </Link>
        </div>

        <div className="hidden sm:block flex-1 max-w-md mx-2 sm:mx-6 md:mx-8">
          <button
            type="button"
            aria-label="Search"
            onClick={() => window.dispatchEvent(new Event("open-search"))}
            className="group w-full relative text-left"
          >
            <div className="relative">
              <div className="w-full px-4 py-2 pl-10 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-300 rounded-full group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
                Search (pages, tags, prompts)
              </div>
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
              <span className="hidden md:inline absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 text-xs rounded-full">
                Ctrl+K
              </span>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link
            href="/ocr"
            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 transition-colors"
          >
            OCR
          </Link>
          {user ? (
            <>
              <Link
                href="/prompts/new"
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 text-white text-sm font-medium rounded-full transition-colors"
              >
                + New prompt
              </Link>

              {/* Account Menu */}
              <div className="relative" ref={accountMenuRef}>
                <button
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full transition-colors"
                >
                  {/* Avatar Circle */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-400 to-neutral-600 dark:from-neutral-600 dark:to-neutral-800 flex items-center justify-center text-white text-sm font-semibold">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-neutral-900 dark:text-neutral-100 max-w-[120px] truncate">
                    {user.displayName}
                  </span>
                  {/* Dropdown Arrow */}
                  <svg
                    className={`w-4 h-4 text-neutral-600 dark:text-neutral-400 transition-transform ${
                      isAccountMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg overflow-hidden z-50">
                    {/* User Info Section */}
                    <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {user.displayName}
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="/"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            My Prompts
                          </p>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400">
                            {promptCount}{" "}
                            {promptCount === 1 ? "prompt" : "prompts"}
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/settings"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            Settings
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Logout Section */}
                    <div className="border-t border-neutral-200 dark:border-neutral-800 py-2">
                      <button
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-neutral-600 dark:text-neutral-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          Logout
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            (() => {
              // Show only one of Login / Sign up based on current page for cleaner UX.
              // If we're on /login route, offer Sign up. Otherwise (including /signup) offer Login.
              const showSignup = pathname === "/login";
              if (showSignup) {
                return (
                  <Link
                    href="/signup"
                    className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 text-sm font-medium rounded-full transition-colors"
                  >
                    Sign up
                  </Link>
                );
              }
              return (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 text-white text-sm font-medium rounded-full transition-colors"
                >
                  Login
                </Link>
              );
            })()
          )}
        </div>
      </div>
    </header>
  );
}
