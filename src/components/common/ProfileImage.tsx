import { Camera } from 'lucide-react'
import { useState } from 'react'

interface Props {
  image: string
  onClick?: (event: React.PointerEvent<HTMLDivElement>) => void 
  component?: React.ReactNode
}

const ProfileImage: React.FC<Props> = ({ image, onClick, component }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  const handlePointerEvent = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    onClick?.(e)
  }

  return (
    <div
      className='relative w-[180px] h-[180px] m-5 rounded-full overflow-hidden cursor-pointer'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handlePointerEvent}
    >
      <img
        src={image || '/images/default-profile.png'}
        alt='Profile'
        className='w-full h-full object-cover'
      />
      {isHovered && (
        <div className='absolute inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center'>
          <label className='cursor-pointer'>
            {component}

            <Camera className='text-gray-300 w-6 h-6' />
          </label>
        </div>
      )}
    </div>
  )
}

export default ProfileImage
