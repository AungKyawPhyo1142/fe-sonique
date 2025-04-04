import clsx from 'clsx'
import { X } from 'lucide-react'
import React from 'react'
import {
  Toaster as HotToaster,
  type ToastOptions,
  toast as useToast,
} from 'react-hot-toast'

export const Toaster = () => {
  return (
    <HotToaster
      position='top-right'
      toastOptions={{
        style: {
          background: '#27272a',
          opacity: 0.1111,
          backdropFilter: 'blur(10px)',
          color: '#fff',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          fontWeight: '300',
        },
      }}
    />
  )
}

interface ToastProps extends ToastOptions {
  title?: string
  description?: string
  action?: React.ReactNode
}

export const toast = {
  custom: (props: ToastProps) => {
    const { title, description, action, ...options } = props
    return useToast.custom(
      (t) => (
        <div
          className={clsx(
            'flex w-full max-w-md items-start gap-3 rounded-lg border backdrop-blur-2xl border-zinc-300/30 ',

            t.visible
              ? 'animate-in fade-in-0 slide-in-from-bottom-5'
              : 'animate-out fade-out-0 slide-out-to-bottom-5',
          )}
        >
          <div className='flex-1 space-y-1'>
            {title && <h3 className='font-medium text-foreground'>{title}</h3>}
            {description && (
              <p className='text-sm text-muted-foreground'>{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
          <button
            onClick={() => useToast.dismiss(t.id)}
            className='flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground'
          >
            <X className='h-4 w-4' />
            <span className='sr-only'>Close</span>
          </button>
        </div>
      ),
      options,
    )
  },
  success: (props: Omit<ToastProps, 'icon'>) => {
    return toast.custom({
      ...props,
      className: 'bg-green-500',
    })
  },
  error: (props: Omit<ToastProps, 'icon'>) => {
    return toast.custom({
      ...props,
      className: 'bg-red-500',
    })
  },
  info: (props: Omit<ToastProps, 'icon'>) => {
    return toast.custom({
      ...props,
      className: 'bg-blue-500',
    })
  },
  warning: (props: Omit<ToastProps, 'icon'>) => {
    return toast.custom({
      ...props,
      className: 'bg-yellow-500',
    })
  },
}

export default Toaster
