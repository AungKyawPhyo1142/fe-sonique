import clsx from 'clsx'
import React from 'react'

type GlassCardProps = {
  children: React.ReactNode
  className?: string
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'p-10 bg-[#838383]/10 backdrop-blur-2xl  rounded-lg',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default GlassCard
