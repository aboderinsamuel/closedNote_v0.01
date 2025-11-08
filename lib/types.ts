export type PromptModel = "gpt-4" | "gpt-3.5" | "claude-3" | "gemini-pro" | "mistral"

export interface Prompt {
  id: string
  title: string
  content: string
  model: PromptModel
  collection: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  passwordHash: string
  displayName: string
  createdAt: string
  updatedAt: string
}
