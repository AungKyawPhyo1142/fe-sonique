import React from 'react'
import EmptySongIcon from '@/assets/EmptySong.svg?react'

interface EmptyStateProps {
  heading: string
  subheading: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ heading, subheading }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <EmptySongIcon className=' size-[300px]' />
      <div className='flex flex-col gap-y-3 items-center justify-center'>
        <h1 className='font-medium text-[#5f6671] text-3xl'>{heading}</h1>
        <h3 className='font-light text-[#5f6671a9] text-base'>{subheading}</h3>
      </div>
    </div>
  )
}

export default EmptyState
