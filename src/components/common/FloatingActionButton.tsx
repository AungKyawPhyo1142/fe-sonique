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
      className='fixed bottom-6 right-6 p-4 cursor-pointer transition-all backdrop-blur-md bg-zinc-800/50 text-white rounded-full border border-zinc-300/10 duration-200 ease-in-out hover:bg-zinc-700/50'
      aria-label='Add item'
    >
      {icon}
    </button>
  )
}

export default FloatingActionButton
