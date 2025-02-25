import React from 'react'

interface Props {
  image: string
  title: string
  description: string
}
const PlaylistCard: React.FC<Props> = ({ image, title, description }) => {
  return (
    <div className='m-5 w-48 bg-gray-800 p-2 rounded-[3%] hover:opacity-90 cursor-pointer'>
      <img
        src={image}
        alt={title}
        className='w-full h-40 object-cover rounded-[4%] mb-4'
      />
      <p className='text-white text-lg font-semibold truncate px-1'>{title}</p>
      <p className='text-gray-300 line-clamp-2 text-sm mt-1 mb-1 px-1'>
        {description}
      </p>
    </div>
  )
}

export default PlaylistCard
