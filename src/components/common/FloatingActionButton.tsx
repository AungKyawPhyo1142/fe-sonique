import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { Home, Menu, X } from 'lucide-react'
import { FloatingMenuItem, MenuItemProps } from './FloatingMenuItem'

// interface FloatingActionButtonProps {
//   onClick: () => void
//   icon?: React.ReactNode
// }

// const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
//   onClick,
//   icon = <Plus className='w-10 h-10' />,
// }) => {
//   return (
//     <button
//       onClick={onClick}
//       className='fixed bottom-6 right-6 p-4 cursor-pointer transition-all backdrop-blur-md bg-zinc-800/50 text-white rounded-full border border-zinc-300/10 duration-200 ease-in-out hover:bg-zinc-700/50'
//       aria-label='Add item'
//     >
//       {icon}
//     </button>
//   )
// }

interface FloatingActionButtonProps {
  items: MenuItemProps[]
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  buttonSize?: number
}

function FloatingActionButton({
  items = [],
  position = 'bottom-right',
  buttonSize = 50,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  // Calculate position classes
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  }

  // Calculate the direction of the menu items
  const getItemDirection = () => {
    if (position.includes('top')) return 'bottom'
    return 'top'
  }

  return (
    <div className={`fixed ${positionClasses[position]} m-4 z-50`}>
      <div className='relative'>
        {/* Main circular button */}
        <motion.button
          className='rounded-full flex items-center justify-center cursor-pointer bg-zinc-400/20 backdrop-blur-2xl border border-zinc-200/30 shadow-lg text-white transition-all duration-200 ease-in-out hover:bg-zinc-600/80'
          style={{
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
          }}
          onClick={toggleMenu}
          whileTap={{ scale: 0.95 }}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {isOpen ? (
              <X className='text-white' size={24} />
            ) : (
              <Menu className='text-white' size={24} />
            )}
          </motion.div>
        </motion.button>

        {/* Menu items */}
        <AnimatePresence>
          {isOpen && (
            <div
              className={`absolute ${
                getItemDirection() === 'top'
                  ? 'bottom-full mb-2'
                  : 'top-full mt-2'
              } ${position.includes('right') ? 'right-0' : 'left-0'}`}
            >
              <motion.div
                initial='closed'
                animate='open'
                exit='closed'
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 },
                  },
                }}
                className={`flex flex-col ${getItemDirection() === 'top' ? 'items-end' : 'items-start'} space-y-2`}
              >
                {items.map((item, index) => (
                  <FloatingMenuItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    onClick={item.onClick}
                    direction={getItemDirection()}
                  />
                ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const menuItems = [
  {
    icon: Home,
    label: 'Home',
    onClick: () => alert('home clicked'),
  },
  {
    icon: Home,
    label: 'Something',
    onClick: () => alert('home clicked'),
  },
  {
    icon: Home,
    label: 'Songs',
    onClick: () => alert('home clicked'),
  },
]

const FloatingMenu = () => {
  return (
    <>
      <FloatingActionButton
        items={menuItems}
        position='bottom-right'
        buttonSize={60}
      />
    </>
  )
}

export { FloatingActionButton, FloatingMenu }
