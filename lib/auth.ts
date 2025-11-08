import { User } from "./types"

const USERS_KEY = "closednote_users"
const CURRENT_USER_KEY = "closednote_current_user"

function readUsers(): User[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.warn("[auth] Failed to read users from localStorage", err)
    return []
  }
}

function writeUsers(users: User[]) {
  if (typeof window === "undefined") return
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)) } catch (err) {
    console.error("[auth] Failed to save users to localStorage", err)
  }
}

export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder().encode(password)
  const buf = await crypto.subtle.digest("SHA-256", enc)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("")
}

export async function registerUser(email: string, password: string, displayName?: string): Promise<{ok:true}|{ok:false;error:string}> {
  const users = readUsers()
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok:false, error:"Email already registered" }
  }
  const now = new Date().toISOString()
  const passwordHash = await hashPassword(password)
  const user: User = {
    id: crypto.randomUUID(),
    email: email.trim(),
    passwordHash,
    displayName: displayName?.trim() || email.split("@")[0],
    createdAt: now,
    updatedAt: now,
  }
  users.push(user)
  writeUsers(users)
  setCurrentUser(user)
  return { ok:true }
}

export async function authenticateUser(email: string, password: string): Promise<{ok:true}|{ok:false;error:string}> {
  const users = readUsers()
  const passwordHash = await hashPassword(password)
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === passwordHash)
  if (!user) return { ok:false, error:"Invalid credentials" }
  setCurrentUser(user)
  return { ok:true }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY)
    return raw ? JSON.parse(raw) as User : null
  } catch (err) {
    console.warn("[auth] Failed to read current user from localStorage", err)
    return null
  }
}

export function setCurrentUser(user: User | null) {
  if (typeof window === "undefined") return
  try {
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(CURRENT_USER_KEY)
  } catch (err) {
    console.error("[auth] Failed to set current user in localStorage", err)
  }
}

export function logoutUser() {
  setCurrentUser(null)
}
