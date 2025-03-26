import GlassCard from '@/components/common/GlassCard'
import Player from '@/components/common/Player'
import { formatDuration } from '@/helpers/helpers'
import { useGetSongDetail } from '@/services/network/lib/songs'

import clsx from 'clsx'
import { useParams } from 'react-router'

const SongDetail = () => {
  const { id } = useParams()

  const { data: songData, isLoading, error, isError } = useGetSongDetail(id!)

  const duration = formatDuration(songData?.data.duration ?? 0)

  if (isError) {
    console.log('error', error)
    return <div>Error...</div>
  }
  return (
    <div className='min-h-screen flex flex-col'>
      {isLoading && <div>Loading...</div>}

      {/* Song Detail */}
      {!isLoading && !isError && songData?.data && (
        <div
          style={{ backgroundImage: `url(${songData.data.coverImageURL})` }}
          className={clsx(
            `flex flex-col text-white items-center  justify-center h-[90vh] bg-cover bg-center bg-no-repeat `,
          )}
        >
          <GlassCard className='!rounded-none  flex flex-col items-center justify-center space-y-5 w-full h-full !backdrop-blur-md bg-black/50 text-white'>
            <div className='flex flex-row items-center justify-center space-x-5'>
              {/* Song Image */}

              <img
                src={songData.data?.coverImageURL}
                alt={songData.data?.title}
                className='w-fit h-50 rounded-lg'
              />

              {/* Song Detail */}
              <div className='flex flex-col items-start justify-center'>
                <h1 className='text-[100px] font-bold leading-none'>
                  {songData.data?.title}
                </h1>
                <div className='flex flex-row items-center justify-start text-2xl space-x-2 '>
                  <img
                    src={
                      songData.data.artist.profile_image ||
                      'https://robohash.org/default-avatar.png'
                    }
                    alt={songData.data.artist.name}
                    className='w-10 h-10 rounded-lg object-cover '
                  />
                  <span>{songData.data?.artist.name}</span>
                  <div className='rounded-full bg-white w-2 h-2'></div>
                  <span>{duration}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Audio Player (Footer) */}
      {songData?.data && <Player />}
    </div>
  )
}
export default SongDetail
