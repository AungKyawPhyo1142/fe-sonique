import React from 'react'
import './Equalizer.css'

interface EqualizerProps {
  isPlaying: boolean
}

const Equalizer: React.FC<EqualizerProps> = ({ isPlaying }) => {
  const bars = new Array(30).fill(0)

  return (
    <div className={`equalizer ${isPlaying ? 'playing' : ''}`}>
      {bars.map((_, i) => (
        <span
          key={i}
          className='bar'
          style={{ animationDelay: `${i * 0.1}s` }}
        ></span>
      ))}
    </div>
  )
}

export default Equalizer
