import clsx from 'clsx'
import Button from './Button'
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
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
interface Props {
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

const Modal: React.FC<Props> = ({
  className,
  title,
  content,
  isOpen,
  setIsOpen,
  onCloseModal,
  type = 'info',
}) => {
  function closeModal() {
    setIsOpen(false)
    if (onCloseModal) {
      onCloseModal()
    }
  }

  return (
    // Backdrop (Full Screen)
    // <div
    //   className={clsx(
    //     'fixed inset-0 flex items-center justify-center bg-white/30 z-50',
    //     {
    //       visible: isOpen,
    //       invisible: !isOpen,
    //     },
    //   )}
    // >
    //   {/* Modal Box */}
    //   <div
    //     className={clsx(
    //       'bg-black rounded-lg shadow-lg text-white transition-all scale-100 opacity-100 relative',
    //       'w-[90%] max-w-100 flex flex-col', // Added flex column
    //       className,
    //     )}
    //   >
    //     {/* Header - Fixed at top */}
    //     <div className='flex justify-between p-6'>
    //       <h1 className='text-lg font-semibold'>{title}</h1>
    //       {/*
    //       <button
    //         onClick={onClose}
    //         className='text-xl font-bold hover:text-gray-300 transition-colors'
    //       >
    //         &times;
    //       </button>
    //       */}
    //     </div>

    //     {/* Content */}
    //     <div className='flex-1 flex px-6 pt-0'>
    //       <p className='text-gray-500 text-start mb-7'>{content}</p>
    //     </div>
    //     {/* Icon */}
    //     {icon && (
    //       <div className='flex items-center justify-center p-6'>
    //         <Info size={48} />
    //       </div>
    //     )}

    //     {/* Optional Button */}
    //     {button && (
    //       <div className='p-5 pt-0 flex justify-end'>
    //         <Button
    //           onClick={onClose}
    //           outline
    //           className='px-5 text-[16px] rounded-lg'
    //         >
    //           close
    //         </Button>
    //       </div>
    //     )}
    //   </div>
    // </div>
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
                  'max-w-lg flex flex-col gap-y-4 items-start justify-between bg-zinc-500/40 p-12 transform transition-all rounded-lg min-w-[500px] min-h-[300px] relative',
                  className,
                )}
              >
                <X
                  className='text-white absolute top-5 right-5 cursor-pointer'
                  onClick={() => setIsOpen(false)}
                />
                <div className='flex flex-col gap-y-5'>
                  <div className='flex items-center'>
                    {type && (
                      <div className='text-white me-5'>
                        {type === 'info' && <Info size={24} />}
                        {type === 'error' && (
                          <AlertTriangle className='text-red-400' size={24} />
                        )}
                        {type === 'success' && (
                          <CheckCircle size={24} className='text-green-400' />
                        )}
                      </div>
                    )}
                    <DialogTitle className='text-white font-bold text-3xl'>
                      {title}
                    </DialogTitle>
                  </div>
                  <p className='text-white text-start ms-11 font-light'>
                    {content}
                  </p>
                </div>

                <div className='place-self-end flex gap-x-5'>
                  <Button
                    outline
                    className='px-5 w-[100px] '
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    primary
                    className='px-5 w-[100px] '
                    onClick={onCloseModal}
                  >
                    Confirm
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
