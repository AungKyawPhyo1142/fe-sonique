import clsx from 'clsx'
import { Info } from 'lucide-react'
import Button from './Button'
interface Props {
  className?: string
  title?: string
  content?: string
  isOpen: boolean
  onClose: () => void
  button?: boolean
  icon?: boolean
}

const Modal: React.FC<Props> = ({
  className,
  title,
  content,
  isOpen,
  onClose,
  button,
  icon,
}) => {
  if (!isOpen) return null

  return (
    // Backdrop (Full Screen)
    <div
      className={clsx(
        'fixed inset-0 flex items-center justify-center bg-white/30 z-50',
        {
          visible: isOpen,
          invisible: !isOpen,
        },
      )}
    >
      {/* Modal Box */}
      <div
        className={clsx(
          'bg-black rounded-lg shadow-lg text-white transition-all scale-100 opacity-100 relative',
          'w-[90%] max-w-100 flex flex-col', // Added flex column
          className,
        )}
      >
        {/* Header - Fixed at top */}
        <div className='flex justify-between p-6'>
          <h1 className='text-lg font-semibold'>{title}</h1>
          {/*
          <button
            onClick={onClose}
            className='text-xl font-bold hover:text-gray-300 transition-colors'
          >
            &times;
          </button>
          */}
        </div>

        {/* Content */}
        <div className='flex-1 flex px-6 pt-0'>
          <p className='text-gray-500 text-start mb-7'>{content}</p>
        </div>
        {/* Icon */}
        {icon && (
          <div className='flex items-center justify-center p-6'>
            <Info size={48} />
          </div>
        )}

        {/* Optional Button */}
        {button && (
          <div className='p-5 pt-0 flex justify-end'>
            <Button
              onClick={onClose}
              outline
              className='px-5 text-[16px] rounded-lg'
            >
              close
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
