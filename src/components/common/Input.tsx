import clsx from 'clsx'
import React, { useState } from 'react'
import { Eye, EyeOff, Search } from 'lucide-react'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  classsName?: string
  error?: string
  hint?: string
  primary?: boolean
  secondary?: boolean
  showSearchIcon?: boolean // Add the new search icon
  inputRef?: React.Ref<HTMLInputElement>
}

type InputState = {
  inputType: React.HTMLInputTypeAttribute
  showPassword: boolean
}

const Input: React.FC<Props> = (props) => {
  const {
    className,
    error,
    hint,
    primary,
    secondary,
    showSearchIcon, // Destructure the new icon
    defaultValue,
    type,
    readOnly,
    inputRef,
    ...rest
  } = props

  const [inputState, setInputState] = useState<InputState>({
    inputType: type || 'text',
    showPassword: false,
  })

  // toggle password visibility
  const onEyeIconClick = () => {
    setInputState((prev) => ({
      inputType: prev.inputType === 'password' ? 'text' : 'password',
      showPassword: !prev.showPassword,
    }))
  }

  const handlePasswordDisplayIcon = () => {
    return inputState.showPassword ? (
      <Eye
        onClick={onEyeIconClick}
        className=' absolute  right-4 cursor-pointer'
        size={20}
        color={'white'}
      />
    ) : (
      <EyeOff
        onClick={onEyeIconClick}
        className=' absolute  right-4 cursor-pointer'
        size={20}
        color={'white'}
      />
    )
  }
  const handleSearchIcon = () => {
    return showSearchIcon ? (
      <Search
        className='absolute left-4 cursor-pointer'
        size={20}
        color={'black'}
      />
    ) : null
  }

  return (
    <div className='w-full'>
      <div className='relative flex items-center'>
        {handleSearchIcon()}
        <input
          {...rest}
          type={inputState.inputType}
          className={clsx(
            'border-1 border-gray-500 w-full rounded-lg px-3 py-2 text-base transition-colors duration-200 placeholder:text-gray-500 focus:ring-[1.5px] focus:ring-white',
            primary && 'text-white outline-none',
            secondary && 'bg-[#FFFFFF] text-[#121212]',
            type === 'password' && 'pr-8',
            type === 'file' && 'opacity-0',
            error ? 'border-red-500' : 'border-gray-500',
            className,
          )}
          defaultValue={defaultValue}
          readOnly={readOnly}
          ref={inputRef}
        />
        {type === 'password' && handlePasswordDisplayIcon()}
      </div>
      {hint && !error && (
        <span className='block pl-2 pt-1 text-sm text-dark-400'>{hint}</span>
      )}
      {error && (
        <span className='block pl-2 pt-1 text-sm text-red-500'>{error}</span>
      )}
    </div>
  )
}

export default Input
