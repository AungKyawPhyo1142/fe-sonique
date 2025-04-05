interface Props {
  className?: string
  count?: number
  children: React.ReactNode
}

const SkeletonList: React.FC<Props> = ({ className, count = 10, children }) => {
  return (
    <div className={`w-full  ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{children}</div>
      ))}
    </div>
  )
}

export default SkeletonList
