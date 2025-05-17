import Button from '@/components/common/Button'
import EmptyState from '@/components/common/EmptyState'
import PlaylistCard from '@/components/common/PlaylistCard'
import CreatePlaylistModal from '@/components/modals/CreatePlaylistModal'
import { apiClient } from '@/services/network/apiClient'
import { UserPlaylists } from '@/services/network/lib/playlist'
import { ApiConstantRoutes } from '@/services/network/path'
import { AppConstantRoutes } from '@/services/routes/path'
import { useAuthStore } from '@/services/zustand/authStore'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router'

//PlaylistPage
const PlaylistPage = () => {
  //Open create playlist modal
  const [isCreatePlaylist, setIsCreatePlaylist] = useState(false)

  //get user
  const userId = useAuthStore((state) => state.auth.userId)

  //Fetch user's playlists
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getUserPlaylists', userId],
    retry: 1,
    queryFn: async () => {
      const res = await apiClient.get(
        ApiConstantRoutes.paths.playlist.getUserPlaylist(userId),
      )
      return res.data
    },
    enabled: !!userId,
  })
  const navigate = useNavigate()

  return (
    <div className='flex flex-col relative fade-in'>
      <div className='flex flex-row justify-between items-center p-4 text-white mb-3'>
        <h1 className='font-bold text-2xl hover:underline'>Your Playlists</h1>
        <Button
          className='px-[22px] h-[50px]'
          primary
          type='button'
          onClick={() => setIsCreatePlaylist(true)}
        >
          Create a new playlist
        </Button>
        {/**Create Playlist Modal */}
        {isCreatePlaylist && (
          <CreatePlaylistModal
            isOpen={isCreatePlaylist}
            setIsOpen={setIsCreatePlaylist}
          />
        )}
      </div>
      {/* Playlist Cards */}
      {isLoading && <p className='text-white'>Loading playlists...</p>}
        {isError && <p className='text-red-500'>Failed to load playlists.</p>}
        {user?.length === 0 ? (
          <EmptyState
            heading='Empty Playlist'
            subheading="You haven't created any playlists yet!"
          />
        ) : (
          <div className='w-full grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {user?.map((playlist: UserPlaylists) => (
              <div key={playlist.id} className='w-full'>
                <PlaylistCard
                  image='/images/playlist.png'
                  title={playlist.name}
                  description={`total songs: ${playlist.total_songs}`}
                  onClick={() =>
                    navigate(
                      AppConstantRoutes.paths.playlistDetailPage(playlist.id),
                    )
                  }
                />
              </div>
            ))}
          </div>
        )}
    </div>
  )
}
export default PlaylistPage
