import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { useCustomEvents } from '@/services/formik/hooks'
import { authRequest } from '@/services/network/lib/auth'
import { AppConstantRoutes } from '@/services/routes/path'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router'
import { object, ObjectSchema, string } from 'yup'
//import musicPic from '/images/music.png'
import Modal from '@/components/common/Modal'
import { useState } from 'react'
import DisplaySong from '@/components/common/DisplaySong'
import Seperator from '@/components/common/Seperator'

// note that the names are identical to the id of the input fields
export interface RegisterFormValues {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  confirmPassword: string
}

const Register = () => {
  const navigate = useNavigate()
  const [errorModal, setErrorModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const initialValues: RegisterFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema: ObjectSchema<RegisterFormValues> = object().shape({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    email: string().email().required('Email is required'),
    username: string().required('Username is required'),
    password: string()
      .required('Password is required')
      .test(
        'check password length',
        'Password must be between 6 and 20 characters',
        () =>
          6 <= formik.values.password.length &&
          formik.values.password.length <= 20,
      )
      .matches(
        /(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    confirmPassword: string()
      .required('Confirm Password is required')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value
      }),
  })

  const onSubmit = async (values: RegisterFormValues) => {
    const res = await authRequest.register(values).catch(() => {
      //Open Error Modal
      setErrorModal(true)
    })
    if (res && res.status === 'SUCCESS') {
      //Open Success Modal
      setSuccessModal(true)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  })

  const { onInputChange } = useCustomEvents<RegisterFormValues>(formik)

  return (
    <>
      {/**Error Modal */}
      <Modal
        isOpen={errorModal}
        onClose={() => setErrorModal(false)}
        title='Registration Fail!'
        content='Something went wrong. Please check your informations and try again.'
        button
      />
      {/**Success Modal */}
      <Modal
        isOpen={successModal}
        onClose={() =>
          navigate(AppConstantRoutes.paths.auth.login, { replace: true })
        }
        title='Registeration Success!'
        content='Your account have been created successfully.'
        button
      />
      <div className='flex min-h-screen grid-bg'>
        {/**Photo Section */}
        {/**
        <div
          className='w-1/2 bg-cover bg-center'
          style={{ backgroundImage: `url(${musicPic})` }}
        ></div>
         */}

        {/**Display song */}
        <div className='w-1/2 bg-cover bg-center align-middle flex'>
          <DisplaySong
            register
            songSrc='/audio/APT.mp3'
            imgSrc='/images/APT.jpg'
          />
        </div>

        {/**Form Section */}
        <div className='w-1/2 text-white flex flex-col justify-center items-center'>
          <form
            onSubmit={formik.handleSubmit}
            className='w-full max-w-[480px] space-y-[1rem] py-7 px-9 rounded-[10px] text-[#FFFFFF]'
            style={{
              background: 'rgba(131, 131, 131, 0.31)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            {/**First Name and Last Name */}
            <div className='flex items-center gap-x-3 '>
              <div className='flex flex-col w-full gap-y-1 '>
                <label htmlFor='firstName'>First Name</label>
                <Input
                  type='text'
                  id='firstName'
                  onChange={onInputChange}
                  value={formik.values.firstName}
                  error={formik.errors.firstName}
                  placeholder='First Name'
                />
              </div>
              <div className='flex flex-col gap-y-1 w-full'>
                <label htmlFor='lastname'>Last Name</label>
                <Input
                  type='text'
                  id='lastName'
                  placeholder='Last Name'
                  onChange={onInputChange}
                  value={formik.values.lastName}
                  error={formik.errors.lastName}
                />
              </div>
            </div>

            {/**Email */}
            <div className='flex flex-col  w-full  gap-x-5 '>
              <label htmlFor='email'>Email</label>
              <Input
                type='email'
                id='email'
                placeholder='Enter your email'
                onChange={onInputChange}
                value={formik.values.email}
                error={formik.errors.email}
              />
            </div>

            {/**Username */}
            <div className='flex flex-col  w-full  gap-x-5 '>
              <label htmlFor='username'>Username</label>
              <Input
                type='text'
                id='username'
                placeholder='Enter username'
                onChange={onInputChange}
                value={formik.values.username}
                error={formik.errors.username}
              />
            </div>

            {/**Password */}
            <div className='flex flex-col  w-full  gap-x-5 '>
              <label htmlFor='password'>Password</label>
              <Input
                type='password'
                id='password'
                placeholder='Enter password'
                onChange={onInputChange}
                value={formik.values.password}
                error={formik.errors.password}
              />
            </div>
            <div className='flex flex-col  w-full  gap-x-5 '>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <Input
                type='password'
                id='confirmPassword'
                placeholder='Confirm Password'
                onChange={onInputChange}
                value={formik.values.confirmPassword}
                error={formik.errors.confirmPassword}
              />
            </div>

            {/**Register Button */}
            <div className='flex justify-between my-6'>
              <Button
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
                className='w-full h-[50px]'
                primary
                type='submit'
              >
                REGISTER
              </Button>
            </div>

            {/**Already have an account */}
            <div className='text-center'>
              <Seperator />
              <p className='text-[16px] py-2 mb-2 pt-5  '>
                Already have an account?
              </p>
              <Button
                className='w-full h-[50px]'
                outline
                type='button'
                onClick={() => navigate(AppConstantRoutes.paths.auth.login)}
              >
                SIGN IN FOR SPOTIFY
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
