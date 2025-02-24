import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { useCustomEvents } from '@/services/formik/hooks'
import { authRequest } from '@/services/network/lib/auth'
import { AppConstantRoutes } from '@/services/routes/path'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router'
import { object, ObjectSchema, string } from 'yup'
import musicPic from '../../../public/images/music.png'

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
      // TODO: create a toast service to show error messages
      console.log('Error')
    })
    if (res && res.status === 'SUCCESS') {
      navigate(AppConstantRoutes.paths.auth.login, { replace: true })
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
      <div className='flex min-h-screen'>
        {/**Photo Section */}
        <div
          className='w-1/2 bg-cover bg-center'
          style={{ backgroundImage: `url(${musicPic})` }}
        ></div>

        {/**Form Section */}
        <div className='w-1/2 text-white flex flex-col justify-center items-center'>
          <form
            onSubmit={formik.handleSubmit}
            className='w-full max-w-[400px] space-y-3  py-2'
          >
            {/**First Name and Last Name */}
            <div className='flex items-center  gap-x-3 '>
              <div className='flex flex-col w-full gap-y-1'>
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
                placeholder='Enter your username'
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
            <div className='flex justify-between mt-6 border-b-2 border-[#e5e7eb] pb-5'>
              <Button
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
                className='w-full font-semibold  h-[50px]'
                primary
                type='submit'
              >
                REGISTER
              </Button>
            </div>

            {/**Already have an account */}
            <div className='text-center'>
              <p className='text-[16px] py-2 mb-2'>Already have an account?</p>
              <Button
                className='w-full h-[50px] text-[16px]'
                outline
                type='submit'
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
