import React from 'react'

interface EqualizerProps {
  isPlaying: boolean
  backgroundColor: string
}

const Equalizer: React.FC<EqualizerProps> = ({
  isPlaying,
  backgroundColor,
}) => {
  const bars = new Array(30).fill(0)

  return (
    <div>
      <style>{`
        .equalizer {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 4px;
          height: 50px;
          margin-top: 10px;
        }

        .bar {
          width: 4px;
          height: 5px;
          background: ${backgroundColor};
          border-radius: 2px;
          transition: height 0.3s;
        }

        .playing .bar {
          animation: beat 1s infinite ease-in-out alternate;
        }

        @keyframes beat {
          from {
            height: 5px;
          }
          to {
            height: 50px;
          }
        }
      `}</style>

      <div className={`equalizer ${isPlaying ? 'playing' : ''}`}>
        {bars.map((_, i) => (
          <span
            key={i}
            className='bar'
            style={{ animationDelay: `${i * 0.1}s` }}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default Equalizer
