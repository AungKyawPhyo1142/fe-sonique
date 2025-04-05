import GlassCard from '@/components/common/GlassCard'
import Player from '@/components/common/Player'
import { formatDuration } from '@/helpers/helpers'
import { useGetSongDetail } from '@/services/network/lib/songs'
import { usePlayerStore } from '@/services/zustand/usePlayerStore'

import clsx from 'clsx'
import { ListPlus, Play } from 'lucide-react'
import { useParams } from 'react-router'

const SongDetailSkeleton = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div
        className={clsx(
          'flex flex-col text-white items-center justify-center min-h-screen h-[90vh]',
          'bg-transparent',
        )}
      >
        <div className='flex flex-col items-center justify-center space-y-5 w-full h-full backdrop-blur-md bg-transparent text-white'>
          <div className='flex flex-row items-center justify-center space-x-5 p-4 md:p-8'>
            {/* Song Image Skeleton */}
            <div className='w-40 h-40 md:w-64 md:h-64 rounded-lg bg-gray-700 animate-pulse' />

            {/* Song Detail Skeleton */}
            <div className='flex flex-col items-start justify-center'>
              {/* Title Skeleton */}
              <div className='h-24 w-64 md:w-96 bg-gray-700 rounded-lg animate-pulse mb-4' />

              {/* Artist Info Skeleton */}
              <div className='flex flex-row items-center justify-start text-2xl space-x-2'>
                {/* Artist Image Skeleton */}
                <div className='w-10 h-10 rounded-lg bg-gray-700 animate-pulse' />

                {/* Artist Name Skeleton */}
                <div className='h-6 w-32 bg-gray-700 rounded-lg animate-pulse' />

                {/* Dot */}
                <div className='rounded-full bg-gray-700 w-2 h-2' />

                {/* Duration Skeleton */}
                <div className='h-6 w-16 bg-gray-700 rounded-lg animate-pulse' />
              </div>

              {/* Buttons Skeleton */}
              <div className='flex flex-row items-center justify-start space-x-5 mt-5'>
                <div className='w-8 h-8 rounded-full bg-gray-700 animate-pulse' />
                <div className='w-8 h-8 rounded-full bg-gray-700 animate-pulse' />
              </div>
            </div>
          </div>
        </div>

        <div className='h-[10vh] w-full bg-zinc-900/80 flex items-center justify-between px-4'>
          <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 rounded-md bg-gray-700 animate-pulse' />
            <div className='space-y-2'>
              <div className='h-4 w-32 bg-gray-700 rounded animate-pulse' />
              <div className='h-3 w-24 bg-gray-700 rounded animate-pulse' />
            </div>
          </div>
          <div className='w-1/3 flex flex-col items-center justify-center gap-y-2'>
            <div className='flex items-center space-x-4'>
              <div className='w-5 h-5 rounded-full bg-gray-700 animate-pulse' />
              <div className='w-5 h-5 rounded-full bg-gray-700 animate-pulse' />
              <div className='w-5 h-5 rounded-full bg-gray-700 animate-pulse' />
              <div className='w-5 h-5 rounded-full bg-gray-700 animate-pulse' />
              <div className='w-5 h-5 rounded-full bg-gray-700 animate-pulse' />
            </div>
            <div className='w-full h-2 bg-gray-700 rounded-full animate-pulse' />
          </div>
          <div className='w-1/7 flex items-center justify-center gap-x-2'>
            <div className='w-5 h-5 rounded-full bg-gray-700 animate-pulse' />
            <div className='w-full h-2 bg-gray-700 rounded-full animate-pulse' />
          </div>
        </div>
      </div>
    </div>
  )
}

const SongDetail = () => {
  const { id } = useParams()

  const { data: songData, isLoading, error, isError } = useGetSongDetail(id!)

  const duration = formatDuration(songData?.data.duration ?? 0)
  const { playThisSong, addToQueue, audioElement } = usePlayerStore()

  if (isError) {
    console.log('error', error)
    return <div>Error...</div>
  }
  return (
    <div className='min-h-screen flex flex-col'>
      {isLoading && <SongDetailSkeleton />}

      {/* Song Detail */}
      {!isLoading && !isError && songData?.data && (
        <div
          style={{ backgroundImage: `url(${songData.data.coverImageURL})` }}
          className={clsx(
            `flex flex-col text-white items-center justify-center min-h-screen`,
            audioElement ? 'h-[90vh]' : 'h-[100vh]',
            `bg-cover bg-center bg-no-repeat`,
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
                <div className='flex flex-row items-center justify-start space-x-5 mt-5'>
                  <button
                    onClick={() => {
                      if (songData.data) {
                        playThisSong({
                          id: songData.data.id,
                          title: songData.data.title,
                          artist: songData.data.artist.name,
                          image: songData.data.coverImageURL,
                          songSrc: songData.data.audioURL,
                        })
                      }
                    }}
                    className=' w-auto text-white hover:cursor-pointer '
                  >
                    <Play
                      size={30}
                      className='transition-all duration-150 ease-linear stroke-1 stroke-[#fff] hover:stroke-[#fff]/60'
                    />
                  </button>
                  <button
                    onClick={() => {
                      if (songData.data) {
                        addToQueue({
                          id: songData.data.id,
                          title: songData.data.title,
                          artist: songData.data.artist.name,
                          image: songData.data.coverImageURL,
                          songSrc: songData.data.audioURL,
                        })
                      }
                    }}
                    className=' w-auto text-white hover:cursor-pointer'
                  >
                    <ListPlus
                      size={35}
                      className='transition-all duration-150 ease-linear stroke-1 stroke-[#fff] hover:stroke-[#fff]/60'
                    />
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
          {/* Audio Player (Footer) */}
          {audioElement && <Player />}
        </div>
      )}
    </div>
  )
}
export default SongDetail
