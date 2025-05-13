import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Music2 } from 'lucide-react'
import SortableCard from './SortableCard'
import { Song } from '@/services/network/lib/songs'

interface Props {
  songs: Song[]
  setSongs: (songs: Song[]) => void
  onRemove: (id: string) => void
  onCreate: () => void
  onCancel: () => void
}

const PlaylistPreview: React.FC<Props> = ({
  songs,
  setSongs,
  onRemove,
  onCreate,
  onCancel,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  )
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = songs.findIndex((song) => song.id === active.id)
      const newIndex = songs.findIndex((song) => song.id === over?.id)
      setSongs(arrayMove(songs, oldIndex, newIndex))
    }
  }
  return (
    <div className='flex flex-col max-h-[800px] w-full text-white'>
      {songs.length > 0 ? (
        <>
          <h2 className='text-2xl font-bold m-5 px-3'>
            Total Songs: {songs.length}
          </h2>
          <div className='flex-1 overflow-y-auto p-4 overflow-x-hidden'>
            <DndContext
              collisionDetection={closestCenter}
              sensors={sensors}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={songs.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className='grid grid-cols-3 gap-[8px] px-3'>
                  {songs.map((song) => (
                    <SortableCard
                      key={song.id}
                      song={song}
                      onRemove={onRemove}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
          <div className='flex border-t border-[#FFFFFF]/30 p-5 justify-between'>
            <button
              type='button'
              onClick={onCancel}
              className='bg-[#FFFFFF]/20 text-[#FFFFFF]/50 px-[20px] py-2 transition rounded-[10px] hover:cursor-pointer shadow-lg hover:opacity-80'
            >
              Cancel
            </button>

            <button
              type='submit'
              onClick={onCreate}
              className='bg-[#ffffff] text-black px-[50px] py-2 rounded-[10px] shadow-md hover:cursor-pointer hover:opacity-80 transition'
            >
              Create Playlist
            </button>
          </div>
        </>
      ) : (
        <div className=' flex flex-col items-center justify-center h-full text-[20px] gap-4 '>
          <Music2 size={40} strokeWidth={3} />
          <h1>Your selected songs will be shown here!</h1>
        </div>
      )}
    </div>
  )
}
export default PlaylistPreview
