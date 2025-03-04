import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Modal from '@/components/common/Modal'
import Seperator from '@/components/common/Seperator'
import { SideBarItem } from '@/components/navbar/Sidebar'
import { useCustomEvents } from '@/services/formik/hooks'
import { apiClient } from '@/services/network/apiClient'
import { ApiConstantRoutes } from '@/services/network/path'
import { useAuthStore } from '@/services/zustand/authStore'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useState } from 'react'
import { object, ObjectSchema, string } from 'yup'

const SidebarItems = [
  {
    title: 'Profile',
    path: '',
  },
  {
    title: 'Songs',
    path: '',
  },
]

export interface ProfileFormValues {
  bio: string
  email: string
  firstName: string
  lastName: string
  username: string
}

const Profile = () => {
  const [disable, setDisable] = useState(true)
  const [errorModal, setErrorModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)

  //get user details
  const userId = useAuthStore((state) => state.auth.userId)
  const { data: user } = useQuery({
    queryKey: ['getUser', userId], // Include userId to refetch when it changes
    retry: 1,
    queryFn: async () => {
      const response = await apiClient.get(
        ApiConstantRoutes.paths.auth.getUser(userId),
      )
      return response // Ensure only `data` is returned
    },
    enabled: !!userId, // Only run query if userId is defined
  })

  const [enabled, setEnabled] = useState(user?.data.isArtist || false)

  //initial values
  const initialValues: ProfileFormValues = {
    bio: user?.data.bio || '',
    email: user?.data.email || '',
    firstName: user?.data.firstName || '',
    lastName: user?.data.lastName || '',
    username: user?.data.username || '',
    //validation
  }
  const validationSchema: ObjectSchema<ProfileFormValues> = object().shape({
    bio: string().required('Bio is required'),
    email: string().email().required('Email is required'),
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    username: string().required('Username is required'),
  })

  //on submit

  const onSubmit = async (values: ProfileFormValues) => {
    console.log('values', values)
    const res = await apiClient
      .patch(ApiConstantRoutes.paths.auth.updateUser(userId), values)
      .catch((error) => {
        console.log('Failed to update user: ', error)
      })

    if (res && res.status === 200) {
      console.log('User updated successfully')
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

  const { onInputChange } = useCustomEvents<ProfileFormValues>(formik)

  const handleEditClick = (e: { preventDefault: () => void }) => {
    e.preventDefault() // Prevent form submission when switching to edit mode
    setDisable(false)
  }
  const toggleArtistStatus = async () => {
    console.log('toggling artist status')
    try {
      const path = enabled
        ? ApiConstantRoutes.paths.auth.deactivateArtist(userId)
        : ApiConstantRoutes.paths.auth.activateArtist(userId)
      const res = await apiClient.patch(path)
      console.log('res', res)
      if (res.status === "SUCCESS") {
        console.log('Artist status updated successfully')
        setEnabled(!enabled)
        setSuccessModal(true)
      }
    } catch (error) {
      console.log('Failed to update artist status: ', error)
      setErrorModal(true)
    }
  }

  const ToggleSwitch = () => {
    return (
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
        <span className='text-white font-semibold'>Become artist</span>
      </div>
    )
  }

  return (
    <div className='text-white min-h-screen flex flex-col'>
      <Modal
        isOpen={errorModal}
        onClose={() => setErrorModal(false)}
        title='Failed activation'
        content='Something went wrong. Please check your informations and try again.'
        button
      />
      {/**Success Modal */}
      <Modal
        isOpen={successModal}
        onClose={() => {}}
        title='Activation Success!'
        content='You are an artist now. You can now upload your songs.'
        button
      />
      {/* Header */}
      <div className='flex flex-row items-center justify-start bg-gradient-to-b from-[#9e9d9d] to-transparent'>
        <img
          src={user?.data.avatar || 'https://robohash.org/default-avatar.png'}
          alt={user?.data.username}
          className='rounded-full bg-[#242424] size-[180px] shadow-2xl m-5'
        />
        <h1 className='text-7xl font-bold'>
          {user?.data.firstName} {user?.data.lastName}
        </h1>
      </div>

      {/* Bio */}
      <div className='bg-blue-400 p-5'>this is bio</div>

      {/* Main Layout */}
      <div className='flex flex-grow'>
        {/* Sidebar */}
        <nav className='bg-[#242424] w-[240px] p-10'>
          <ul className='flex flex-col gap-y-5'>
            {SidebarItems.map((sidebar_item) => (
              <SideBarItem
                key={sidebar_item.title}
                title={sidebar_item.title}
              />
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className='flex flex-col flex-grow items-center justify-center bg-[#1A1A1A]'>
          <div className='w-fit'>
            <div
              className={`rounded-xl ${disable ? 'bg-[#1A1A1A]' : 'bg-black'} border border-[#e5e7eb] bg-card text-card-foreground shadow p-5 w-full max-w-md min-w-[500px] md:min-w-none`}
            >
              <form className='flex flex-col gap-y-5'>
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
                      onClick={handleEditClick}
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
      </div>
    </div>
  )
}

export default Profile
