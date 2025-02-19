import { Fragment } from 'react'
import {
  Listbox,
  ListboxOption,
  ListboxOptions,
  Transition,
  ListboxButton,
} from '@headlessui/react'
import { ChevronRight } from 'lucide-react'
import { Props as InputProps } from './Input'
import clsx from 'clsx'

export interface ListBox {
  value: string
  label: string
}

interface Props extends InputProps {
  listOption: ListBox[]
  onSelected: (value: string | number | boolean) => void
  value: string
}

const Select: React.FC<Props> = (props) => {
  const {
    error,
    className,
    listOption,
    onSelected,
    value,
    placeholder,
    disabled,
  } = props

  return (
    <Listbox value={value} onChange={onSelected}>
      <div className='relative mt-1 w-full'>
        <ListboxButton
          as='div'
          className={clsx('relative w-full cursor-pointer bg-white text-left', {
            'pointer-events-none cursor-not-allowed': disabled,
          })}
        >
          <div
            className={clsx(
              'block h-[49px] w-full rounded-lg border border-gray-300 !bg-transparent px-1 py-3 text-base text-gray-500 outline-none transition-colors duration-200 placeholder:text-dark-600 focus:border-primary-600 focus:ring-0',
              {
                'text-[#303332ff] pl-3': placeholder,
              },
              error ? 'border-red-500' : 'border-dark-600',
              disabled
                ? 'pointer-events-none cursor-not-allowed !text-dark-400'
                : 'text-dark-800',
              className,
            )}
          >
            {listOption.find((item) => item.value === value)?.label ||
              placeholder}
          </div>
          {/* <ArrowRightIcon className='absolute right-[16px] top-[20px] rotate-90 fill-dark-800' /> */}
          {!disabled && (
            <ChevronRight
              className='absolute right-[16px] top-[15px] rotate-90'
              color='#d1d5dc'
            />
          )}
          {error && (
            <span className='block pl-2 pt-1 text-sm text-red-500'>
              {error}
            </span>
          )}
        </ListboxButton>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <ListboxOptions className='absolute z-10 mt-2 max-h-60 w-full !overflow-auto rounded-md bg-white px-2 py-3 text-base shadow-lg ring-1 ring-gray-300 ring-opacity-5 focus:outline-none'>
            {listOption.map((item, itemIdx) => (
              <ListboxOption
                key={itemIdx}
                className={({ focus, selected }) =>
                  `relative cursor-pointer select-none hover:bg-gray-50 transition-colors duration-150 ease-in-out p-4 border-b border-gray-300 text-dark-400 ${
                    (focus || selected) && 'bg-primary-100'
                  } ${
                    itemIdx === listOption.length - 1 && 'border-b-0' // remove border bottom on last item
                  }`
                }
                value={item.value}
              >
                <span className='block truncate'>{item.label}</span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  )
}

export default Select
