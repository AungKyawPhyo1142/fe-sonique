import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

/*
    TODO: change the color & style of the button as needed
*/

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  icon?: string
  loading?: boolean
  primary?: boolean
  secondary?: boolean
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
}
const Spinner = () => {
  return (
    <svg
      className='h-7 w-7 animate-spin text-white'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      ></circle>
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      ></path>
    </svg>
  )
}
const Button: React.FC<Props> = (props) => {
  const {
    className,
    loading,
    primary = true,
    secondary,
    children,
    ...rest // rest of the props, this comes from ButtonHTMLAttributes<HTMLButtonElement>
  } = props

  return (
    <button
      {...rest}
      className={clsx(
        'h-14 rounded-lg cursor-pointer p-3 text-lg transition-opacity duration-200 hover:opacity-80 active:opacity-100',
        primary &&
          !secondary &&
          'bg-[#014343] text-white disabled:bg-[#B3B3B3]',
        className,
      )}
    >
      {!loading ? (
        (children ?? 'Button')
      ) : (
        <div className='flex justify-center'>
          <Spinner />
        </div>
      )}
    </button>
  )
}

export default Button
