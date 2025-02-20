import { useNavigate } from 'react-router'
import Input from '@/components/common/Input'
import { boolean, object, ObjectSchema, string } from 'yup'
import { useFormik } from 'formik'
import { authRequest } from '@/services/network/lib/auth'
import { initAfterLogin } from '@/services/zustand/authStore'
import { getDefaultRoute } from '@/services/routes/router'
import { useCustomEvents } from '@/services/formik/hooks'
import Button from '@/components/common/Button'

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
  })

  const { onInputChange } = useCustomEvents<LoginFormValues>(formik)

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <form
          onSubmit={formik.handleSubmit}
          className='min-w-[500px]  flex flex-col gap-y-5'
        >
          <h1 className='text-2xl mb-5 font-bold'>Register here.</h1>

          <div className='flex flex-col  w-full  gap-x-5 '>
            <label htmlFor='email'>Email</label>
            <Input
              type='email'
              id='email'
              onChange={onInputChange}
              value={formik.values.email}
              error={formik.errors.email}
            />
          </div>
          <div className='flex flex-col  w-full  gap-x-5 '>
            <label htmlFor='password'>Password</label>
            <Input
              type='password'
              id='password'
              onChange={onInputChange}
              value={formik.values.password}
              error={formik.errors.password}
            />
          </div>
          <Button
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting}
            className='w-full'
            primary
            type='submit'
          >
            Login
          </Button>
        </form>
      </div>
    </>
  )
}

export default Login
