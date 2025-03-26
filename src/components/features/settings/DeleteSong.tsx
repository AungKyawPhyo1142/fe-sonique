import BaseModal from '@/components/common/BaseModal'
import Button from '@/components/common/Button'
import { songRequests } from '@/services/network/lib/songs'
import React, { useState } from 'react'

interface DeleteSongProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  songId: string
  refetch: () => void
  setAlertMessage: React.Dispatch<
    React.SetStateAction<{
      message: string
      type: 'success' | 'error' | 'info'
    } | null>
  >
}

const DeleteSong: React.FC<DeleteSongProps> = ({
  isOpen,
  setIsOpen,
  songId,
  refetch,
  setAlertMessage,
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const res = await songRequests.DeleteSong({ songId })
      if (res && res.status === 'SUCCESS') {
        console.log('Song Deleted:', res.data)
        refetch()
        setIsOpen(false)
        setAlertMessage({
          message: 'The song was deleted successfully!',
          type: 'success',
        })
      } else {
        console.error('Error deleting song:', res)
      }
    } catch (error: any) {
      console.error(
        'Error deleting song:',
        error.response?.data || error.message,
      )
      setAlertMessage({ message: 'Error deleting song.', type: 'error' })
    }
    setIsDeleting(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
    setAlertMessage({ message: 'Song deletion was cancelled.', type: 'info' })
  }
  return (
    <>
      <BaseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Delete Song'
        content='Are you sure you want to delete this song?'
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
            onClick={handleDelete}
            disabled={isDeleting}
            loading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </BaseModal>
    </>
  )
}

export default DeleteSong
