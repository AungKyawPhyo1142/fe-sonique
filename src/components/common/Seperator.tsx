import clsx from 'clsx'

const Seperator = ({ className }: { className?: string }) => {
  return <div className={clsx('w-full h-[1px] bg-zinc-500/50', className)} />
}

export default Seperator
