import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import { formatDuration } from '@/helpers/helpers'

interface DraggableRowProps {
  id: string
  title: string
  coverImageUrl: string
  duration: number
  onRemove: (id: string) => void
}

const DraggableRow: React.FC<DraggableRowProps> = ({
  id,
  title,
  coverImageUrl,
  duration,
  onRemove,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <tr ref={setNodeRef} style={style} className='hover:bg-gray-800'>
      <td className='py-4 px-4 w-10' {...attributes} {...listeners}>
        <GripVertical size={25} color='white' className='cursor-grab' />
      </td>
      <td className='py-4 px-4'>
        <img
          className='object-cover w-[50px] h-[50px] rounded-[10px]'
          src={coverImageUrl}
          alt='cover'
        />
      </td>
      <td className='py-4 px-4 flex gap-2'>{title}</td>
      <td className='py-4 px-4 w-20'>{formatDuration(duration)}</td>
      <td className='py-4 px-4'>
        <span className='cursor-pointer' onClick={() => onRemove(id)}>
          <Trash2 size={20} />
        </span>
      </td>
    </tr>
  )
}

export default DraggableRow
