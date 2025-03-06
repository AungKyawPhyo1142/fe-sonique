import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'
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
import { Camera, Headphones, UserRound } from 'lucide-react'
import { ChangeEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
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
  const [loadingButton,  setLoadingButton] = useState(false)

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
        setModalContent('Profile image uploaded successfully')
        setLoadingButton(false)
        refetch()
      } else {
        throw new Error('Failed to upload image')
      }
    } catch (error) {
      console.log('Failed to upload image: ', error)
      setModalStatus(true)
      setModalTitle('Upload Failed')
      setModalContent('Failed to upload profile image')
    }
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
          <div className='flex justify-center items-center p-5 relative'>
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : user?.data.profile_image
              }
              alt='preview'
              className='w-40 h-40 rounded-full object-cover'
            />
            <div
              onClick={() => imageRef.current?.click()}
              className='absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'
            >
              <Camera size={40} />
            </div>

            <input
              ref={imageRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageChange}
            />
          </div>

          <div className='flex flex-row justify-between p-5'>
            <Button
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              onClick={() => {
                console.log('Cancel image upload')
                setSelectedFile(null)
                setUploadImage(false)
              }}
              className='w-fit px-10 h-[50px]'
              primary
            >
              Cancel
            </Button>
            <Button
              loading={loadingButton}
              disabled={loadingButton}
              onClick={handleImageUpload}
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
        {enabled ? 'You are already an artist!' : 'Become an artist?'}
      </span>
    </div>
  )

  //error handling
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong</div>

  return (
    <div className='text-white bg-[#202022] min-h-screen flex flex-col'>
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
      <div className='flex flex-row items-center p-5'>
        <div className='relative px-10'>
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

        <div className='flex flex-col items-start gap-y-5 justify-center'>
        <h1 className='text-6xl font-bold'>
          {user?.data.firstName} {user?.data.lastName}
        </h1>
        <span className='opacity-50'>@{user?.data.username}</span>
        </div>
      </div>
      {/* Bio */}
      <div className='bg-[#53515154] p-5 text-center'>{user?.data.bio}</div>
      <div className='flex flex-grow'>
        {/* Sidebar */}
        {enabled && (
          <nav className='bg-[#242424] w-[240px] p-10'>
            <ul className='flex flex-col gap-y-5'>
              <SideBarItem
                icon={<UserRound size={20} />}
                key='profile'
                title='Profile'
                active={active}
                onClick={() => setActive(!active)}
              />
              <SideBarItem
                icon={<Headphones size={20} />}
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
          <div className='flex flex-col items-center justify-center bg-[#202022] m-auto  h-full'>
            <div
              className={clsx(
                disable ? 'bg-[#373739]' : 'bg-black',
                'p-10 h-full w-full flex flex-col items-center justify-center space-y-5 rounded-lg',
              )}
            >
              {/* Form */}
              <form
                className='flex flex-col items-start justify-center gap-y-5'
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <h1 className='text-3xl font-bold'>Profile Details</h1>
                  <span className='opacity-50'>
                    Update your desired details here.
                  </span>
                </div>
                <fieldset disabled={disable} className='flex flex-col gap-y-5'>
                  <div className='flex flex-row gap-x-5'>
                    <Input
                      type='text'
                      id='firstName'
                      onChange={onInputChange}
                      value={formik.values.firstName}
                      error={formik.errors.firstName}
                      placeholder='First Name'
                    />

                    <Input
                      type='text'
                      id='lastName'
                      onChange={onInputChange}
                      value={formik.values.lastName}
                      error={formik.errors.lastName}
                      placeholder='Last Name'
                    />
                  </div>

                  <Input
                    type='text'
                    id='bio'
                    onChange={onInputChange}
                    value={formik.values.bio}
                    error={formik.errors.bio}
                    placeholder='Enter your bio'
                  />

                  <Input
                    type='email'
                    id='email'
                    onChange={onInputChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                    placeholder='Email address'
                  />

                  <Input
                    type='text'
                    id='username'
                    onChange={onInputChange}
                    value={formik.values.username}
                    error={formik.errors.username}
                    placeholder='Username'
                  />
                </fieldset>
                <div className='flex flex-row justify-between w-full'>
                  <Button
                    className='w-fit px-10 h-[50px]'
                    secondary
                    type='button'
                    onClick={() => navigate('/')}
                  >
                    Back
                  </Button>
                  {disable ? (
                    <Button
                      className='w-fit px-10 h-[50px]'
                      primary
                      type='button'
                      onClick={handleEditButtonClick}
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
              <Seperator />
              <div className='flex justify-start w-full'>
                <ToggleSwitch />
              </div>
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
