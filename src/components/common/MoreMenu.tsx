import { useState, useRef, useEffect } from 'react'
import { MoreVertical } from 'lucide-react'
import Button from './Button'

const MoreMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={menuRef} className='relative inline-block'>
      <Button
        className={`w-fit px-1 text-white hover:bg-zinc-500/50 ${isOpen ? 'bg-zinc-500/50 ' : ''}`}
        onClick={toggleMenu}
        type='button'
      >
        <MoreVertical size={30} />
      </Button>

      {isOpen && (
        <div className='mt-2 w-60 bg-zinc-500/50  rounded-md shadow-lg absolute z-10 right-0.5'>
          <button
            onClick={() => {
              setIsOpen(false)
              alert('Add more songs to playlist')
            }}
            className='w-full text-left px-4 py-2 text-sm text-zinc-200/50 hover:cursor-pointer hover:text-zinc-300'
          >
            Add more songs to playlist
          </button>
          <button
            onClick={() => {
              setIsOpen(false)
              alert('Delete playlist')
            }}
            className='w-full text-left px-4 py-2 text-sm text-red-400/80  hover:text-red-500 hover:cursor-pointer '
          >
            Delete playlist
          </button>
        </div>
      )}
    </div>
  )
}

export default MoreMenu
