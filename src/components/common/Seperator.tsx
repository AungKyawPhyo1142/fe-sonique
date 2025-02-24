import clsx from 'clsx'

const Seperator = ({ className }: { className?: string }) => {
  return <div className={clsx('w-full h-[1px] bg-[#e5e7eb]', className)} />
}

export default Seperator
