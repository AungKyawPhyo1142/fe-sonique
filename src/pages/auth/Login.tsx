import Button from '@/components/common/Button'
import DisplaySong from '@/components/common/DisplaySong'
import Input from '@/components/common/Input'
import Seperator from '@/components/common/Seperator'
import { useCustomEvents } from '@/services/formik/hooks'
import { authRequest } from '@/services/network/lib/auth'
import { AppConstantRoutes } from '@/services/routes/path'
import { getDefaultRoute } from '@/services/routes/router'
import { initAfterLogin } from '@/services/zustand/authStore'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router'
import { boolean, object, ObjectSchema, string } from 'yup'

export interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

export const Login = () => {
  const navigate = useNavigate()
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    remember: true,
  }

  const validationSchema: ObjectSchema<LoginFormValues> = object().shape({
    email: string().email().required('Email is required'),
    password: string().required('Password is required'),
    remember: boolean().required('Remember is required'),
  })

  const onSubmit = async (values: LoginFormValues) => {
    const res = await authRequest.login(values).catch((error) => {
      if (error.status === 401) {
        console.log('Invalid credentials')
      } else {
        console.log('Failed to login: ', error)
      }
    })

    if (res && res.status === 'SUCCESS') {
      console.log('Login successful: ', res.data)
      initAfterLogin(res, true)
      const destination = getDefaultRoute()
      navigate(destination, { replace: true })
      console.log('Login successful')
    } else {
      formik.setErrors({
        email: 'Invalid credentials',
        password: 'Invalid credentials',
      })
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
  })

  const { onInputChange } = useCustomEvents<LoginFormValues>(formik)

  return (
    <div className='flex min-h-screen grid-bg'>
      {/**Login Form */}
      <div className='w-1/2 text-white flex flex-col justify-center items-center'>
        {/*header
        <div className='border-b-1 border-[#e5e7eb] items-center flex justify-center p-5'>
          <h1 className='font-bold text-3xl text-center'> Sonique</h1>
        </div>
        */}
        {/*form*/}
        <form
          onSubmit={formik.handleSubmit}
          className='w-full max-w-[480px] space-y-[1.7rem] py-7 px-9 rounded-[10px] text-[#FFFFFF]'
          style={{
            background: 'rgba(131, 131, 131, 0.31)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <div className='flex flex-col w-full gap-x-5'>
            <label htmlFor='email' className='mb-3'>
              Email
            </label>
            <Input
              type='email'
              id='email'
              onChange={onInputChange}
              value={formik.values.email}
              error={formik.errors.email}
              placeholder='Email address or username'
            />
          </div>
          <div className='flex flex-col  w-full  gap-x-5 '>
            <label htmlFor='password' className='mb-3'>
              Password
            </label>
            <Input
              type='password'
              id='password'
              onChange={onInputChange}
              value={formik.values.password}
              error={formik.errors.password}
              placeholder='Password'
            />
          </div>
          <div>
            <a
              href=''
              className='underline hover:text-[#e5e7eb] transition-all ease-linear duration-100'
            >
              Forgot your password?
            </a>
          </div>
          {/*remember me* and button*/}
          <div className='flex flex-row justify-between items-center'>
            <label className='flex items-center gap-x-2'>
              <input
                type='checkbox'
                id='remember'
                onChange={onInputChange}
                checked={formik.values.remember}
                className='accent-white'
              />
              <span>Remember me</span>
            </label>
            <Button
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              className='w-fit px-10 h-[50px]'
              primary
              type='submit'
            >
              Login
            </Button>
          </div>

          <Seperator className='my-4' />
          {/*point to register*/}

          <p className='text-[18px] text-center mb-4'>Don't have an account?</p>
          <Button
            className='w-full h-[50px] text-[16px]'
            outline
            onClick={() => navigate(AppConstantRoutes.paths.auth.register)}
            type='button'
          >
            SIGN UP FOR SONIQUE
          </Button>
        </form>
      </div>

      {/**Display Song */}
      <div className='w-1/2 bg-cover bg-center align-middle flex'>
        <DisplaySong
          login
          songSrc='/audio/MoonlitFloor.mp3'
          imgSrc='/images/Moonlit_Floor.jpg'
        />
      </div>
    </div>
  )
}

export default Login
