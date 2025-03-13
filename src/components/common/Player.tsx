import { AppConstantRoutes } from '@/services/routes/path'
import { useSongStore } from '@/services/zustand/songStore'
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
import { useRef, useState } from 'react'
import { useLocation } from 'react-router'

const Player = () => {
  const { playPause, isPlaying, addToQueue, queue, currentSongIndex } =
    useSongStore()
  //const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const location = useLocation()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      playPause()
    }
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.volume = parseFloat(e.target.value)
      setVolume(parseFloat(e.target.value))
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${String(seconds).padStart(2, '0')}`
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
  if (!location.pathname.includes(AppConstantRoutes.paths.songDetailPage(''))) {
    return (
      <div className='flex flex-col items-center justify-center mx-1 px-5'>
        <audio
          ref={audioRef}
          src={queue[currentSongIndex].songSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeDuration}
        />
        <img
          src={queue[currentSongIndex].image}
          alt={queue[currentSongIndex].title}
          className='w-[90%] h-45 rounded-md m-5'
        />
        <div className='flex flex-col items-center w-full'>
          <input
            type='range'
            min='0'
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className='w-full max-w-[90%]  hover:cursor-pointer appearance-none bg-transparent
                              [&::-webkit-slider-runnable-track]:bg-[#686767] 
                              [&::-webkit-slider-runnable-track]:rounded-s-full [&::-webkit-slider-runnable-track]:rounded-e-full
                              [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:appearance-none 
                              [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                              [&::-webkit-slider-thumb]:bg-[#ffffff] [&::-webkit-slider-thumb]:rounded-full 
                              [&::-webkit-slider-thumb]:mt-[-6px]'
          />
          <div className='flex flex-row items-center justify-between w-full m-1.5'>
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
            onClick={togglePlayPause}
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
          src={queue[currentSongIndex].image}
          alt={queue[currentSongIndex].title}
          className='w-12 h-12 rounded-md'
        />
        <div className='flex flex-col w-full overflow-hidden'>
          <span className='text-md font-bold truncate'>
            {queue[currentSongIndex].title}
          </span>
          <span className='text-sm'>{queue[currentSongIndex].description}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={queue[currentSongIndex].songSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeDuration}
      />

      <div className='flex flex-col items-center w-full px-4 flex-[3]'>
        {/* song controls */}
        <div className='flex flex-row items-center space-x-4'>
          <button
            onClick={() => addToQueue(queue[currentSongIndex])}
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
            onClick={togglePlayPause}
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
            onChange={handleSeek}
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
          className='w-full max-w-[15%] md:max-w-[22%] lg:max-w-[30%] hover:cursor-pointer appearance-none bg-transparent
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
