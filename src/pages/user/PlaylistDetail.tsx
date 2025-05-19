import GlassCard from '@/components/common/GlassCard'
import Button from '@/components/common/Button'
import { Clock3, Trash2, GripVertical, ChevronLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { useGetPlaylistDetail } from '@/services/network/lib/playlist'
import { formatDuration } from '@/helpers/helpers'
import { useState } from 'react'
import RemoveSongFromPlaylist from '@/components/features/settings/RemoveSongFromPlaylist'
import { useAuthStore } from '@/services/zustand/authStore'
import Alert from '@/components/common/Alert'
import MoreMenu from '@/components/common/MoreMenu'

const PlaylistDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  console.log('Id:: ', id)
  const numericId = Number(id)
  //get user Id
  const userId = useAuthStore((state) => state.auth.userId)
  console.log('userId: ', userId)

  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false)
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null)
  const [alertMessage, setAlertMessage] = useState<{
    message: string
    type: 'success' | 'error' | 'info'
  } | null>(null)

  const {
    data,
    isLoading,
    isError,
    refetch: SongRefetch,
  } = useGetPlaylistDetail(numericId)
  if (isLoading) {
    return <p className='text-white text-[50px]'>Loading...</p>
  }

  if (isError) {
    return <p className='text-white text-[50px]'>No data found.</p>
  }
  console.log('selected song Id: ', selectedSongId)
  return (
    <div className='flex flex-col bg-[#202022] p-10 w-full min-h-screen'>
      {alertMessage && (
        <Alert
          message={alertMessage.message}
          type={alertMessage.type}
          onClose={() => setAlertMessage(null)}
        />
      )}
      <div className='flex justify-between mb-[50px]'>
        <span className='flex text-3xl font-bold text-white space-x-2'>
          <Button
            className='w-fit px-5 text-white'
            type='button'
            onClick={() => navigate('/createplaylist')}
          >
            <ChevronLeft size={30} />
          </Button>

          <h1>{data?.data.name}</h1>
        </span>
        {/* <Button className='w-fit px-5 text-white' type='button'>
          <MoreVertical size={30} />
        </Button> */}
        <MoreMenu />
      </div>
      <GlassCard className='flex flex-col items-center !p-2 justify-center min-w-[900px] '>
        <table className='text-left w-full ml-2 mb-[50px]'>
          <thead className='text-[20px] text-zinc-500 border-b'>
            <tr>
              <th className='py-4 px-4 font-light w-10'>#</th>
              <th className='py-4 px-4 font-light w-30'>Cover </th>
              <th className='py-4 px-4 font-light flex-grow'>Title</th>
              <th className='py-4 px-4 font-light w-20 '>
                <Clock3 size={20} />
              </th>
              <th className='py-4 px-4 font-light w-32'>Action</th>
            </tr>
          </thead>
          <tbody className='text-[20px] font-extralight text-white'>
            {data?.data.songs.map((song) => (
              <tr key={song.id}>
                <td className='py-4 px-4 w-10'>
                  <GripVertical size={25} color='white' />
                </td>
                <td className='py-4 px-4 '>
                  <img
                    className='object-cover w-[50px] h-[50px] rounded-[10px]'
                    src={song.coverImageUrl}
                    alt='cover'
                  />
                </td>
                <td className='py-4 px-4 flex gap-2 flex-grow'>{song.title}</td>
                <td className='py-4 px-4 w-20'>
                  <p>{formatDuration(song.duration)}</p>
                </td>
                <td className='py-4 px-4 '>
                  <Trash2
                    size={20}
                    className='hover:cursor-pointer '
                    onClick={() => {
                      setSelectedSongId(song.id!)
                      setRemoveModalOpen(true)
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          {isRemoveModalOpen && selectedSongId && (
            <RemoveSongFromPlaylist
              isOpen={isRemoveModalOpen}
              setIsOpen={setRemoveModalOpen}
              userId={userId!}
              playlistId={id!}
              songId={[selectedSongId]}
              refetch={SongRefetch}
              setAlertMessage={setAlertMessage}
            />
          )}
        </table>
      </GlassCard>
    </div>
  )
}
export default PlaylistDetail
