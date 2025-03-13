import clsx from 'clsx'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment } from 'react/jsx-runtime'
import React from 'react'
import { X } from 'lucide-react'

interface Props {
  children?: React.ReactNode
  className?: string
  title?: string
  content?: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onCloseModal?: () => void
  button?: boolean
  type?: 'info' | 'error' | 'success'
  icon?: React.ReactNode
}

const BaseModal: React.FC<Props> = ({
  className,
  children,
  title,
  content,
  isOpen,
  setIsOpen,
  onCloseModal,
}) => {
  function closeModal() {
    setIsOpen(false)
    if (onCloseModal) {
      onCloseModal()
    }
  }

  return (
    <>
      <Transition show={isOpen} appear as={Fragment}>
        <Dialog
          onClose={closeModal}
          open={isOpen}
          as='div'
          className='relative z-50 transition duration-300 ease-in data-[closed]:opacity-0'
        >
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-75'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <DialogBackdrop
              className='fixed inset-0 bg-black/40 backdrop-blur-lg '
              onClick={() => setIsOpen(false)}
            />
          </TransitionChild>
          {/* Full-screen container to center the panel */}
          <div className='fixed inset-0 flex w-screen items-center justify-center p-4 '>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-75'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-75'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              {/* The actual dialog panel  */}
              <DialogPanel
                className={clsx(
                  'flex flex-col gap-y-4 items-start justify-between bg-zinc-500/40 p-12 transform transition-all rounded-lg min-w-[500px] min-h-[300px] relative',
                  className,
                )}
              >
                <X
                  className='text-white absolute top-5 right-5 cursor-pointer'
                  onClick={() => setIsOpen(false)}
                />
                <div className='flex flex-col gap-y-5'>
                  <div className='flex flex-col gap-y-2'>
                    <DialogTitle className='text-2xl font-bold text-white'>
                      {title}
                    </DialogTitle>
                    <p className='text-sm text-gray-300'>{content}</p>
                  </div>
                </div>

                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default BaseModal
