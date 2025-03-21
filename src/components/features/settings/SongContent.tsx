import Button from '@/components/common/Button'
import GlassCard from '@/components/common/GlassCard'
import SongUploadModal from '@/components/modals/SongUploadModal'
import { Music2, Clock3, Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import EmptyState from '@/components/common/EmptyState'
import { useAuthStore } from '@/services/zustand/authStore'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/network/apiClient'
import { ApiConstantRoutes } from '@/services/network/path'
import { formatDate, formatDuration } from '@/helpers/helpers'

interface SongLists {
  id?: string
  title: string
  duration: number
  date: string
  create_at: string
}

const SongContent: React.FC = () => {
  //get userId
  const userId = useAuthStore((state) => state.auth.userId)
  const {
    data: user,
    isLoading,
    error,
    //refetch,
  } = useQuery({
    queryKey: ['getSongByArtist', userId],
    retry: 1,
    queryFn: async () => {
      const res = await apiClient.get(
        ApiConstantRoutes.paths.songs.getSongByArtist(userId),
      )
      return res.data
    },
    enabled: !!userId,
  })

  //get songs
  //const [songs, setSongs] = useState<SongLists[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  /**
  const addSong = () => {
    refetch()
    setIsModalOpen(false)
  }
  */

  //Formating date and time
  // const formatDuration = (sec: number) => {
  //   const minutes = Math.floor(sec / 60)
  //   const secs = Math.floor(sec % 60)
  //   return `${minutes}:${secs.toString().padStart(2, '0')}`
  // }

  // const formatDate = (d: string) => {
  //   const date = new Date(d)
  //   return date.toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //   })
  // }

  //error handling
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong</div>

  return (
    <div className='flex flex-col bg-[#202022] p-10 w-full min-h-screen'>
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
            //setSongUpload={addSong}
          />
        )}
      </div>
      {user?.length === 0 ? (
        <EmptyState
          heading='Empty Song List'
          subheading="You haven't added any songs yet!"
        />
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
                <th className='py-4 px-4 font-light w-32'>Action</th>
              </tr>
            </thead>
            <tbody className='text-[20px] font-extralight '>
              {/**{songs.map((song, index) => ( ))}*/}

              {user?.map((song: SongLists) => (
                <tr key={song.id}>
                  <td className='py-4 px-4 w-10'>
                    <Music2 size={20} />
                  </td>
                  <td className='py-4 px-4 flex gap-2 flex-grow'>
                    {song.title}
                  </td>
                  <td className='py-4 px-4 w-16'>
                    {formatDuration(song.duration)}
                  </td>
                  <td className='py-4 px-4 w-40 text-center'>
                    {formatDate(song.create_at)}
                  </td>
                  <td className='py-4 px-4 w-32 flex items-center '>
                    <span className='w-16 px-2 hover:cursor-pointer'>
                      <Pencil size={20} />
                    </span>
                    <span className='w-16 px-2 hover:cursor-pointer'>
                      <Trash2 size={20} />
                    </span>
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
