import GlassCard from '@/components/common/GlassCard'
import Player from '@/components/common/Player'
import { apiClient } from '@/services/network/apiClient'
import { ApiConstantRoutes } from '@/services/network/path'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
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

  const { data, isLoading, error } = useQuery({
    queryKey: ['getSongDetail'],
    queryFn: fetchSongDetail,
  })

  const duration = () => {
    const minutes = Math.floor(data?.duration / 60)
    const seconds = Math.round(data?.duration % 60)
    return `${minutes}:${seconds}`
  }

  const {
    data: user,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['getUser', data?.artist?.id], // Use optional chaining
    retry: 1,
    queryFn: async () => {
      const response = await apiClient.get(
        ApiConstantRoutes.paths.auth.getUser(data.artist.id),
      )
      console.log('user response', response)
      return response.data // Ensure only relevant data is returned
    },
    enabled: !!data?.artist?.id, // Ensure the query runs only when artist ID is available
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Song Detail */}
      <div
        style={{ backgroundImage: `url(${data?.coverImageURL})` }}
        className={clsx(
          `flex flex-col text-white items-center  justify-center h-[90vh] bg-cover bg-center bg-no-repeat `,
        )}
      >
        <GlassCard className='!rounded-none  flex flex-col items-center justify-center space-y-5 w-full h-full !backdrop-blur-md bg-black/50 text-white'>
          <div className='flex flex-row items-center justify-center space-x-5'>
            {/* Song Image */}

            <img
              src={data?.coverImageURL}
              alt={data?.title}
              className='w-fit h-50 rounded-lg'
            />

            {/* Song Detail */}
            <div className='flex flex-col items-start justify-center space-y-5'>
              <h1 className='text-[100px] font-bold leading-none'>
                {data?.title}
              </h1>
              <div className='flex flex-row items-center justify-start text-2xl space-x-2 '>
                <img
                  src={
                    user?.profile_image ||
                    'https://robohash.org/default-avatar.png'
                  }
                  alt={data.artist.name}
                  className='w-10 h-10 rounded-lg object-cover '
                />
                <span>{data?.artist.name}</span>
                <div className='rounded-full bg-white w-2 h-2'></div>
                <span>{duration()}</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Audio Player (Footer) */}
      {data && <Player />}
    </div>
  )
}
export default SongDetail
