import React from 'react'

interface Props {
  image: string
  title: string
}
const MusictypeCard: React.FC<Props> = ({ image, title }) => {
  return (
    <div className='m-5 w-48 bg-gray-800 p-2 rounded-[4%] hover:opacity-90 transition-transform cursor-pointer relative'>
      <p className='text-white text-lg font-semibold truncate px-1 m-1 mt-2 pb-1'>
        {title}
      </p>
      <div className='relative w-full h-33'>
        <img
          src={image}
          alt={title}
          className='w-20 h-22 absolute right-0 bottom-0 shadow-lg'
        />
      </div>
    </div>
  )
}

export default MusictypeCard
