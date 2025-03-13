import Modal from '@/components/common/Modal'
import ProfileForm from '@/components/features/settings/ProfileForm'
import SongContent from '@/components/features/settings/SongContent'
import ToggleSwitch from '@/components/common/ToggleSwitch'
import ImageUploadModal from '@/components/modals/ImageUploadModal'
import { SideBarItem } from '@/components/navbar/Sidebar'
import { useCustomEvents } from '@/services/formik/hooks'
import { apiClient } from '@/services/network/apiClient'
import {
  toggleArtistRequest,
  userUpdateRequest,
} from '@/services/network/lib/user'
import { ApiConstantRoutes } from '@/services/network/path'
import { useAuthStore } from '@/services/zustand/authStore'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { Camera, Headphones, UserRound, Undo2 } from 'lucide-react'
import { ChangeEvent, useRef, useState } from 'react'
import { object, ObjectSchema, string } from 'yup'
import Button from '@/components/common/Button'
import { useNavigate } from 'react-router'

export interface ProfileFormValues {
  id?: string
  bio: string
  email: string
  firstName: string
  lastName: string
  username: string
}

const Profile = () => {
  const [disable, setDisable] = useState(true)
  const [modalStatus, setModalStatus] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')
  const imageRef = useRef<HTMLInputElement>(null)
  const [uploadImage, setUploadImage] = useState(false)
  const [index, setIndex] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loadingButton, setLoadingButton] = useState(false)
  const navigate = useNavigate()
  //get user details
  const userId = useAuthStore((state) => state.auth.userId)
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
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

  //get artist status
  const [enabled, setEnabled] = useState(user?.data.isArtist || false)

  //formik
  const initialValues: ProfileFormValues = {
    id: userId,
    bio: user?.data.bio || '',
    email: user?.data.email || '',
    firstName: user?.data.firstName || '',
    lastName: user?.data.lastName || '',
    username: user?.data.username || '',
  }

  //validation schema
  const validationSchema: ObjectSchema<ProfileFormValues> = object().shape({
    id: string().required('Id is required'),
    bio: string().required('Bio is required'),
    email: string().email().required('Email is required'),
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    username: string().required('Username is required'),
  })

  //handle Edit click
  const handleEditButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    setDisable(!disable)
  }

  //on submit
  const onSubmit = async (values: ProfileFormValues) => {
    const res = await userUpdateRequest.updateUser(values).catch((error) => {
      console.log('Failed to update user: ', error)
    })

    if (res && res.status === 'SUCCESS') {
      console.log('User updated successfully')
      setDisable(!disable)
      setModalStatus(true)
      setModalTitle('Update Successful')
      setModalContent('User updated successfully.')
      refetch()
    } else {
      console.log('Failed to update user')
    }
  }
  //formik
  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
  })
  //custom event
  const { onInputChange } = useCustomEvents<ProfileFormValues>(formik)

  //handle image change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0])
    }
  }
  //image upload
  const handleImageUpload = async () => {
    const formData = new FormData()
    formData.append('profile_image', selectedFile!)
    setLoadingButton(true)
    try {
      const res = await userUpdateRequest.upLoadImage({
        id: userId!,
        formData,
      })
      if (res.status === 'SUCCESS') {
        setUploadImage(false)
        setModalStatus(true)
        setModalTitle('Upload Successful')
        setModalContent('Profile image uploaded successfully.')
        setLoadingButton(false)
        refetch()
      } else {
        throw new Error('Failed to upload image')
      }
    } catch (error) {
      console.log('Failed to upload image: ', error)
      setModalStatus(true)
      setModalTitle('Upload Failed')
      setModalContent('Failed to upload profile image.')
    }
  }

  //toggle artist status
  const toggleArtistStatus = async () => {
    try {
      const res = enabled
        ? await toggleArtistRequest.deactivateArtist({ id: userId! })
        : await toggleArtistRequest.activateArtist({ id: userId! })
      if (res.status === 'SUCCESS') {
        setEnabled(!enabled)
        setModalStatus(true)
        setModalTitle(
          enabled ? 'Deactivation Successful' : 'Activation Successful',
        )
        setModalContent(
          enabled ? 'Artist status deactivated' : 'Artist status activated',
        )

        refetch()
      }
    } catch (error) {
      console.log('Failed to toggle artist status: ', error)
      setModalStatus(true)
      setModalTitle('Failed Activation')
      setModalContent('Failed to activate artist status.')
    }
  }

  const contentList = [
    <ProfileForm
      formik={formik}
      onInputChange={onInputChange}
      disable={disable}
      handleEditButtonClick={handleEditButtonClick}
      component={
        <ToggleSwitch
          enable={enabled}
          onToggle={toggleArtistStatus}
          offText='Become an artist?'
          onText='You are already an Artist!'
        />
      }
    />,
    <SongContent />,
  ]

  //error handling
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong</div>

  return (
    <div className='text-white bg-[#202022] min-h-screen w-full flex flex-col'>
      {/* Modal */}
      <Modal
        type='info'
        isOpen={modalStatus}
        setIsOpen={setModalStatus}
        title={modalTitle}
        content={modalContent}
        onCloseModal={() => setModalStatus(false)}
        button
      />
      {/* Image Upload Modal */}
      {uploadImage && (
        <ImageUploadModal
          uploadImage={uploadImage}
          setUploadImage={setUploadImage}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          formik={formik}
          loadingButton={loadingButton}
          handleImageChange={handleImageChange}
          handleImageUpload={handleImageUpload}
          imageRef={imageRef}
          pfp={user?.data.profile_image}
        />
      )}
      {/* Profile */}
      <div className='flex items-center justify-between'>
        <div className='flex flex-row items-center p-5'>
          <div className='relative '>
            <img
              src={user?.data.profile_image}
              alt='profile'
              className='w-40 h-40 rounded-full object-cover'
            />
            <div
              onClick={() => setUploadImage(true)}
              className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'
            >
              <Camera size={40} />
            </div>
          </div>

          <div className='flex flex-col items-start gap-y-5 px-10 justify-center'>
            <h1 className='text-6xl font-bold'>
              {user?.data.firstName} {user?.data.lastName}
            </h1>
            <span className='opacity-50'>@{user?.data.username}</span>
          </div>
        </div>
        <div className='flex flex-col mr-2'>
          <Button
            className='w-fit px-5 h-[50px]'
            secondary
            type='button'
            onClick={() => navigate('/')}
          >
            <Undo2 size={30} />
          </Button>
        </div>
      </div>
      {/* Bio */}
      <div className='bg-[#53515154] p-5 text-center'>{user?.data.bio}</div>
      <div className='flex flex-grow'>
        {/* Sidebar */}
        {enabled && (
          <nav className='bg-[#242424] w-[240px] py-10 transition-all duration-200 ease-in-out'>
            <ul className='flex flex-col gap-y-5 w-full items-center '>
              <SideBarItem
                icon={<UserRound size={20} className='ml-5' />}
                key='profile'
                title='Profile'
                active={index === 0}
                onClick={() => setIndex(0)}
                activeColor='bg-[#202022]'
                hoverColor='hover:bg-[#202022]'
                className=''
              />
              <SideBarItem
                icon={<Headphones size={20} className='ml-5' />}
                key='song'
                title='Songs'
                active={index === 1}
                onClick={() => setIndex(1)}
                activeColor='bg-[#202022]'
                hoverColor='hover:bg-[#202022]'
              />
            </ul>
          </nav>
        )}
        {/* Content */}
        {contentList[index]}
      </div>
    </div>
  )
}
export default Profile
