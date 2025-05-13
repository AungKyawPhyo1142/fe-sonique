// SortableCard.tsx
import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { CircleX } from 'lucide-react'
import { Song } from '@/services/network/lib/songs'

interface SortableCardProps {
  song: Song
  onRemove: (id: string) => void
}

const SortableCard: React.FC<SortableCardProps> = ({ song, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: song.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`relative group p-4
        cursor-grab ${isDragging ? 'opacity-50' : 'animate-wiggle'}`}
    >
      <div {...listeners} className='cursor-grab'>
        <img
          src={song.coverImageUrl}
          alt={song.title}
          className='w-full h-36 object-cover rounded-[10px]'
        />
        <p className='mt-1 text-[16px] font-light text-center text-[#FFFFFF]/50'>
          {song.title}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          console.log('Removing song:', song.id)
          onRemove(song.id)
        }}
        className='absolute top-[2px] right-[2px] bg-[#D7E0E3]/30 backdrop-blur-[2px]  rounded-full  shadow-md  group-hover:opacity-60 transition hover:cursor-pointer '
      >
        <CircleX size={30} color='#FFFFFF' />
      </button>
    </div>
  )
}

export default SortableCard
