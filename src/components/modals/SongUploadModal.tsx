import React from 'react'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
import BaseModal from '../common/BaseModal'
import Input from '../common/Input'
import Button from '../common/Button'

interface SongUploadModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSongUpload: (song: {
    title: string
    genere: string
    album: string
    duration: string
    date: string
  }) => void
}

const SongUploadModal: React.FC<SongUploadModalProps> = ({
  isOpen,
  setIsOpen,
  setSongUpload,
}) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      genere: '',
      album: '',
      audio: null as File | null,
      cover: null as File | null,
    },
    onSubmit: (values) => {
      const date = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })
      const duration = '03:35'
      setSongUpload({
        title: values.title,
        genere: values.genere,
        album: values.album,
        duration,
        date,
      })
    },
  })

  const onDropAudio = (acceptedFiles: File[]) => {
    formik.setFieldValue('audio', acceptedFiles[0])
  }

  const onDropCover = (acceptedFiles: File[]) => {
    formik.setFieldValue('cover', acceptedFiles[0])
  }

  const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps } =
    useDropzone({
      onDrop: onDropAudio,
      accept: { 'audio/*': ['.mp3', '.wav', '.flac'] },
      maxFiles: 1,
    })

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({
      onDrop: onDropCover,
      accept: { 'image/*': ['.jpg', '.png'] },
      maxFiles: 1,
    })

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} title='Upload your track'>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex flex-col gap-y-6 w-full'>
          <Input
            type='text'
            name='title'
            placeholder='Track Title'
            onChange={formik.handleChange}
          />
          <Input
            type='text'
            name='genere'
            placeholder='Genere'
            onChange={formik.handleChange}
          />
          <Input
            type='text'
            name='album'
            placeholder='Album'
            onChange={formik.handleChange}
          />

          {/* Audio Upload */}
          <div>
            <h2 className='text-zinc-500 mb-2'>Audio File</h2>
            <div
              {...getAudioRootProps()}
              className='p-4 border border-zinc-500 text-zinc-500 rounded flex flex-col items-center cursor-pointer'
            >
              <input {...getAudioInputProps()} />
              <p>Drag & drop your audio file here or click to browse</p>
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
              className='p-4 border border-zinc-500 text-zinc-500 rounded flex flex-col items-center cursor-pointer'
            >
              <input {...getCoverInputProps()} />
              <p>Drag & drop your cover image here or click to browse</p>
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
              className='px-[30px] py-2 !font-semibold'
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              primary
              className='px-[30px] py-2 !font-semibold'
              type='submit'
            >
              Upload Track
            </Button>
          </div>
        </div>
      </form>
    </BaseModal>
  )
}

export default SongUploadModal
