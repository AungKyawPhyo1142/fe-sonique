import React, { useEffect, useState } from 'react'

interface AlertProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose?: () => void
}

const Alert: React.FC<AlertProps> = ({
  message,
  type = 'info',
  duration = 2000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [message, duration, onClose])

  if (!visible) return null

  return (
    <div
      className={`fixed top-0 left-0 right-0 rounded w-full flex justify-center p-3 text-white text-lg shadow-lg transition-opacity duration-300 ${
        type === 'success'
          ? 'bg-green-500'
          : type === 'error'
            ? 'bg-red-500'
            : 'bg-blue-500'
      }`}
    >
      {message}
    </div>
  )
}

export default Alert
