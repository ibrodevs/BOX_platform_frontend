import { create } from 'zustand'
import { getProfile } from '../services/apiService'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  login: (tokens, user) => {
    localStorage.setItem('access_token', tokens.access)
    localStorage.setItem('refresh_token', tokens.refresh)
    set({ user, isAuthenticated: true, initialized: true })
  },
  
  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    set({ user: null, isAuthenticated: false, loading: false, initialized: true })
  },
  
  setLoading: (loading) => set({ loading }),

  initAuth: async () => {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')

    if (!accessToken && !refreshToken) {
      set({ user: null, isAuthenticated: false, loading: false, initialized: true })
      return
    }

    set({ loading: true })

    try {
      const profileRes = await getProfile()
      set({
        user: profileRes.data,
        isAuthenticated: true,
        loading: false,
        initialized: true,
      })
    } catch (error) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        initialized: true,
      })
    }
  },
}))
