import React, { useState } from 'react'
import { Play } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  image: string
  title: string
  description: string
  className?: string
}
const PlaylistCard: React.FC<Props> = ({
  image,
  title,
  description,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className={clsx(
        'w-[200px] bg-[#181818] p-[16px] group rounded-[3%] hover:opacity-90 cursor-pointer h-[300px] transition-all duration-150 ease-linear',
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative'>
        {/* <img
          src={image}
          alt={title}
          className='w-full h-40 object-cover rounded-[4%] mb-4  shadow-black shadow-[0_2px_10px_rgba(0,0,0,0.1)]'
        /> */}
        <div className=' overflow-hidden rounded-md shadow-lg mb-4'>
          <img
            src={image}
            alt={title}
            className='w-full h-40 object-cover rounded-[4%]  shadow-black shadow-[0_2px_10px_rgba(0,0,0,0.1)]'
          />
        </div>
        {isHovered && (
          <button
            className=' absolute bottom-2 right-2 bg-green-500 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105 hover:bg-green-400'
            aria-label={`Play ${title}`}
          >
            <Play className='h-5 w-5 text-black fill-black' />
          </button>
        )}
      </div>
      <p className='text-[#FFFFFF] text-lg font-semibold truncate '>{title}</p>
      <p className='text-[#A7A7A7] line-clamp-2 text-[14px] mt-1 mb-1'>
        {description}
      </p>
    </div>
  )
}

export default PlaylistCard
