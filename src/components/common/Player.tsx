import { AppConstantRoutes } from '@/services/routes/path'
import { usePlayerStore } from '@/services/zustand/usePlayerStore'
import clsx from 'clsx'
import {
  CirclePause,
  CirclePlay,
  Repeat,
  Repeat1,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume,
  Volume1,
  Volume2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

const Player = () => {
  const {
    // queue,
    currentSong,
    isPlaying,
    volume,
    updateProgress,
    // playlist,
    initializeAudio,
    // setCurrentSong,
    toggleShuffle,
    repeatMode,
    isShuffled,
    time,
    onChangeCurrentTime,
    togglePlay,
    setVolume,
    playNext,
    playPrevious,

    setCurrentTime,
    toggleRepeatMode,
  } = usePlayerStore()

  useEffect(() => {
    initializeAudio()
  }, [initializeAudio])
  //const [isPlaying, setIsPlaying] = useState(false)
  // const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const location = useLocation()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value)
      setVolume(parseFloat(e.target.value))
      console.log('Volume:', audioRef.current.currentTime)
    }
  }

  const handleTimeDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value)
      setCurrentTime(parseFloat(e.target.value))
    }
  }
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!location.pathname.includes(AppConstantRoutes.paths.songDetailPage(''))) {
    return (
      <div className='flex flex-col items-center justify-center gap-y-3  w-44'>
        <img
          src={currentSong?.image}
          alt={currentSong?.title}
          className='w-fit h-32 rounded-md object-cover'
        />
        <div className=' overflow-hidden whitespace-nowrap text-ellipsis  w-full'>
          <h1
            className={clsx(
              'font-bold tracking-wide  ',
              currentSong &&
                currentSong?.title.length > 0 &&
                'animate-text-scroll',
            )}
          >
            {currentSong?.title}
          </h1>
        </div>

        <div className='w-full flex flex-col gap-y-3 '>
          <div className='flex items-center justify-between'>
            <button
              onClick={playPrevious}
              className=' w-auto text-white hover:cursor-pointer'
            >
              <SkipBack
                size={20}
                className=' stroke-1 transition-all duration-1 ease-linear hover:stroke-[#838383]'
              />
            </button>

            <button
              onClick={togglePlay}
              className=' w-auto text-white hover:cursor-pointer'
            >
              {isPlaying ? (
                <CirclePause
                  size={25}
                  className='stroke-1 transition-all duration-100 ease-linear hover:stroke-[#838383]'
                />
              ) : (
                <CirclePlay
                  size={25}
                  className='stroke-1 transition-all duration-100 ease-linear hover:stroke-[#838383]'
                />
              )}
            </button>

            <button
              onClick={playNext}
              className=' w-auto text-white hover:cursor-pointer '
            >
              <SkipForward
                size={20}
                className=' stroke-1 transition-all duration-100 ease-linear hover:stroke-[#838383]'
              />
            </button>
          </div>

          <div className='flex flex-col items-center gap-y-3'>
            <audio
              ref={audioRef}
              src={currentSong?.songSrc}
              onTimeUpdate={updateProgress}
              onLoadedMetadata={handleTimeDuration}
            />
            <input
              type='range'
              min='0'
              max={duration}
              value={time}
              onChange={(e) => {
                onChangeCurrentTime(parseFloat(e.target.value))
                handleSeek(e)
              }}
              className='w-full   hover:cursor-pointer appearance-none bg-transparent
                              [&::-webkit-slider-runnable-track]:bg-[#686767] 
                              [&::-webkit-slider-runnable-track]:rounded-s-full [&::-webkit-slider-runnable-track]:rounded-e-full
                              [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:appearance-none 
                              [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                              [&::-webkit-slider-thumb]:bg-[#ffffff] [&::-webkit-slider-thumb]:rounded-full 
                              [&::-webkit-slider-thumb]:mt-[-6px]'
            />
            <div className='flex flex-row items-center justify-between w-full'>
              <span className='text-sm '>{formatTime(time)}</span>
              <span className='text-sm '>{formatTime(duration)}</span>
            </div>
          </div>
          <div className='flex flex-col '></div>
        </div>
      </div>
    )
  }
  return (
    <div className='h-[10vh] flex items-center justify-between bg-zinc-900/80 backdrop-blur-md w-full text-white p-5'>
      {/* Song detail */}
      <div className='flex flex-row items-center space-x-2 flex-[1]'>
        <img
          src={currentSong?.image}
          alt={currentSong?.title}
          className='w-12 h-12 rounded-md'
        />
        <div className='flex flex-col overflow-hidden w-32 '>
          <div className=' overflow-hidden whitespace-nowrap text-ellipsis '>
            <h1
              className={clsx(
                'font-bold tracking-wide  ',
                currentSong &&
                  currentSong?.title.length > 0 &&
                  'animate-text-scroll',
              )}
            >
              {currentSong?.title}
            </h1>
          </div>
          {/* <span className='text-md font-bold truncate'>
            {currentSong.title}
          </span> */}
          <span className='text-sm'>{currentSong?.artist}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong?.songSrc}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={handleTimeDuration}
      />

      <div className='flex flex-col items-center w-full px-4 flex-[3]'>
        {/* song controls */}
        <div className='flex flex-row items-center space-x-4'>
          <button onClick={toggleShuffle} className={` hover:cursor-pointer `}>
            {isShuffled ? (
              <Shuffle className='stroke-1 stroke-white' />
            ) : (
              <Shuffle className='stroke-1 stroke-[#838383] hover:stroke-white transition-colors duration-75 ease-linear' />
            )}
          </button>

          <button
            onClick={playPrevious}
            className='text-white hover:cursor-pointer  '
          >
            <SkipBack
              size={25}
              className='stroke-1 transition-all duration-150 ease-linear hover:text-zinc-300'
            />
          </button>

          <button
            onClick={togglePlay}
            className='text-white hover:cursor-pointer '
          >
            {isPlaying ? (
              <CirclePause
                size={40}
                className='stroke-1 transition-all duration-150 ease-linear hover:text-zinc-300'
              />
            ) : (
              <CirclePlay
                size={40}
                className='stroke-1 transition-all duration-150 ease-linear hover:text-zinc-300'
              />
            )}
          </button>

          <button
            onClick={playNext}
            className='text-white hover:cursor-pointer '
          >
            <SkipForward
              size={25}
              className='stroke-1 transition-all duration-150 ease-linear hover:text-zinc-300'
            />
          </button>

          <button
            onClick={toggleRepeatMode}
            className='text-white hover:cursor-pointer '
          >
            {repeatMode === 'off' ? (
              <Repeat className='stroke-1 stroke-[#838383] hover:stroke-white transition-all duration-150 ease-linear ' />
            ) : repeatMode === 'song' ? (
              <Repeat1 className='transition-all duration-150 ease-linear stroke-white hover:stroke-[#838383] stroke-1' />
            ) : (
              <Repeat2 className='transition-all duration-150 ease-linear stroke-white hover:stroke-[#838383] stroke-1' />
            )}
          </button>
        </div>

        {/* Progress bar */}
        <div className='flex flex-row items-center justify-center w-full space-x-4'>
          {/* Current time */}
          <span className='text-sm min-w-[40px] text-right'>
            {formatTime(time)}
          </span>

          {/* Seek bar */}
          <input
            type='range'
            min='0'
            max={duration}
            value={time}
            onChange={(e) => {
              onChangeCurrentTime(parseFloat(e.target.value))
              handleSeek(e)
            }}
            className='w-full max-w-[30%] md:max-w-[45%] lg:max-w-[60%] hover:cursor-pointer appearance-none bg-transparent
                              [&::-webkit-slider-runnable-track]:bg-[#686767] 
                              [&::-webkit-slider-runnable-track]:rounded-s-full [&::-webkit-slider-runnable-track]:rounded-e-full
                              [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:appearance-none 
                              [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                              [&::-webkit-slider-thumb]:bg-[#ffffff] [&::-webkit-slider-thumb]:rounded-full 
                              [&::-webkit-slider-thumb]:mt-[-6px]'
          />

          {/* Duration */}
          <span className='text-sm min-w-[40px] text-left'>
            {formatTime(duration)}
          </span>
        </div>
      </div>
      {/* Volume control */}
      <div className='flex-[1] flex flex-row justify-end items-center space-x-1'>
        <button
          onClick={undefined}
          className='text-white hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
        >
          {/* Volume icon */}
          {volume > 0.6 ? (
            <Volume2 size={30} />
          ) : volume >= 0.3 ? (
            <Volume1 size={30} />
          ) : (
            <Volume size={30} />
          )}
        </button>

        {/* Volume bar */}
        <input
          type='range'
          min='0'
          max={1}
          value={volume}
          step={0.01}
          onChange={handleVolume}
          className='w-full max-w-[50%] md:max-w-[%] lg:max-w-[30%] hover:cursor-pointer appearance-none bg-transparent
                              [&::-webkit-slider-runnable-track]:bg-[#686767] 
                              [&::-webkit-slider-runnable-track]:rounded-s-full [&::-webkit-slider-runnable-track]:rounded-e-full
                              [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:appearance-none 
                              [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                              [&::-webkit-slider-thumb]:bg-[#ffffff] [&::-webkit-slider-thumb]:rounded-full 
                              [&::-webkit-slider-thumb]:mt-[-6px]'
        />
      </div>
    </div>
  )
}
export default Player
