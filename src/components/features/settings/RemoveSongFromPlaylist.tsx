import BaseModal from '@/components/common/BaseModal'
import Button from '@/components/common/Button'
import { playlistRequests } from '@/services/network/lib/playlist'
import React, { useState } from 'react'

interface RemoveSongFromPlaylistProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  userId: string
  playlistId: string
  songId: string
  refetch: () => void
  setAlertMessage: React.Dispatch<
    React.SetStateAction<{
      message: string
      type: 'success' | 'error' | 'info'
    } | null>
  >
}

const RemoveSongFromPlaylist: React.FC<RemoveSongFromPlaylistProps> = ({
  isOpen,
  setIsOpen,
  userId,
  playlistId,
  songId,
  refetch,
  setAlertMessage,
}) => {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = async () => {
    setIsRemoving(true)
    try {
      const res = await playlistRequests.RemoveSong({
        userId,
        playlistId,
        songIds: [songId],
      })
      console.log('resRemove::', res)

      if (res && res.status === 'SUCCESS') {
        console.log('Song Rmoved:', res.data)
        refetch()
        setIsOpen(false)
        setAlertMessage({
          message: 'Song removed from playlist successfully!',
          type: 'success',
        })
      } else {
        console.error('Error removing song:', res)
        setAlertMessage({ message: 'Failed to remove song.', type: 'error' })
      }
    } catch (error: any) {
      refetch()
      setIsOpen(false)
      console.error(
        'Error removing song:',
        error.response?.data || error.message,
      )
      setAlertMessage({ message: 'Error removing song.', type: 'error' })
    }
    setIsRemoving(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
    setAlertMessage({ message: 'Song removing was cancelled.', type: 'info' })
  }
  return (
    <>
      <BaseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Remove Song from playlist'
        content='Are you sure you want to remove this song from the playlist??'
        button
        type='info'
      >
        <div className='flex place-self-end gap-x-4'>
          <Button className='p-4 flex' outline onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            className='p-4 flex'
            primary
            onClick={handleRemove}
            disabled={isRemoving}
            loading={isRemoving}
          >
            Remove
          </Button>
        </div>
      </BaseModal>
    </>
  )
}

export default RemoveSongFromPlaylist
