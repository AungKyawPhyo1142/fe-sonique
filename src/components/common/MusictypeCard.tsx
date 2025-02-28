import React from 'react'
import clsx from 'clsx'

interface Props {
  image: string
  title: string
  color: string
  className?: string
}
const MusictypeCard: React.FC<Props> = ({ image, title, color, className }) => {
  return (
    <div
      className={clsx(
        'py-3 px-2 w-48 bg-[# #1e2939] rounded-[4%] hover:opacity-90 transition-transform cursor-pointer relative overflow-hidden',
        className,
      )}
      style={{backgroundColor: color}}
    >
      <p className='text-[#FFFFFF] text-lg font-semibold truncate px-[16px] py-[15px] pb-1'>
        {title}
      </p>
      <div className='relative w-full h-33'>
        <img
          src={image}
          alt={title}
          className='w-24 h-28 rounded-[8px] shadow-md shadow-black object-cover absolute -right-[22px] -bottom-[22px] rotate-25'
        />
      </div>
    </div>
  )
}

export default MusictypeCard
