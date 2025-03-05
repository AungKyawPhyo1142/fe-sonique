import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'
import ProfileImage from '@/components/common/ProfileImage'
import Seperator from '@/components/common/Seperator'
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
import { clsx } from 'clsx'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { object, ObjectSchema, string } from 'yup'

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
  const [active, setActive] = useState(true)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
      setModalContent('User updated successfully')
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

  //edit button

  //handle image change
  const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target
    if (!fileInput.files?.length) return

    const selected = fileInput.files[0]

    // File size check (max 2MB)
    if (selected.size > MAX_FILE_SIZE) {
      setModalStatus(true)
      setModalTitle('Error')
      setModalContent('File size is too large (max 2MB)')
      return
    }

    // File type check
    if (!ALLOWED_FILE_TYPES.includes(selected.type)) {
      setModalStatus(true)
      setModalTitle('Error')
      setModalContent('Please upload a valid image file (JPEG, PNG, or WebP)')
      return
    }

    setSelectedFile(selected)
  }

  //image upload modal
  const ImageUploadModal = () => {
    return (
      <div
        className={clsx(
          'fixed inset-0 flex items-center justify-center bg-white/30 z-50',
          {
            visible: uploadImage,
            invisible: !uploadImage,
          },
        )}
      >
        {/* Modal Box */}
        <div
          className={clsx(
            'bg-black rounded-lg shadow-lg text-white transition-all scale-100 opacity-100 relative',
            'w-[90%] max-w-100 flex flex-col', // Added flex column
          )}
        >
          {/* Header - Fixed at top */}
          <div className='flex justify-between p-6'>
            <h1 className='text-lg font-semibold'>Preview</h1>
          </div>

          {/* Image Preview */}
          <div className='flex justify-center items-center p-5'>
            <ProfileImage
              image={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : user?.data.profile_image || ''
              }
              onClick={handleImageClick}
              component={
                <div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity'>
                  <span className='text-white text-sm mb-10'>Choose Photo</span>
                  <input
                    type='file'
                    ref={imageRef}
                    className='hidden'
                    accept={ALLOWED_FILE_TYPES.join(',')}
                    onChange={handleImageChange}
                  />
                </div>
              }
            />
          </div>

          <div className='flex justify-center items-center p-5'>
            <Button
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              onClick={() => {
                console.log('Upload image', selectedFile)
                setUploadImage(false)
              }}
              className='w-fit px-10 h-[50px]'
              primary
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    )
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
      setModalContent('Failed to activate artist status')
    }
  }
  //toggle artist status button
  const ToggleSwitch = () => (
    <div className='flex items-center space-x-3 p-3 rounded-lg'>
      <button
        onClick={toggleArtistStatus}
        className={`w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 transition ${
          enabled ? 'bg-gray-200' : 'bg-gray-600'
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
            enabled ? 'translate-x-6' : ''
          }`}
        />
      </button>
      <span className='text-white font-semibold'>
        {enabled ? 'Artist' : 'Become an artist'}
      </span>
    </div>
  )
  const handleImageClick = () => {
    if (imageRef.current) {
      imageRef.current.click()
    }
    imageRef.current?.click()
    setUploadImage(true)
  }

  //error handling
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong</div>

  return (
    <div className='text-white min-h-screen flex flex-col'>
      {/* Modal */}
      <Modal
        isOpen={modalStatus}
        onClose={() => setModalStatus(false)}
        title={modalTitle}
        content={modalContent}
        button
      />
      {/* Image Upload Modal */}
      {uploadImage && <ImageUploadModal />}
      {/* Profile */}
      <div className='flex flex-row items-center justify-start bg-gradient-to-b from-[#9e9d9d] to-transparent'>
        <ProfileImage
          onClick={() => setUploadImage(true)}
          image={user?.data.profile_image}
        />

        <h1 className='text-7xl font-bold'>
          {user?.data.firstName} {user?.data.lastName}
        </h1>
      </div>
      {/* Bio */}
      <div className='bg-[#53515154] p-5 text-center'>{user?.data.bio}</div>
      <div className='flex flex-grow'>
        {/* Sidebar */}
        {enabled && (
          <nav className='bg-[#242424] w-[240px] p-10'>
            <ul className='flex flex-col gap-y-5'>
              <SideBarItem
                key='profile'
                title='Profile'
                active={active}
                onClick={() => setActive(!active)}
              />
              <SideBarItem
                key='song'
                title='Songs'
                active={!active}
                onClick={() => setActive(!active)}
              />
            </ul>
          </nav>
        )}
        {/* Content */}
        {active ? (
          <div className='flex flex-col flex-grow items-center justify-center bg-[#1A1A1A]'>
            <div className='w-fit'>
              <div
                className={`rounded-xl ${disable ? 'bg-[#1A1A1A]' : 'bg-black'} border border-[#e5e7eb] bg-card text-card-foreground shadow p-5 w-full max-w-md min-w-[500px] md:min-w-none`}
              >
                <form
                  className='flex flex-col gap-y-5'
                  onSubmit={formik.handleSubmit}
                >
                  <fieldset disabled={disable}>
                    <div className='flex flex-row gap-x-5'>
                      <div className='flex flex-col flex-1'>
                        <label htmlFor='firstName' className='mb-3'>
                          First Name
                        </label>
                        <Input
                          type='text'
                          id='firstName'
                          onChange={onInputChange}
                          value={formik.values.firstName}
                          error={formik.errors.firstName}
                          placeholder='First Name'
                        />
                      </div>
                      <div className='flex flex-col flex-1'>
                        <label htmlFor='lastName' className='mb-3'>
                          Last Name
                        </label>
                        <Input
                          type='text'
                          id='lastName'
                          onChange={onInputChange}
                          value={formik.values.lastName}
                          error={formik.errors.lastName}
                          placeholder='Last Name'
                        />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='bio' className='mb-3'>
                        Bio
                      </label>
                      <Input
                        type='text'
                        id='bio'
                        onChange={onInputChange}
                        value={formik.values.bio}
                        error={formik.errors.bio}
                        placeholder='Enter your bio'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='email' className='mb-3'>
                        Email
                      </label>
                      <Input
                        type='email'
                        id='email'
                        onChange={onInputChange}
                        value={formik.values.email}
                        error={formik.errors.email}
                        placeholder='Email address'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='username' className='mb-3'>
                        Username
                      </label>
                      <Input
                        type='text'
                        id='username'
                        onChange={onInputChange}
                        value={formik.values.username}
                        error={formik.errors.username}
                        placeholder='Username'
                      />
                    </div>
                  </fieldset>
                  <div className='flex justify-end'>
                    {disable ? (
                      <Button
                        className='w-fit px-10 h-[50px]'
                        primary
                        type='button'
                        onClick={handleImageClick}
                      >
                        Edit
                      </Button>
                    ) : (
                      <Button
                        loading={formik.isSubmitting}
                        disabled={formik.isSubmitting}
                        className='w-fit px-10 h-[50px]'
                        primary
                        type='submit'
                      >
                        Save
                      </Button>
                    )}
                  </div>
                </form>
              </div>
              <Seperator className='my-4 mt-5' />
              <ToggleSwitch />
            </div>
          </div>
        ) : (
          // Upload Songs
          <div className='flex flex-col flex-grow items-center justify-center bg-[#1A1A1A]'>
            <div className='text-white text-2xl'>Upload Songs</div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Profile
