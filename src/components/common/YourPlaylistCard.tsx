import clsx from 'clsx'
import { Play } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
  image: string
  title: string
  totalsongs: string
  className?: string
  onClick?: () => void
}
const YourPlaylistCard: React.FC<Props> = ({
  image,
  title,
  totalsongs,
  className,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className={clsx(
        'w-full bg-[#181818] p-4 group rounded-[3%] hover:opacity-90 cursor-pointer h-[300px] transition-all duration-150 ease-linear',
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className='relative'>
        <div className=' overflow-hidden rounded-md shadow-lg mb-4'>
          <img
            src={image}
            alt={title}
            className='w-full h-40 object-cover rounded-[3%]  shadow-black shadow-[0_2px_10px_rgba(0,0,0,0.1)]'
          />
        </div>
        {isHovered && (
          <button
            className=' absolute bottom-2 right-2 bg-zinc-800/50 border-zinc-300/50 border backdrop-blur-2xl rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-zinc-800/30'
            aria-label={`Play ${title}`}
          >
            <Play className='h-5 w-5 text-white fill-white' />
          </button>
        )}
      </div>
      <p className='text-[#FFFFFF] text-lg font-semibold truncate '>{title}</p>
      <p className='text-[#A7A7A7] line-clamp-2 text-[14px] mt-1 mb-1'>
        Total Songs: {totalsongs}
      </p>
    </div>
  )
}

export const PlaylistCardSkeleton: React.FC = () => {
  return (
    <div className='w-full bg-[#181818] p-4 rounded-[3%] h-[300px] animate-pulse'>
      <div className='relative'>
        <div className='overflow-hidden rounded-md shadow-lg mb-4'>
          <div className='w-full h-40 bg-gray-500 animate-pulse rounded-[3%]' />
        </div>
      </div>
      <div className='w-full bg-gray-500 animate-pulse h-5 rounded-md' />
      <div className='w-full bg-gray-500 animate-pulse h-3 rounded-md mt-2' />
    </div>
  )
}

export default YourPlaylistCard
