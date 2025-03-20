import { useQuery } from '@tanstack/react-query'
import { STATUS } from './auth'
import { apiClient } from '../apiClient'
import { ApiConstantRoutes } from '../path'
import { CreateGenreFormValues } from '@/components/features/genres/CreateGenreModalContent'
//import { SongUploadFormValues } from '@/components/modals/SongUploadModal'

export interface getAllGenresResponse {
  data: {
    id: number
    name: string
  }[]
  status: STATUS
}

//genre
export interface createGenreResponse {
  data: {
    id: number
    name: string
  }
  status: STATUS
}
export interface UploadSongValue {
  id: string
  formData: FormData
}

export interface UploadSongResponse {
  data: {
    id: string
    title: string
    genre: string
    audioUrl: string
    coverUrl: string
    duration: string
    createdAt: string
  }
  status: STATUS
}

export const useGetAllGenres = () => {
  return useQuery<getAllGenresResponse>({
    queryKey: ['get-all-genres'],
    queryFn: () => apiClient.get(ApiConstantRoutes.paths.songs.getAllGenres),
  })
}

export const songRequests = {
  async createNewGenre(v: CreateGenreFormValues): Promise<createGenreResponse> {
    return apiClient.post(ApiConstantRoutes.paths.songs.genres, v)
  },

  async uploadSong(v: UploadSongValue): Promise<UploadSongResponse> {
    return apiClient.post(
      ApiConstantRoutes.paths.songs.UploadSong,
      v.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  },
}
