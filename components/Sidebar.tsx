"use client";

import Link from "next/link";
import { Prompt } from "@/lib/types";
import { groupPromptsByTag } from "@/lib/promptData";

interface SidebarProps {
  prompts: Prompt[];
  activeTag?: string;
}

export function Sidebar({ prompts, activeTag }: SidebarProps) {
  const groups = groupPromptsByTag(prompts);
  const tags = Object.keys(groups).sort((a, b) => a.localeCompare(b));

  return (
    <aside className="w-64 border-r border-neutral-200 dark:border-neutral-800 p-6">
      <div className="space-y-6">
        <Link
          href="/"
          className={`block font-semibold text-neutral-900 dark:text-neutral-100 hover:opacity-70 transition-opacity mb-4 ${
            !activeTag
              ? "underline decoration-yellow-400 underline-offset-4"
              : ""
          }`}
        >
          All Prompts
        </Link>
        {tags.map((tag) => {
          const isActive = activeTag === tag;
          return (
            <div key={tag}>
              <Link
                href={`/?tag=${encodeURIComponent(tag)}`}
                className={`block font-semibold text-neutral-900 dark:text-neutral-100 hover:opacity-70 transition-opacity mb-2 ${
                  isActive
                    ? "underline decoration-yellow-400 underline-offset-4"
                    : ""
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Link>
              {groups[tag].map((prompt) => (
                <Link
                  key={prompt.id}
                  href={`/prompts/${prompt.id}`}
                  className="block text-sm text-neutral-600 dark:text-neutral-400 ml-4 mb-1 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  {prompt.title}
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
