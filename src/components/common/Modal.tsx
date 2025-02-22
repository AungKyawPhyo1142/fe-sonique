import clsx from 'clsx';
import { Info } from 'lucide-react';
import Button from './Button';
interface Props {
    className?: string;
    title?: string;
    content?: string;
    isOpen: boolean;
    onClose: () => void;
    button?: boolean;
    icon?: boolean;
}

const Modal: React.FC<Props> = ({
    className,
    title,
    content,
    isOpen,
    onClose,
    button,
    icon
}) => {
    if (!isOpen) return null;

    return (
        // Backdrop (Full Screen)
        <div
            className={clsx(
                'fixed inset-0 flex items-center justify-center bg-white/50 z-50',
                {
                    'visible': isOpen,
                    'invisible': !isOpen,
                },
            )}
        >
            {/* Modal Box */}
            <div
                className={clsx(
                    'bg-black rounded-lg shadow-lg text-white transition-all scale-100 opacity-100',
                    'w-[90%] max-w-md flex flex-col', // Added flex column
                    className, 
                )}
            >
                {/* Header - Fixed at top */}
                <div className='flex justify-between border-b border-white/20 p-6'>
                    <h1 className='text-lg font-semibold'>{title}</h1>
                    <button 
                        onClick={onClose} 
                        className='text-xl font-bold hover:text-gray-300 transition-colors'
                    >
                        &times;
                    </button>
                </div>

                {/* Icon */}
                {icon && (
                    <div className='flex items-center justify-center p-6'>
                    <Info size={48} />
                </div>
                )}

                {/* Content */}
                <div className='flex-1 flex items-center justify-center p-6'>
                    <p className='text-white text-center'>{content}</p>
                </div>

                {/* Optional Button */}
                {button && (
                    <div className='p-6 pt-0'>
                        <Button onClick={onClose} className='w-full'>
                            Close
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Modal;