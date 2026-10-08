import { create } from 'zustand'
import type { User } from '@/types'
import { authService } from '@/services/auth.service'

const AUTH_STORAGE_KEY = 'travel_plan_user'

const getInitialUser = (): User | null => {
  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved) as User
    }
  } catch {
    // ignore
  }
  return null
}

const initialUser = getInitialUser()

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isAuthenticated: !!initialUser,
  setUser: (user) => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
    set({ user, isAuthenticated: !!user })
  },
  login: (user) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    set({ user, isAuthenticated: true })
  },
  logout: () => {
    authService.logout()
    set({ user: null, isAuthenticated: false })
  },
}))
