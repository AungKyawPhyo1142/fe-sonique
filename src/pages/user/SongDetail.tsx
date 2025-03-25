import GlassCard from '@/components/common/GlassCard'
import Player from '@/components/common/Player'
import { apiClient } from '@/services/network/apiClient'
import { ApiConstantRoutes } from '@/services/network/path'
import { usePlayerStore } from '@/services/zustand/usePlayerStore'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { ListPlus, Play } from 'lucide-react'
import { useParams } from 'react-router'

const SongDetail = () => {
  const { id } = useParams()
  const fetchSongDetail = async () => {
    const response = await apiClient.get(
      ApiConstantRoutes.paths.auth.getSongDetail(id),
    )
    console.log('song detail response', response)
    return response.data
  }

  const {
    data: song,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['getSongDetail'],
    queryFn: fetchSongDetail,
  })

  const duration = () => {
    const minutes = Math.floor(song?.duration / 60)
    const seconds = Math.round(song?.duration % 60)
    return `${minutes}:${seconds}`
  }
  const { playThisSong, isPlaying ,queue} = usePlayerStore()

  const { data: user } = useQuery({
    queryKey: ['getUser', song?.artist?.id], // Use optional chaining
    retry: 1,
    queryFn: async () => {
      const response = await apiClient.get(
        ApiConstantRoutes.paths.auth.getUser(song.artist.id),
      )
      console.log('user response', response)
      return response.data // Ensure only relevant data is returned
    },
    enabled: !!song?.artist?.id, // Ensure the query runs only when artist ID is available
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Song Detail */}
      <div
        style={{ backgroundImage: `url(${song?.coverImageURL})` }}
        className={clsx(
          `flex flex-col text-white items-center justify-center ${
             queue.length!=0 ? 'h-[90vh]' : 'h-[100vh]'
          } bg-cover bg-center bg-no-repeat `,
        )}
      >
        <GlassCard className='!rounded-none flex flex-col items-center justify-center space-y-5 w-full h-full !backdrop-blur-md bg-black/50 text-white'>
          <div className='flex flex-row items-center justify-center space-x-5'>
            {/* Song Image */}

            <img
              src={song?.coverImageURL}
              alt={song?.title}
              className='w-fit h-50 rounded-lg'
            />

            {/* Song Detail */}
            <div className='flex flex-col items-start justify-center'>
              <h1 className='text-[100px] font-bold leading-none'>
                {song?.title}
              </h1>
              <div className='flex flex-row items-center justify-start text-2xl space-x-2 '>
                <img
                  src={
                    user?.profile_image ||
                    'https://robohash.org/default-avatar.png'
                  }
                  alt={song?.artist.name}
                  className='w-10 h-10 rounded-lg object-cover '
                />
                <span>{song?.artist.name}</span>
                <div className='rounded-full bg-white w-2 h-2'></div>
                <span>{duration()}</span>
              </div>
              <div className='flex flex-row items-center justify-center space-x-5 py-5'>
                <button
                  onClick={() =>
                    playThisSong({
                      id: song.id,
                      title: song.title,
                      artist: song.artist.name,
                      image: song.coverImageURL,
                      songSrc: song.audioURL,
                    })
                  }
                  className='text-white hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
                >
                  <Play size={40} />
                </button>
                <button
                  onClick={undefined}
                  className='text-white hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
                >
                  <ListPlus size={40} />
                </button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Audio Player (Footer) */}
      {song && queue.length!=0 ? <Player /> : null}
    </div>
  )
}
export default SongDetail
