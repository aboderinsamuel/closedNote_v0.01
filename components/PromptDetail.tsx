"use client";

import Link from "next/link";
import { useState } from "react";
import { Prompt } from "@/lib/types";
import { deletePrompt, savePrompt } from "@/lib/promptData";
import { useRouter } from "next/navigation";

interface PromptDetailProps {
  prompt: Prompt;
}

export function PromptDetail({ prompt }: PromptDetailProps) {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(prompt.title);
  const [content, setContent] = useState(prompt.content);
  const [tags, setTags] = useState((prompt.tags || []).join(", "));
  const router = useRouter();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    if (confirm("Delete this prompt? This cannot be undone.")) {
      deletePrompt(prompt.id);
      router.push("/");
    }
  };

  const handleSave = () => {
    const now = new Date().toISOString();
    const updated = {
      ...prompt,
      title: title.trim() || prompt.title,
      content: content.trim() || prompt.content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      updatedAt: now,
    };
    savePrompt(updated);
    setEditing(false);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        ← Back to prompts
      </Link>
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6">
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 mb-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-900 dark:text-neutral-100 text-2xl font-semibold"
          />
        ) : (
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
            {prompt.title}
          </h1>
        )}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md text-sm font-medium">
            {prompt.collection}
          </span>
          <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md text-sm">
            {prompt.model}
          </span>
          {prompt.tags && prompt.tags.length > 0 && (
            <>
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </>
          )}
        </div>
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Prompt
            </span>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 text-white text-sm font-medium rounded-full transition-colors"
            >
              {copied ? "Copied" : "Copy prompt"}
            </button>
          </div>
          {editing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-x-auto text-sm font-mono text-neutral-800 dark:text-neutral-200"
            />
          ) : (
            <pre className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-x-auto text-sm font-mono text-neutral-800 dark:text-neutral-200">
              <code>{prompt.content}</code>
            </pre>
          )}
        </div>
        <div className="flex gap-3 pt-2">
          {editing ? (
            <>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tag1, tag2"
                className="flex-1 px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md text-sm"
              />
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-100 text-sm font-medium rounded-md"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-100 text-sm font-medium rounded-md"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-md"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
