"use client"

import { useTheme } from "./ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="relative">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as "light" | "dark")}
        className="px-3 py-1.5 text-sm bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-full text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors appearance-none cursor-pointer pr-8"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
