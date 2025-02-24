// we will make auth related requests to the server here
// create new files as needed for each use case; eg. admin.ts, user.ts, etc.

import { RegisterFormValues } from '@/pages/auth/Register'
import { apiClient } from '../apiClient'
import { ApiConstantRoutes } from '../path'
import { LoginFormValues } from '@/pages/auth/Login'
import { useQuery } from '@tanstack/react-query'

export type STATUS = 'SUCCESS' | 'ERROR'

export interface LoginResponse {
  data: {
    username: string
    createdAt: Date
    email: string
    firstName: string
    lastName: string
    userId: number
  }
  status: STATUS
}

export interface RegisterResponse {
  data: {
    firstName: string
    lastName: string
    username: string
    email: string
  }
  status: STATUS
}

export const authRequest = {
  async register(v: RegisterFormValues): Promise<RegisterResponse> {
    return apiClient.post(ApiConstantRoutes.paths.auth.register, v)
  },
  async login(v: LoginFormValues): Promise<LoginResponse> {
    return apiClient.post(ApiConstantRoutes.paths.auth.login, v)
  },
}

export const useIsUserAuthenticated = () => {
  return useQuery<LoginResponse>({
    queryKey: ['isUserAuthenticated'],
    retry: 1,
    queryFn: async () => {
      return apiClient.get(ApiConstantRoutes.paths.auth.default)
    },
  })
}
