import React from 'react'
import { useNavigate } from 'react-router'
import clsx from 'clsx'
import { AppConstantRoutes } from '@/services/routes/path'

interface Props {
  image: string
  title: string
  color: string
  className?: string
}

const MusictypeCard: React.FC<Props> = ({ image, title, color, className }) => {
  const navigate = useNavigate()

  const clickCard = () => {
    navigate(AppConstantRoutes.paths.musictypePage(title)) // Navigate dynamic
  }

  return (
    <div
      className={clsx(
        'py-3 px-2 w-full bg-[#1e2939] rounded-[4%] transition-transform relative overflow-hidden hover:opacity-90 hover:shadow-lg cursor-pointer',
        className,
      )}
      style={{ backgroundColor: color }}
      onClick={clickCard}
    >
      <p className='text-white text-lg font-semibold truncate px-4 py-3'>
        {title}
      </p>
      <div className='relative w-full h-32'>
        <img
          src={image}
          alt={title}
          className='w-24 h-28 rounded-[8px] object-cover absolute -right-4 -bottom-4 rotate-12'
        />
      </div>
    </div>
  )
}

export default MusictypeCard
