import Button from '@/components/common/Button'
import GlassCard from '@/components/common/GlassCard'
import SongUploadModal from '@/components/modals/SongUploadModal'
import { Music2, Clock3, Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import EmptySong from '/images/EmptySongList.svg'
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

      {songs.length === 0 ? (
        <div className='min-w-[900px] justify-items-center'>
          <img src={EmptySong} className=' min-w-[300px] rounded-2xl' />
        </div>
      ) : (
        <GlassCard className='flex flex-col items-center !p-2 justify-center min-w-[900px]'>
          <table className='text-left w-full ml-2 mb-[50px]'>
            <thead className='text-[20px] text-zinc-500 '>
              <tr>
                <th className='py-4 px-4 font-light w-10'>#</th>
                <th className='py-4 px-4 font-light flex-grow'>Title</th>
                <th className='py-4 px-4 font-light w-20'>
                  <Clock3 size={20} />
                </th>
                <th className='py-4 px-4 font-light w-40'>Created At</th>
                <th className='py-4 px-4 font-light w-32 text-center'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='text-[20px] font-extralight '>
              {songs.map((song, index) => (
                <tr key={index}>
                  <td className='py-4 px-4 w-10'>
                    <Music2 size={20} />
                  </td>
                  <td className='py-4 px-4 flex items-center gap-2 flex-grow'>
                    {song.title}
                  </td>
                  <td className='py-4 px-4 w-16'>{song.duration}</td>
                  <td className='py-4 px-4 w-40'>{song.date}</td>
                  <td className='py-4 px-4 w-32  '>
                    <td className='w-16 px-2 hover:cursor-pointer'>
                      <Pencil size={20} />
                    </td>
                    <td className='w-16 px-2 hover:cursor-pointer'>
                      <Trash2 size={20} />
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      )}
    </div>
  )
}

export default SongContent
