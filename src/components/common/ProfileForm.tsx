import { ProfileFormValues } from '@/pages/user/Profile'
import { FormikProps } from 'formik'
import { useNavigate } from 'react-router'
import Button from './Button'
import GlassCard from './GlassCard'
import Input from './Input'
import Seperator from './Seperator'
interface ProfileFormProps {
  formik: FormikProps<ProfileFormValues>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEditButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  disable: boolean
  component: React.ReactNode
}
const ProfileForm: React.FC<ProfileFormProps> = ({
  formik,
  onInputChange,
  handleEditButtonClick,
  disable,
  component,
}) => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col bg-[#202022] p-10 mx-auto min-h-screen'>
      <GlassCard className='flex flex-col items-center justify-center space-y-5 min-w-[600px]'>
        {/* Form */}
        <form
          className='flex flex-col items-start justify-center gap-y-10 font-light w-full'
          onSubmit={formik.handleSubmit}
        >
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-3xl font-bold'>Profile Details</h1>
            <span className='opacity-50 text-sm'>
              Update your desired details here.
            </span>
          </div>
          <fieldset className='flex flex-col gap-y-10 w-full'>
            <div className='flex flex-row gap-x-5'>
              <Input
                type='text'
                disabled={disable}
                id='firstName'
                onChange={onInputChange}
                value={formik.values.firstName}
                error={formik.errors.firstName}
                placeholder='First Name'
              />

              <Input
                type='text'
                disabled={disable}
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
              disabled={disable}
              onChange={onInputChange}
              value={formik.values.bio}
              error={formik.errors.bio}
              placeholder='Enter your bio'
            />

            <Input
              type='email'
              id='email'
              disabled={disable}
              onChange={onInputChange}
              value={formik.values.email}
              error={formik.errors.email}
              placeholder='Email address'
            />

            <Input
              type='text'
              id='username'
              disabled={disable}
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
        <Seperator className='mb-10 mt-5' />
        <div className='flex justify-start w-full'>{component}</div>
      </GlassCard>
    </div>
  )
}
export default ProfileForm
