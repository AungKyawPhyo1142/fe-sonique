import Button from './Button'
import { Info } from 'lucide-react'
type Props = {
  reload: () => void
}

// NOTE: this will always show at the center of the page

const ErrorContent = ({ reload }: Props) => {
  return (
    <div className='flex h-[calc(100vh-72px)] justify-center'>
      <div className='max-w-[580px] px-[20px] pt-[60px] text-center text-gray-400'>
        <Info className='mx-auto mb-4' size={80} color='#d1d5dc' />
        <p>Oops! Something went wrong! Please try reloading the page again.</p>
        <Button onClick={reload} className='mt-[20px]'>
          Reload
        </Button>
      </div>
    </div>
  )
}

export default ErrorContent
