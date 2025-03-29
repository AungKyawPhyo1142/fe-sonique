import { Plus } from 'lucide-react'
import React from 'react'

interface FloatingActionButtonProps {
  onClick: () => void
  icon?: React.ReactNode
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  icon = <Plus className='w-10 h-10' />,
}) => {
  return (
    <button
      onClick={onClick}
      className='fixed bottom-6 right-6 p-4  transition-all backdrop-blur-md bg-zinc-800/50 text-white rounded-full shadow-lg duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
      aria-label='Add item'
    >
      {icon}
    </button>
  )
}

export default FloatingActionButton
