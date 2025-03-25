import { AppConstantRoutes } from '@/services/routes/path'
import { usePlayerStore } from '@/services/zustand/usePlayerStore'
import {
  CirclePause,
  CirclePlay,
  Repeat,
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
    queue,
    currentSong,
    isPlaying,
    volume,
    updateProgress,
    playlist,
    initializeAudio,
    setCurrentSong,

    onChangeCurrentTime,
    togglePlay,
    setVolume,
    playNext,
    playPrevious,
  } = usePlayerStore()

  useEffect(() => {
    initializeAudio()
  }, [initializeAudio])
  //const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const location = useLocation()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value)
      setVolume(parseFloat(e.target.value))
    }
  }
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
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
      <div className='flex flex-col items-center justify-center'>
        <audio
          ref={audioRef}
          src={currentSong?.songSrc}
          onTimeUpdate={updateProgress}
          onLoadedMetadata={handleTimeDuration}
        />
        <img
          src={currentSong?.image}
          alt={currentSong?.title}
          className='w-fit h-40 rounded-md m-5 object-cover'
        />
        <div className='flex flex-col items-center w-full'>
          <input
            type='range'
            min='0'
            max={duration}
            value={currentTime}
            onChange={(e)=> {
              onChangeCurrentTime(parseFloat(e.target.value))
              handleSeek(e)
            }}
            className='w-full max-w-[80%]  hover:cursor-pointer appearance-none bg-transparent
                              [&::-webkit-slider-runnable-track]:bg-[#686767] 
                              [&::-webkit-slider-runnable-track]:rounded-s-full [&::-webkit-slider-runnable-track]:rounded-e-full
                              [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:appearance-none 
                              [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                              [&::-webkit-slider-thumb]:bg-[#ffffff] [&::-webkit-slider-thumb]:rounded-full 
                              [&::-webkit-slider-thumb]:mt-[-6px]'
          />
          <div className='flex flex-row items-center justify-between w-[80%] m-1.5'>
            <span className='text-sm min-w-[40px] text-right'>
              {formatTime(currentTime)}
            </span>
            <span className='text-sm min-w-[40px] text-left'>
              {formatTime(duration)}
            </span>
          </div>
          <div className='flex flex-row items-center space-x-4'>
            <button
              onClick={undefined}
              className='text-white hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={() => togglePlay()}
              className='text-white hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
            >
              {isPlaying ? <CirclePause size={30} /> : <CirclePlay size={30} />}
            </button>

            <button
              onClick={undefined}
              className='text-white hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
            >
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='h-[10vh] flex items-center justify-between bg-[#282828] w-full text-white p-5'>
      {/* Song detail */}
      <div className='flex flex-row items-center space-x-2 flex-[1]'>
        <img
          src={currentSong?.image}
          alt={currentSong?.title}
          className='w-12 h-12 rounded-md'
        />
        <div className='flex flex-col w-full overflow-hidden'>
          <span className='text-md font-bold truncate'>
            {currentSong?.title}
          </span>
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
          <button
            onClick={undefined}
            className='text-white hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
          >
            <Shuffle size={25} />
          </button>

          <button
            onClick={undefined}
            className='text-white hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
          >
            <SkipBack size={25} />
          </button>

          <button
            onClick={togglePlay}
            className='text-white hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
          >
            {isPlaying ? <CirclePause size={40} /> : <CirclePlay size={40} />}
          </button>

          <button
            onClick={undefined}
            className='text-white hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
          >
            <SkipForward size={25} />
          </button>

          <button
            onClick={undefined}
            className='text-white hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
          >
            <Repeat size={25} />
          </button>
        </div>

        {/* Progress bar */}
        <div className='flex flex-row items-center justify-center w-full space-x-4'>
          {/* Current time */}
          <span className='text-sm min-w-[40px] text-right'>
            {formatTime(currentTime)}
          </span>

          {/* Seek bar */}
          <input
            type='range'
            min='0'
            max={duration}
            value={currentTime}
            onChange={(e)=> {
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
