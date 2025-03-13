import { useQuery } from '@tanstack/react-query'
import { STATUS } from './auth'
import { apiClient } from '../apiClient'
import { ApiConstantRoutes } from '../path'

interface getAllGenresResponse {
  data: {
    id: number
    name: string
  }[]
  status: STATUS
}

interface createGenreResponse {
  data: {
    id: number
    name: string
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
  async createNewGenre(genreName: string): Promise<createGenreResponse> {
    return apiClient.post(ApiConstantRoutes.paths.songs.getAllGenres, {
      name: genreName,
    })
  },
}
