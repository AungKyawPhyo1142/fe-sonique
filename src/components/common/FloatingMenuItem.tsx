import { motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'

export interface MenuItemProps {
  icon: LucideIcon
  label: string
  onClick: () => void
  direction?: 'top' | 'bottom'
  color?: string
}

export function FloatingMenuItem({
  icon: Icon,
  label,
  onClick,
  direction = 'top',
}: MenuItemProps) {
  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 300, velocity: -100, damping: 15 },
      },
    },
    closed: {
      y: direction === 'top' ? -20 : 20,
      opacity: 0,
      transition: {
        y: { stiffness: 300, damping: 15 },
      },
    },
  }

  return (
    <motion.button
      variants={variants}
      className='flex items-center cursor-pointer px-4 py-2 rounded-full backdrop-blur-2xl border border-zinc-200/30 text-white bg-zinc-400/20 hover:bg-zinc-500/60 transition duration-200 ease-in-out'
      onClick={onClick}
    >
      <Icon className='mr-2' size={18} />
      <span>{label}</span>
    </motion.button>
  )
}
