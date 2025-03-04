import { useEffect, useRef, useState } from 'react'
import { CirclePlay, CirclePause } from 'lucide-react'

const DisplaySong = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }, [])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
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

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      {/* Rotating Album Img */}
      <div
        className={`w-60 h-60 rounded-full overflow-hidden border-4 ${
          isPlaying ? 'animate-spin' : ''
        }`}
        style={{ animationDuration: '4s', animationTimingFunction: 'linear' }}
      >
        <img
          src='/images/APT.jpg'
          alt='Album Cover'
          className='w-full h-full object-cover opacity-80'
        />
      </div>

      {/* Audio Controls */}
      <audio
        ref={audioRef}
        src='/audio/APT.mp3'
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeDuration}
      />

      <div className='flex flex-col items-center gap-y-[2px]'>
        {/* Duration Slider */}

        <input
          type='range'
          min='0'
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className='w-60 mt-7 hover:cursor-pointer appearance-none bg-transparent
                    [&::-webkit-slider-runnable-track]:bg-[#F5678D] 
                    [&::-webkit-slider-runnable-track]:rounded-s-full [&::-webkit-slider-runnable-track]:rounded-e-full
                    [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:bg-[#F5678D] [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:mt-[-6px]'
        />

        {/* Current Time / Duration */}
        <div className='text-[#F5678D] text-[16px] font-bold flex w-60 justify-between mt-1'>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className='text-[#F5678D] hover:cursor-pointer'
        >
          {isPlaying ? <CirclePause size={40} /> : <CirclePlay size={40} />}
        </button>
      </div>
    </div>
  )
}

export default DisplaySong
