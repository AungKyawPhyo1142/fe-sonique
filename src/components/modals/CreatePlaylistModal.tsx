import React, { useEffect } from 'react'
import BaseModal from '../common/BaseModal'
import { useFormik } from 'formik'
import { SongList } from '../Playlist/SongList'
import { Song } from '@/services/network/lib/songs'
import { useState } from 'react'
import PlaylistPreview from '../Playlist/PlaylistPreview'
import { playlistRequests } from '@/services/network/lib/playlist'
import { useAuthStore } from '@/services/zustand/authStore'
import { apiClient } from '@/services/network/apiClient'
import { ApiConstantRoutes } from '@/services/network/path'
import { useQuery } from '@tanstack/react-query'
import { array, object, ObjectSchema, string } from 'yup'
import { PlaylistCreateFormValue } from '@/services/network/lib/playlist'

//create playlist modal
interface CreatePlaylistModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  //refetchPlaylist: () => void
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  setIsOpen,
  //refetchPlaylist,
}) => {
  // get user
  const userId = useAuthStore((state) => state.auth.userId)

  useQuery({
    queryKey: ['getUser', userId],
    retry: 1,
    queryFn: async () => {
      const response = await apiClient.get(
        ApiConstantRoutes.paths.auth.getUser(userId),
      )
      return response
    },
    enabled: !!userId,
  })

  //create playlist
  const initialValues: PlaylistCreateFormValue = {
    //user_id: userId || '',
    name: '',
    songIds: [],
  }

  const validationSchema: ObjectSchema<PlaylistCreateFormValue> =
    object().shape({
      playlist_id: string().optional(),
      user_id: string().optional(),
      name: string().optional(),
      songIds: array()
        .of(string().required())
        .min(1, 'At least one song must be selected')
        .required('Song list is required'),
    })

  const onSubmit = async (value: PlaylistCreateFormValue) => {
    console.log('Value:: ', value)
    try {
      const createRes = await playlistRequests.createEmptyPlaylist({
        user_id: userId,
        name: value.name,
      })
      console.log('statusCreateRes:', createRes)
      if (!createRes || !createRes.status) {
        formik.setErrors({ name: 'No response from server. Try again later.' })
        return
      }

      if (createRes && createRes.status === 'SUCCESS' && createRes.data?.id) {
        const playlistId = createRes.data.id
        console.log('PlaylistId: ', playlistId)
        const addSongsRes = await playlistRequests.addSongsToPlaylist({
          user_id: parseInt(userId),
          playlistId: playlistId,
          songIds: value.songIds,
        })
        console.log('addSongRes: ', addSongsRes)

        if (addSongsRes?.status === 'SUCCESS') {
          console.log('Playlist created and songs added successfully')
          setIsOpen(false)
        } else {
          formik.setErrors({ songIds: 'Failed to add songs to playlist' })
        }
      } else {
        formik.setErrors({
          name: 'Failed to create playlist. Please try again.',
        })
      }
    } catch (error) {
      console.error('Error:', error)
      formik.setErrors({ name: 'Something went wrong. Try again later.' })
    }
  }
  const formik = useFormik<PlaylistCreateFormValue>({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  })
  //SongList

  const [playlist, setPlaylist] = useState<Song[]>([])

  // using useEffect songIds update with playlist
  useEffect(() => {
    const songIds = playlist.map((s) => s.id)
    formik.setFieldValue('songIds', songIds)
  }, [playlist])

  //add remove cancel songs to preplaylist
  const handleAdd = (song: Song) => {
    setPlaylist((prev) => {
      if (!prev.some((s) => s.id === song.id)) {
        return [...prev, song]
      }
      return prev
    })
  }
  const handleRemove = (id: string) => {
    setPlaylist((prev) => prev.filter((song) => song.id !== id))
  }
  const handleCancel = () => {
    formik.resetForm()
    setPlaylist([])
  }
  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} className=' text-white '>
      <form onSubmit={formik.handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Untitled Playlist'
          value={formik.values.name}
          onChange={formik.handleChange}
          className='text-[65px] font-bold pl-9 outline-none placeholder:text-[#FFFFFF]'
        />
        <div className='border border-[#FFFFFF]/30 rounded-xl shadow-lg grid grid-cols-2'>
          <SongList playlistSongs={playlist} onAdd={handleAdd} />
          <PlaylistPreview
            songs={playlist}
            setSongs={setPlaylist}
            onRemove={handleRemove}
            onCreate={formik.handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </form>
    </BaseModal>
  )
}

export default CreatePlaylistModal
