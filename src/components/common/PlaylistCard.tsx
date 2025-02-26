import React from 'react'

interface Props {
  image: string
  title: string
  description: string
}
const PlaylistCard: React.FC<Props> = ({ image, title, description }) => {
  return (
    <div className='w-48 bg-[#181818] p-[16px] rounded-[3%] hover:opacity-90 cursor-pointer'>
      <img
        src={image}
        alt={title}
        className='w-full h-40 object-cover rounded-[4%] mb-4 shadow-md shadow-black'
      />
      <p className='text-[#FFFFFF] text-lg font-semibold truncate '>{title}</p>
      <p className='text-[#A7A7A7] line-clamp-2 text-[14px] mt-1 mb-1'>
        {description}
      </p>
    </div>
  )
}

export default PlaylistCard
