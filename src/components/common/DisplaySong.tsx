import { useEffect, useRef, useState } from 'react'
import { CirclePlay, CirclePause } from 'lucide-react'
import Equalizer from './Equalizer'
interface Props {
  songSrc: string
  imgSrc: string
  register?: boolean
  login?: boolean
}

const DisplaySong: React.FC<Props> = ({ songSrc, imgSrc, register, login }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
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
          src={imgSrc}
          alt='Album Cover'
          className='w-full h-full object-cover opacity-80'
        />
      </div>

      {/* Audio Controls */}
      <audio
        ref={audioRef}
        src={songSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeDuration}
      />

      {/* Duration Slider */}
      {/**Login */}
      {login && (
        <div className='flex flex-col items-center gap-y-[2px]'>
          <input
            type='range'
            min='0'
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className='w-60 mt-7 hover:cursor-pointer appearance-none bg-transparent
                    [&::-webkit-slider-runnable-track]:bg-[#e9e3b4] 
                    [&::-webkit-slider-runnable-track]:rounded-s-full [&::-webkit-slider-runnable-track]:rounded-e-full
                    [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:bg-[#e9e3b4] [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:mt-[-6px]'
          />

          {/* Current Time / Duration */}
          <div className='text-[#e9e3b4] text-[16px] font-semibold flex w-60 justify-between mt-2'>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className='text-[#e9e3b4] hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#e7e4c8]'
          >
            {isPlaying ? <CirclePause size={40} /> : <CirclePlay size={40} />}
          </button>

          <Equalizer backgroundColor={'#e9e3b4'} isPlaying={isPlaying} />
        </div>
      )}
      {/**Register */}
      {register && (
        <div className='flex flex-col items-center gap-y-[2px]'>
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
          <div className='text-[#F5678D] text-[16px] font-semibold flex w-60 justify-between mt-2'>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className='text-[#F5678D] hover:cursor-pointer transition-all duration-150 ease-linear hover:scale-105 hover:text-[#ff89a0]'
          >
            {isPlaying ? <CirclePause size={40} /> : <CirclePlay size={40} />}
          </button>

          <Equalizer backgroundColor={'#F5678D'} isPlaying={isPlaying} />
        </div>
      )}
    </div>
  )
}

export default DisplaySong
