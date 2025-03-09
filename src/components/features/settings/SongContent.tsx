import Button from '@/components/common/Button'
import GlassCard from '@/components/common/GlassCard'
import SongUploadModal from '@/components/modals/SongUploadModal'
import { Music2, Clock3 } from 'lucide-react'
import React, { useState } from 'react'
/**
const songs = [
  { title: 'GNX', duration: '1:59', date: 'Mar 12, 2025' },
  { title: 'DNA', duration: '1:59', date: 'Apr 12, 2025' },
  { title: 'M.A.A.D City', duration: '1:59', date: 'Jun 12, 2025' },
  { title: 'DAMN', duration: '1:59', date: 'Dec 12, 2025' },
  { title: 'SECTION 80', duration: '1:59', date: 'Feb 12, 2025' },
  { title: 'ABCD', duration: '2:30', date: 'March 6, 2020' },
]
*/
interface Song {
  title: string
  duration: string
  date: string
}

const SongContent: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const addSong = (song: Song) => {
    setSongs([...songs, song])
    setIsModalOpen(false)
  }
  return (
    <div className='flex flex-col bg-[#202022] p-10 mx-auto min-h-screen'>
      <div className='flex justify-between mt-5 mb-[50px]'>
        <h1 className='text-3xl font-bold'>Your Songs</h1>
        <Button
          primary
          className='w-fit px-3 h-[50px]'
          type='button'
          onClick={() => setIsModalOpen(true)}
        >
          Upload a new track
        </Button>

        {/**Song Upload Modal */}
        {isModalOpen && (
          <SongUploadModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            setSongUpload={addSong}
          />
        )}
      </div>
      <GlassCard className='flex flex-col items-center !p-2 justify-center min-w-[900px]'>
        <table className='text-left w-full table-auto ml-2 mb-[50px]'>
          <thead className='text-[20px] text-zinc-500 '>
            <tr>
              <th className='py-4 px-4 font-light '>#</th>
              <th className='py-4 px-4 font-light '>Title</th>
              <th className='py-4 px-4 font-light '>
                <Clock3 size={20} />
              </th>
              <th className='py-4 px-4 font-light '>Created At</th>
            </tr>
          </thead>
          <tbody className='text-[20px] font-extralight '>
            {songs.map((song, index) => (
              <tr key={index}>
                <td className='py-4 px-4'>
                  <Music2 size={20} />
                </td>
                <td className='py-4 px-4 flex items-center gap-2'>
                  {song.title}
                </td>
                <td className='py-4 px-4'>{song.duration}</td>
                <td className='py-4 px-4'>{song.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  )
}

export default SongContent
