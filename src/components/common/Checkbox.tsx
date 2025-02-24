import React from 'react'
import clsx from 'clsx'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  id?: string
  label?: string
  square?: boolean
}

const Checkbox: React.FC<Props> = (props) => {
  const { id, label, square, ...rest } = props

  return (
    <div className='flex items-center pl-1'>
      <input
        {...rest}
        id={id}
        type='checkbox'
        className={clsx(
          'shrink-0 cursor-pointer appearance-auto border-2 border-solid border-white checked:border-transparent checked:bg-blue-600 checked:ring-2 checked:ring-blue-600 checked:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-600',
          square ? 'h-5 w-5' : 'h-5 w-5',
        )}
      />
      <label
        htmlFor={id}
        className='ml-3 cursor-pointer font-anuphan text-sm font-medium leading-relaxed text-zinc-300'
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
