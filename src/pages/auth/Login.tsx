import {
  decrement,
  increment,
  useCountStore,
} from '@/services/zustand/countStore'
import { Link } from 'react-router'
import { AppConstantRoutes } from '@/services/routes/path'

const Login = () => {
  const counter = useCountStore((state) => state.count)

  return (
    <>
      <div className='h-screen fade-in flex items-center justify-center flex-col gap-y-5'>
        <h1 className='text-3xl text-red-400 font-light'>
          [DEV] LOGIN & COUNTER: {counter}{' '}
        </h1>
        <div className='flex items-center gap-x-5'>
          <button
            type='button'
            className='border-1 py-2 w-[100px] rounded cursor-pointer'
            onClick={increment}
          >
            Increment
          </button>
          <button
            type='button'
            className='border-1 py-2 w-[100px] rounded cursor-pointer'
            onClick={decrement}
          >
            Decrement
          </button>
        </div>
        <Link
          to={AppConstantRoutes.paths.example}
          className=' underline text-lg font-light text-blue-400'
        >
          Go to example components usage page
        </Link>
      </div>
    </>
  )
}

export default Login
