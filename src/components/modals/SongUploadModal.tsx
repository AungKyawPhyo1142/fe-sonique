import React from 'react'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
import BaseModal from '../common/BaseModal'
import Input from '../common/Input'
import Button from '../common/Button'
import { Music, Upload } from 'lucide-react'
import { ListBox } from '../common/Select'
import { useCustomEvents } from '@/services/formik/hooks'
import SelectWithModal from '../common/SelectWithModal'
import CreateGenreModalContent from '../features/genres/CreateGenreModalContent'
import { songRequests, useGetAllGenres } from '@/services/network/lib/songs'
import { useAuthStore } from '@/services/zustand/authStore'
import { useQuery } from '@tanstack/react-query'
import { ApiConstantRoutes } from '@/services/network/path'
import { apiClient } from '@/services/network/apiClient'
//import { object, ObjectSchema, string, mixed } from 'yup'

export interface SongUploadFormValues {
  id?: string
  title: string
  genre: string
  audio: File | null
  cover: File | null
}

interface SongUploadModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  // setSongUpload:()=>void
}

let genreOptions: ListBox[]

//Song Upload Modal
const SongUploadModal: React.FC<SongUploadModalProps> = ({
  isOpen,
  setIsOpen,
  //setSongUpload,
}) => {
  //Create Genre
  const [createGenreModalOpen, setCreateGenreModalOpen] = React.useState(false)
  const {
    data: genreData,
    refetch: genreRefetch,
    isSuccess,
  } = useGetAllGenres()

  // update genre options when genreData changes
  if (isSuccess && genreData.data.length > 0) {
    genreOptions = genreData.data.map((genre) => ({
      label: genre.name,
      value: genre.id.toString(),
    }))
  }
  // console.log('opt', genreOptions)

  //check user ID
  const userId = useAuthStore((state) => state.auth.userId)
  const { error, refetch } = useQuery({
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

  //Song Form Value
  const initialValues: SongUploadFormValues = {
    title: '',
    genre: '',
    audio: null,
    cover: null,
  }
  /**
  const validationSchema: ObjectSchema<SongUploadFormValues> = object().shape({
    title: string().required('Title is required'),
    genre: string().required('Genre is required'),
    audio: mixed().required('Audio file is required'),
    cover: mixed().required('Cover image is required'),
  })
  */
  const onSubmit = async (values: SongUploadFormValues) => {
    const formData = new FormData()
    formData.append('title', values.title!)
    formData.append('genre', values.genre!)
    formData.append('audio', values.audio!)
    formData.append('cover', values.cover!)

    try {
      const res = await songRequests.uploadSong({
        id: userId!,
        formData,
      })
      console.log('API Response: ', res)
      if (res && res.status === 'SUCCESS') {
        console.log('Song Uploaded:', res.data)
        setIsOpen(false)
        refetch()
      } else {
        console.error('Error uploading song:', error)
      }
    } catch (error: any) {
      console.error(
        'Error uploading song:',
        error.response?.data || error.message,
      )
    }
  }

  const formik = useFormik({
    initialValues,
    //validationSchema,
    onSubmit,
  })

  const onDropAudio = (acceptedFiles: File[]) => {
    formik.setFieldValue('audio', acceptedFiles[0])
  }

  const onDropCover = (acceptedFiles: File[]) => {
    formik.setFieldValue('cover', acceptedFiles[0])
  }

  const audioMaxSize = 30 * 1024 * 1024
  const coverMaxSize = 2 * 1024 * 1024

  const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps } =
    useDropzone({
      onDrop: onDropAudio,
      accept: { 'audio/*': ['.mp3', '.wav'] },
      maxFiles: 1,
      maxSize: audioMaxSize,
    })

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({
      onDrop: onDropCover,
      accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
      maxFiles: 1,
      maxSize: coverMaxSize,
    })

  const { onSetValueById } = useCustomEvents<SongUploadFormValues>(formik)

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} title='Upload your track'>
      <form onSubmit={formik.handleSubmit} className='w-[700px]'>
        <div className='flex flex-col gap-y-6 w-full '>
          <Input
            type='text'
            name='title'
            placeholder='Track Title'
            onChange={formik.handleChange}
            className='font-light'
          />
          <SelectWithModal
            isOpen={createGenreModalOpen}
            onModalClose={() => {
              genreRefetch()
              setCreateGenreModalOpen(false)
            }}
            setIsOpen={setCreateGenreModalOpen}
            ModalTitle='Create Genre'
            ModalSubHeading='Fill all the fields to create a new genre'
            ModalContent={
              <CreateGenreModalContent
                setModalOpen={setCreateGenreModalOpen}
                refetch={genreRefetch}
              />
            }
            name='genre'
            placeholder='Select music genre'
            listOption={genreOptions ?? []}
            value={formik.values.genre}
            onSelected={(value) => {
              onSetValueById('genre', value)
            }}
          />
          {/* Audio Upload */}
          <div>
            <h2 className='text-zinc-500 mb-2'>Audio File</h2>
            <div
              {...getAudioRootProps()}
              className='text-center p-4 border border-zinc-500 text-zinc-500 rounded flex flex-col items-center cursor-pointer  gap-y-3 '
            >
              <input {...getAudioInputProps()} />
              <Music size={30} />
              <p className='text-[16px] font-semibold'>
                Drag & drop your audio file or click to browse
              </p>
              <p className='text-[12px] font-light text-zinc-400/70'>
                Supports MP3,WAV (max 30MB){' '}
              </p>
              {formik.values.audio && (
                <p className='text-sm text-gray-300'>
                  {formik.values.audio.name}
                </p>
              )}
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <h2 className='text-zinc-500 mb-2'>Cover Image</h2>
            <div
              {...getCoverRootProps()}
              className='text-center p-4 border border-zinc-500 text-zinc-500 rounded flex flex-col items-center cursor-pointer  gap-y-3 '
            >
              <input {...getCoverInputProps()} />
              <Upload size={30} />
              <p className='text-[16px] font-semibold'>
                Drag & drop your cover image or click to browse
              </p>
              <p className='text-[12px] font-light text-zinc-400/70'>
                Supports JPG, JPEG, PNG, WEBP (max 2MB)
              </p>
              {formik.values.cover && (
                <p className='text-sm text-gray-300'>
                  {formik.values.cover.name}
                </p>
              )}
            </div>
          </div>

          <div className='flex justify-between w-full'>
            <Button
              secondary
              className='px-[30px] py-2'
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button primary className='px-[30px] py-2' type='submit'>
              Upload Track
            </Button>
          </div>
        </div>
      </form>
    </BaseModal>
  )
}

export default SongUploadModal
