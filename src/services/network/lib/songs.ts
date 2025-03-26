import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { STATUS } from './auth'
import { apiClient } from '../apiClient'
import { ApiConstantRoutes } from '../path'
import { CreateGenreFormValues } from '@/components/features/genres/CreateGenreModalContent'
import { fetchMockSongs } from '@/helpers/mocks/mock'
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

//delete song
export interface DeleteSongValue {
  songId: string
}
export interface DeleteSongResponse {
  data: {
    id: string
    title: string
    fileName: string
    fileUrl: string
    duration: string
    coverImage: string
    coverImageUrl: string
    genreId: string
    artistId: string
    albumId: string
    create_at: string
    updated_at: string
    deleted_at: string
  }
  status: STATUS
}

export interface Song {
  artist: {
    artistId: number
    name: string
    username: string
  }
  audioUrl: string
  coverImageUrl: string
  created_at: string
  duration: number
  genre: number
  id: string
  title: string
}

export interface GetAllSongsResponse {
  data: {
    hasMore: boolean
    nextCursor: string
    songs: Song[]
  }
  status: STATUS
}

export const useGetAllGenres = () => {
  return useQuery<getAllGenresResponse>({
    queryKey: ['get-all-genres'],
    queryFn: () => apiClient.get(ApiConstantRoutes.paths.songs.getAllGenres),
  })
}

// ** NOTE: This is a mock flag to switch between mock and real API calls
const useMock = false
export const useGetAllSongs = () => {
  return useInfiniteQuery<GetAllSongsResponse>({
    queryKey: ['get-all-songs'],
    queryFn: ({ pageParam = '' }) => {
      if (useMock) {
        return fetchMockSongs({ pageParam })
      }
      // pass the limits, cursor to the backend as query params
      return apiClient.get(ApiConstantRoutes.paths.auth.getAllSongs(), {
        params: {
          limit: 10,
          cursor: pageParam,
        },
      })
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
  })
}

export const songRequests = {
  async createNewGenre(v: CreateGenreFormValues): Promise<createGenreResponse> {
    return apiClient.post(ApiConstantRoutes.paths.songs.genres, v)
  },

  async uploadSong(v: UploadSongValue): Promise<UploadSongResponse> {
    // your original request-body(v.formData) is not matching with what the Backend is expecting,
    // so you need to create a new request-body that matches the Backend's expected format.
    const resquestBody = {
      audio: v.formData.get('audio'),
      coverImage: v.formData.get('cover'),
      genreId: v.formData.get('genre'),
      title: v.formData.get('title'),
      artistId: v.id,
    }

    return apiClient.post(
      ApiConstantRoutes.paths.songs.UploadSong,
      resquestBody,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  },

  //delete song
  async DeleteSong(v: DeleteSongValue): Promise<DeleteSongResponse> {
    return apiClient.delete(ApiConstantRoutes.paths.songs.deleteSong(v.songId!))
  },
}
