import { Fragment, JSX } from 'react'
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
import Button from './Button'
import { Plus } from 'lucide-react'
import BaseModal from './BaseModal'

export interface ListBox {
  value: string
  label: string
}

interface Props extends InputProps {
  listOption: ListBox[]
  onSelected: (value: string | number | boolean) => void
  value: string
  ModalContent: JSX.Element
  ModalTitle: string
  ModalSubHeading: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onModalClose: () => void
  // onAddOption?: (newOption: ListBox) => void
}

const SelectWithModal: React.FC<Props> = (props) => {
  const {
    error,
    className,
    listOption,
    onSelected,
    value,
    placeholder,
    disabled,
    ModalContent,
    ModalSubHeading,
    ModalTitle,
    isOpen,
    setIsOpen,
    onModalClose,
    // onAddOption,
  } = props

  // const [newOption, setNewOption] = useState('')

  // const handleCreateNew = () => {
  //   setIsModalOpen(true)
  // }
  // const handleAdd = () => {
  //   if (newOption.trim() !== '' && onAddOption) {
  //     onAddOption({ value: newOption, label: newOption })
  //     setIsModalOpen(false)
  //   }
  // }

  return (
    <Listbox value={value} onChange={onSelected}>
      <div className='relative mt-1 w-full'>
        <ListboxButton
          as='div'
          className={clsx('relative w-full cursor-pointer text-left', {
            'pointer-events-none cursor-not-allowed': disabled,
          })}
        >
          <div
            className={clsx(
              'block h-[49px] w-full rounded-lg border border-zinc-200/30 !bg-transparent px-1 py-3 text-base text-zinc-500 outline-none transition-colors duration-200 placeholder:text-dark-600 focus:border-zinc-300/80 focus:ring-2',
              {
                'text-[#303332ff] pl-3': placeholder,
                '!text-white': value && placeholder,
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
              className='absolute right-[16px]  top-[15px] rotate-90'
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
          <ListboxOptions className='absolute z-10  mt-2 max-h-60 w-full !overflow-auto rounded-md bg-zinc-700/20 backdrop-blur-2xl text-base shadow-lg ring-1 ring-zinc-200/30 ring-opacity-5 focus:outline-none'>
            {listOption.map((item, itemIdx) => (
              <ListboxOption
                key={itemIdx}
                className={({ focus, selected }) =>
                  `relative cursor-pointer select-none transition-colors duration-150 ease-in-out p-4 border-b border-zinc-200/30 text-zinc-400 hover:text-white ${
                    (focus || selected) && 'bg-primary-100'
                  } ${
                    itemIdx === listOption.length - 1 && 'border-b-0' // remove border bottom on last item
                  }`
                }
                //Create New option
                value={item.value}
                // value={item.isCreateNew ? '' : item.value}
                // onClick={item.isCreateNew ? handleCreateNew : undefined}
              >
                <span className='block truncate'>{item.label}</span>
              </ListboxOption>
            ))}
            <Button
              type='button'
              onClick={() => setIsOpen(true)}
              className='border-t border-zinc-200/30 !p-4 w-full rounded-none !text-start flex gap-x-2 items-center hover:text-white'
            >
              <Plus size={18} /> Create a new genre
            </Button>
          </ListboxOptions>
        </Transition>
      </div>
      <BaseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={ModalTitle}
        content={ModalSubHeading}
        className='justify-start gap-y-5'
        onCloseModal={onModalClose}
      >
        {ModalContent}
      </BaseModal>
      {/* <BaseModal
        isOpen={isModalOpen}
        setIsOpen={handleCreateNew}
        title='Create your list'
        className='flex flex-col gap-y-5'
      >
        <Input
          type='text'
          name='title'
          placeholder='album'
          className='font-light'
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
        />
        <div className='fex w-full gap-x-5 justify-between'>
          <Button
            primary
            onClick={() => setIsModalOpen(false)}
            className='px-[30px] py-2'
            type='submit'
          >
            Cancel
          </Button>
          <Button
            secondary
            onClick={handleAdd}
            className='px-[30px] py-2'
            type='submit'
          >
            Upload
          </Button>
        </div>
      </BaseModal> */}
    </Listbox>
  )
}

export default SelectWithModal
