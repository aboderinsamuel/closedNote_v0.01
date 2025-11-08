import { Prompt } from "@/lib/types"
import { PromptListItem } from "./PromptListItem"

interface PromptCollectionProps {
  collection: string
  prompts: Prompt[]
}

export function PromptCollection({ collection, prompts }: PromptCollectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 capitalize">
        {collection}
      </h2>
      <div className="ml-4 space-y-1">
        {prompts.map((prompt) => (
          <PromptListItem key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  )
}
