"use client"

import { useState } from "react"
import { PromptModel } from "@/lib/types"

interface PromptFiltersProps {
  onFilterChange: (filters: {
    query: string
    model: PromptModel | ""
  }) => void
}

export function PromptFilters({ onFilterChange }: PromptFiltersProps) {
  const [query, setQuery] = useState("")
  const [model, setModel] = useState<PromptModel | "">("")

  const handleQueryChange = (value: string) => {
    setQuery(value)
    onFilterChange({ query: value, model })
  }

  const handleModelChange = (value: PromptModel | "") => {
    setModel(value)
    onFilterChange({ query, model: value })
  }

  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Search prompts..."
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        className="flex-1 px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-700 dark:text-neutral-300 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
      />
      <select
        value={model}
        onChange={(e) => handleModelChange(e.target.value as PromptModel | "")}
        className="px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
      >
        <option value="">All models</option>
        <option value="gpt-4">GPT-4</option>
        <option value="gpt-3.5">GPT-3.5</option>
        <option value="claude-3">Claude 3</option>
        <option value="gemini-pro">Gemini Pro</option>
        <option value="mistral">Mistral</option>
      </select>
    </div>
  )
}
