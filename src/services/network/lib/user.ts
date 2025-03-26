import { ProfileFormValues } from '@/pages/user/Profile'
import { apiClient } from '../apiClient'
import { ApiConstantRoutes } from '../path'
import { STATUS } from './auth'
import { useQuery } from '@tanstack/react-query'
export interface ToggleArtistValue {
  id: string
}
export interface UploadImageValue {
  id: string
  formData: FormData
}
export interface UploadImageResponse {
  data: {
    bio: string
    email: string
    firstName: string
    id: string
    lastName: string
    profileImage: string
    username: string
  }
  status: STATUS
}

export interface ToggleArtistResponse {
  data: {
    id: string
    isArtist: boolean
    message: string
  }
  status: STATUS
}

export interface UpdateUserRespose {
  data: {
    bio: string
    email: string
    firstName: string
    lastName: string
    username: string
  }
  status: STATUS
}

interface GetUserResponse {
  data: {
    bio?: string
    email: string
    firstName: string
    lastName: string
    id: number
    isArtist: boolean
    profile_image: string
    username: string
    total_songs: number
  }
  status: STATUS
}

export const useGetUser = (id: number) => {
  return useQuery<GetUserResponse>({
    queryKey: ['get-user', id],
    retry: 1,
    queryFn: async () => {
      return apiClient.get(ApiConstantRoutes.paths.auth.getUser(id.toString()))
    },
    enabled: !!id,
  })
}

export const useGetArtist = (id: number) => {
  return useQuery<GetUserResponse>({
    queryKey: ['get-artist', id],
    retry: 1,
    queryFn: async () => {
      return apiClient.get(ApiConstantRoutes.paths.auth.getUser(id.toString()))
    },
    enabled: !!id,
  })
}

export const userUpdateRequest = {
  async updateUser(v: ProfileFormValues): Promise<UpdateUserRespose> {
    return apiClient.patch(ApiConstantRoutes.paths.auth.updateUser(v.id!), v)
  },
  async upLoadImage(v: UploadImageValue): Promise<UploadImageResponse> {
    return apiClient.patch(
      ApiConstantRoutes.paths.auth.updateUser(v.id!),
      v.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  },
}

export const toggleArtistRequest = {
  async activateArtist(v: ToggleArtistValue): Promise<ToggleArtistResponse> {
    return apiClient.patch(
      ApiConstantRoutes.paths.auth.activateArtist(v.id!),
      v,
    )
  },
  async deactivateArtist(v: ToggleArtistValue): Promise<ToggleArtistResponse> {
    return apiClient.patch(
      ApiConstantRoutes.paths.auth.deactivateArtist(v.id!),
      v,
    )
  },
}
