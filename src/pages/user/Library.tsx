import LibraryCard from '@/components/common/LibraryCard'
import { Bookmark } from 'lucide-react'

const Library = () => {
  return (
    <div className='flex flex-col relative fade-in'>
      <div className='flex flex-row justify-between items-center p-4 text-white'>
        <h1 className='font-bold text-2xl hover:underline'>Playlists</h1>
      </div>

      <div className='w-full grid gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {/* Liked Songs Card */}
        <div className='col-span-2 bg-gradient-to-br from-[#450AF5] to-[#8E8EE5] text-white p-6 rounded-lg flex flex-col justify-end h-[300px] transition-all duration-150 ease-linear'>
          <h1 className='text-2xl font-bold mb-1'>Liked Songs</h1>
          <p className='text-sm'>2 liked songs</p>
        </div>
        {/* Save Card */}
        <div className='w-full bg-[#181818] p-4 group rounded-[3%] hover:opacity-90 cursor-pointer h-[300px] transition-all duration-150 ease-linear'>
          <div className='w-full h-40 bg-[#056952] rounded-md mb-4 flex items-center justify-center'>
            <Bookmark className=' text-[#1ED760] fill-current' size={80} />
          </div>
          <div>
            <h2 className='text-[#FFFFFF] text-lg font-semibold truncate '>
              Your Episodes
            </h2>
            <p className='text-[#A7A7A7] line-clamp-2 text-[14px] mt-1 mb-1'>
              14 episodes
            </p>
          </div>
        </div>

        {/* Library Card  */}
        {Array(10)
          .fill(0)
          .map((_) => (
            <LibraryCard
              image={'/images/music.png'}
              title={'Library Title'}
              description={'Library Card description Library Card description'}
            />
          ))}
      </div>
    </div>
  )
}
export default Library
