import type { AuthUser, UserRole, UserType } from "@/lib/backend-types"

export interface StoredUser {
  id: string
  email: string
  role: UserRole
  userType: UserType
  firstName?: string
  lastName?: string
}

function normalizeUser(user: AuthUser | null | undefined): StoredUser | null {
  if (!user) return null

  const id = user.id ?? user.ID ?? ""
  const email = user.email ?? user.Email ?? ""
  const role = (user.role ?? user.Role ?? "user") as UserRole
  const userType = (user.userType ?? user.UserType ?? "customer") as UserType
  const firstName = user.firstName ?? user.FirstName ?? ""
  const lastName = user.lastName ?? user.LastName ?? ""

  if (!id || !email) return null
  return { id, email, role, userType, firstName, lastName }
}

export function setSession(token: string, user: AuthUser): StoredUser | null {
  if (typeof window === "undefined") return null
  const normalized = normalizeUser(user)
  if (!normalized) return null
  localStorage.setItem("token", token)
  localStorage.setItem("user", JSON.stringify(normalized))
  return normalized
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem("user")
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as AuthUser
    return normalizeUser(parsed)
  } catch {
    return null
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export function clearSession() {
  if (typeof window === "undefined") return
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export function updateStoredUser(patch: Partial<StoredUser>): StoredUser | null {
  const current = getStoredUser()
  if (!current || typeof window === "undefined") return null
  const updated = { ...current, ...patch }
  localStorage.setItem("user", JSON.stringify(updated))
  return updated
}

export function isProvider(user: StoredUser | null): boolean {
  return user?.userType === "professional" || user?.userType === "company"
}

export function isAdmin(user: StoredUser | null): boolean {
  return user?.role === "admin"
}
