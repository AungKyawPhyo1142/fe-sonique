import { GetAllSongsResponse, Song } from '@/services/network/lib/songs'

export const mockSongs: Song[] = Array.from({ length: 20 }, (_, i) => ({
  id: `song-${i + 1}`,
  title: `Mock Song ${i + 1}`,
  artist: {
    artistId: i + 1,
    name: `Mock Artist ${i + 1}`,
    username: `mock_artist_${i + 1}`,
  },
  audioUrl: `https://example.com/audio${i + 1}.mp3`,
  coverImageUrl: `https://placehold.co/600x400?text=${i + 1}.jpg`,
  created_at: new Date().toISOString(),
  duration: Math.floor(Math.random() * 300) + 180, // Between 180-480 seconds
  genre: i % 5, // Simulate different genres
}))

export const mockNextCursor = 'song-10' // Simulate pagination cursor
export const mockHasMore = true

export const fetchMockSongs = async ({
  pageParam = '',
}: {
  pageParam: string | unknown
}): Promise<GetAllSongsResponse> => {
  const param = pageParam as string
  const startIdx = param ? parseInt(param.split('-')[1], 10) : 0
  const endIdx = startIdx + 10
  const songs = mockSongs.slice(startIdx, endIdx)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          hasMore: endIdx < mockSongs.length,
          nextCursor: endIdx < mockSongs.length ? `song-${endIdx + 1}` : '',
          songs,
        },
        status: 'SUCCESS', // Mock status
      })
    }, 1000) // Simulating 1-second backend response time
  })
}
