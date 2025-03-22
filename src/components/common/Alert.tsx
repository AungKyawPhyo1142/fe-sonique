import React, { useEffect, useState } from 'react'

interface AlertProps {
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

const Alert: React.FC<AlertProps> = ({
  message,
  type = 'info',
  duration = 2000,
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    //console.log('Alert rendered:', message, type)
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white ${
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
