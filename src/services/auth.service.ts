import type { User } from '@/types'

const AUTH_STORAGE_KEY = 'travel_plan_user'

export const authService = {
  login: async (credentials: { email: string; password: string }): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: 'user-' + Math.random().toString(36).substring(2, 7),
          name: credentials.email.split('@')[0],
          email: credentials.email,
          isPro: true,
        }
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
        resolve(user)
      }, 400)
    })
  },

  signup: async (data: { name: string; email: string; password: string }): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: 'user-' + Math.random().toString(36).substring(2, 7),
          name: data.name,
          email: data.email,
          isPro: false,
        }
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
        resolve(user)
      }, 400)
    })
  },

  forgotPassword: async (_email: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 350)
    })
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored) as User
      }
    } catch {
      // Fallback if parsing fails
    }
    return null
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  },
}
