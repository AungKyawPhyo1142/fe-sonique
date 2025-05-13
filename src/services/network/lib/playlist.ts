//
// import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { apiClient } from '../apiClient'
import { STATUS } from './auth'
import { ApiConstantRoutes } from '../path'
import { useQuery } from '@tanstack/react-query'
//import { useQuery } from '@tanstack/react-query'

//create empty playlist
export interface CreatePlaylistValue {
  user_id: string
  name?: string
}
export interface CreatePlaylistResponse {
  data: {
    user_id: number
    name: string
    id: number
  }
  status: STATUS
}

//add songs to playlist
export interface AddSongsToPlaylistValue {
  user_id?: string
  playlistId: number
  songIds: string[]
}
export interface AddSongsToPlaylistResponse {
  data: {
    playlistId: number
    playlistName: string
    user_id: number
    songIds: string[]
  }
  status: STATUS
}
// playlistname+playlists
export interface PlaylistCreateFormValue {
  playlist_id?: string
  user_id?: string
  name?: string
  songIds: string[]
}

//get user's playlist
export interface UserPlaylists {
  id: string
  userId: number
  name: string
  total_songs: number
}
export interface UserPlaylistsResponse {
  data: {
    playlists: UserPlaylists[]
    created_at: string
  }
  status: STATUS
}

//playlist details
export interface PlaylistDetailResponse {
  data: {
    created_at: string
    id: string
    name: string
    playlist_coverImageUrl: string
    songs: {
      artist: {
        name: string
        username: string
      }
      coverImageUrl: string
      duration: number
      fileUrl: string
      id: string
      order: number
      title: string
    }[]
  }
  status: STATUS
}
//Remove Song from playlist
export interface RemoveSongFromPlaylistValue {
  userId: string
  playlistId: string
  songIds: string[]
}
export interface RemoveSongFromPlaylistResponse {
  data: {
    created_at: string
    id: string
    name: string
    playlist_coverImageUrl: string
    songs: {
      artist: {
        name: string
        username: string
      }
      coverImageUrl: string
      duration: string
      fileUrl: string
      id: string
      order: string
      title: string
    }[]
  }
  status: string
}

export const playlistRequests = {
  async createEmptyPlaylist(
    v: CreatePlaylistValue,
  ): Promise<CreatePlaylistResponse> {
    const data = {
      userId: v.user_id,
      name: v.name,
    }
    return apiClient.post(ApiConstantRoutes.paths.playlist.create, data)
  },
  async addSongsToPlaylist(
    v: AddSongsToPlaylistValue,
  ): Promise<AddSongsToPlaylistResponse> {
    return apiClient.patch(
      ApiConstantRoutes.paths.playlist.addsongstoplaylist(),
      v,
    )
  },
  async RemoveSong(
    v: RemoveSongFromPlaylistValue,
  ): Promise<RemoveSongFromPlaylistResponse> {
    return apiClient.delete(ApiConstantRoutes.paths.playlist.removeSong(), {
      data: v,
    })
  },
}

//get user's playlist
// export const useGetUserPlaylist = (id: string) => {
//   return useQuery<UserPlaylistsResponse>({
//     queryKey: ['getUserPlaylists', id],
//     retry: 1,
//     queryFn: async () => {
//       const res = await apiClient.get(
//         ApiConstantRoutes.paths.playlist.getUserPlaylist(id),
//       )
//       return res.data
//     },
//     enabled: !!id,
//   })
// }

//ger playlist detail
export const useGetPlaylistDetail = (id: number) => {
  return useQuery<PlaylistDetailResponse>({
    queryKey: ['get-playlist-detail', id],
    queryFn: () =>
      apiClient.get(ApiConstantRoutes.paths.playlist.getPlaylistDetail(id)),
  })
}
