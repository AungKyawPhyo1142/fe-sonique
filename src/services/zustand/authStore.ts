import { create } from 'zustand'
import { LoginResponse } from '../network/lib/auth'
import { LocalServices } from '../storage/LocalServices'

export interface AuthState {
  username: string
  userId: string
  created_at: string
  status: 'idle' | 'failed' | 'success'
}

type AuthStore = {
  auth: AuthState
  initAfterLogin: (payload: LoginResponse, remember: boolean) => void
  cleanupAfterLogout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  auth: {
    username: '',
    userId: '',
    created_at: '',
    expires_at: '',
    status: 'idle',
  },
  initAfterLogin: (payload: LoginResponse, remember: boolean) => {
    if (payload.data && payload.status === 'SUCCESS') {
      console.log('payload:', payload)
      const data = payload.data
      const result: AuthState = {
        ...data,
        username: data.username,
        userId: data.userId ? data.userId.toString() : '',
        created_at: data.createdAt.toString(),
        status: 'success',
      }
      set({ auth: result })
      if (remember) {
        LocalServices.setLocalStorage(result)
      }
      console.log('AuthStore: User logged in:', result)
    } else {
      console.log('AuthStore: User login failed:', payload)
      set({ auth: { ...useAuthStore.getState().auth, status: 'failed' } })
    }
  },
  cleanupAfterLogout: () => {
    LocalServices.clearLocalStorage()
    set({
      auth: {
        username: '',
        userId: '',
        created_at: '',
        status: 'idle',
      },
    })
  },
}))

export const selectAuth = (state: AuthStore) => state.auth
export const initAfterLogin = (payload: LoginResponse, remember: boolean) =>
  useAuthStore.getState().initAfterLogin(payload, remember)
export const cleanupAfterLogout = () =>
  useAuthStore.getState().cleanupAfterLogout()
