import { ProfileFormValues } from '@/pages/user/Profile'
import { FormikProps } from 'formik'
import { Camera } from 'lucide-react'
import { ChangeEvent } from 'react'
import BaseModal from '../common/BaseModal'
import Button from '../common/Button'
interface ImageUploadModalProps {
  uploadImage: boolean
  setUploadImage: React.Dispatch<React.SetStateAction<boolean>>
  selectedFile: File | null
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
  formik: FormikProps<ProfileFormValues>
  loadingButton: boolean
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleImageUpload: () => void
  imageRef: React.RefObject<HTMLInputElement | null>
  pfp: string
}
//image upload modal
const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  uploadImage,
  setUploadImage,
  selectedFile,
  setSelectedFile,
  formik,
  loadingButton,
  handleImageChange,
  handleImageUpload,
  imageRef,
  pfp,
}) => {
  return (
    <BaseModal
      isOpen={uploadImage}
      setIsOpen={setUploadImage}
      title='Preview'
      className='flex flex-col gap-y-5'
    >
      {/* Image Preview */}
      <div className='flex justify-center cursor-pointer items-center p-5 relative transition-all duration-200 ease-in-out border rounded-md border-zinc-500 border-dashed bg-zinc-800/50 w-full'>
        <img
          src={selectedFile ? URL.createObjectURL(selectedFile) : pfp}
          alt='preview'
          className='w-40 h-40 rounded-full object-cover'
        />
        <div
          onClick={() => imageRef.current?.click()}
          className='absolute  inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity backdrop-blur-2xl'
        >
          <Camera size={40} className='text-white' />
        </div>

        <input
          ref={imageRef}
          type='file'
          accept='image/*'
          className='hidden'
          onChange={handleImageChange}
        />
      </div>

      <div className='flex w-full justify-between gap-x-5 mt-5'>
        <Button
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
          onClick={() => {
            console.log('Cancel image upload')
            setSelectedFile(null)
            setUploadImage(false)
          }}
          className='w-[150px] px-5 h-[50px]'
          outline
        >
          Cancel
        </Button>
        <Button
          loading={loadingButton}
          disabled={loadingButton}
          onClick={handleImageUpload}
          className='w-[150px] px-5 h-[50px]'
          primary
        >
          Save
        </Button>
      </div>
    </BaseModal>
  )
}

export default ImageUploadModal
