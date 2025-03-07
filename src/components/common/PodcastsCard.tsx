import React from 'react'

interface Props {
  image: string
  title: string
  year: string
  time: string
  icon?: boolean
  className?: string
}

const PodcastsCard: React.FC<Props> = ({ image, title, year, time, icon }) => {
  return (
    <div className='w-full bg-[#181818] p-[16px] rounded-[3%] hover:opacity-90 cursor-pointer'>
      <img
        src={image}
        alt={title}
        className='w-full h-40 object-cover rounded-[4%] mb-4 shadow-md shadow-black'
      />
      <p className='text-[#FFFFFF] text-lg font-semibold truncate'>{title}</p>
      <div className='text-[#A7A7A7] truncate text-[13px] mt-2 mb-1 flex items-center gap-x-2'>
        {icon && (
          <div className='bg-[#A7A7A7] text-[#181818] px-[6px] rounded-[3px] flex items-center'>
            <p>E</p>
          </div>
        )}
        <div>{year}</div>
        <div className='w-[2px] h-[2px] bg-[#A7A7A7] rounded-full'></div>
        <div>{time}</div>
      </div>
    </div>
  )
}

export default PodcastsCard
