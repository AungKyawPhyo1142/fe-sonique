// we will make auth related requests to the server here
// create new files as needed for each use case; eg. admin.ts, user.ts, etc.

import { RegisterFormValues } from '@/pages/auth/Register'
import { apiClient } from '../apiClient'
import { ApiConstantRoutes } from '../path'

export type STATUS = 'SUCCESS' | 'ERROR'

export interface LoginResponse {
  data: {
    createdAt: string
    firstName: string
    lastName: string
    id: string
    email: string
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

export const adminRequest = {
  async register(v: RegisterFormValues): Promise<RegisterResponse> {
    return apiClient.post(ApiConstantRoutes.paths.auth.register, v)
  },
}
