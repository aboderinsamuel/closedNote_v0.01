import { Prompt, PromptModel } from "./types"

const STORAGE_KEY = "closednote_prompts"

function getStoredPrompts(): Prompt[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (err) {
    console.warn("[promptData] Failed to read prompts from localStorage", err)
    return []
  }
}

function savePrompts(prompts: Prompt[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts))
  } catch (err) {
    console.error("[promptData] Failed to save prompts to localStorage", err)
  }
}

export function getAllPrompts(): Prompt[] {
  return getStoredPrompts()
}

export function getPromptById(id: string): Prompt | undefined {
  const prompts = getStoredPrompts()
  return prompts.find((p) => p.id === id)
}

export function savePrompt(prompt: Prompt): void {
  const prompts = getStoredPrompts()
  const existingIndex = prompts.findIndex((p) => p.id === prompt.id)
  if (existingIndex >= 0) {
    prompts[existingIndex] = prompt
  } else {
    prompts.push(prompt)
  }
  savePrompts(prompts)
}

export function deletePrompt(id: string): void {
  const prompts = getStoredPrompts()
  const next = prompts.filter((p) => p.id !== id)
  savePrompts(next)
}

export function filterPrompts(
  prompts: Prompt[],
  filters: {
    query?: string
    model?: PromptModel
    collection?: string
    tag?: string
  }
): Prompt[] {
  return prompts.filter((prompt) => {
    if (filters.query) {
      const queryLower = filters.query.toLowerCase()
      const matchesQuery =
        prompt.title.toLowerCase().includes(queryLower) ||
        prompt.content.toLowerCase().includes(queryLower)
      if (!matchesQuery) return false
    }
    if (filters.model && prompt.model !== filters.model) return false
    if (filters.collection && prompt.collection !== filters.collection) return false
    if (filters.tag) {
      const tag = filters.tag
      const inPrimary = prompt.collection === tag
      const inExtra = (prompt.tags || []).includes(tag)
      if (!inPrimary && !inExtra) return false
    }
    return true
  })
}

export function groupPromptsByCollection(prompts: Prompt[]): Record<string, Prompt[]> {
  return prompts.reduce((acc, prompt) => {
    const collection = prompt.collection || "uncategorized"
    if (!acc[collection]) {
      acc[collection] = []
    }
    acc[collection].push(prompt)
    return acc
  }, {} as Record<string, Prompt[]>)
}

export function groupPromptsByTag(prompts: Prompt[]): Record<string, Prompt[]> {
  const groups: Record<string, Prompt[]> = {}
  for (const p of prompts) {
    const tags = [p.collection || "uncategorized", ...(p.tags || [])]
    for (const t of tags) {
      if (!groups[t]) groups[t] = []
      groups[t].push(p)
    }
  }
  // Optionally sort prompts within each tag by title
  for (const key of Object.keys(groups)) {
    groups[key].sort((a, b) => a.title.localeCompare(b.title))
  }
  return groups
}
