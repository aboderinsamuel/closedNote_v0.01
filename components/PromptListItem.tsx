import Link from "next/link"
import { Prompt } from "@/lib/types"

interface PromptListItemProps {
  prompt: Prompt
}

export function PromptListItem({ prompt }: PromptListItemProps) {
  return (
    <Link
      href={`/prompts/${prompt.id}`}
      className="block text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors py-1"
    >
      {prompt.title}
      {prompt.tags && prompt.tags.length > 0 && (
        <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-500">
          ({prompt.tags.join(", ")})
        </span>
      )}
    </Link>
  )
}
