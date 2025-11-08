"use client"

import { Prompt } from "@/lib/types"
import { PromptListItem } from "./PromptListItem"

interface PromptListProps {
  prompts: Prompt[]
}

export function PromptList({ prompts }: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 dark:text-neutral-400">
          Nothing saved yet — add your first prompt.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {prompts.map((prompt) => (
        <PromptListItem key={prompt.id} prompt={prompt} />
      ))}
    </div>
  )
}
