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
          'shrink-0 cursor-pointer appearance-none rounded-md border-2 border-solid border-neutral-400 checked:border-transparent checked:bg-green-600 checked:ring-2 checked:ring-emerald-600 checked:ring-offset-3 focus:outline-none focus:ring-2 focus:ring-emerald-600',
          square ? 'h-6 w-6' : 'h-6 w-6',
        )}
      />
      <label
        htmlFor={id}
        className='ml-3 cursor-pointer font-anuphan text-base font-medium leading-relaxed text-zinc-500 underline'
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
