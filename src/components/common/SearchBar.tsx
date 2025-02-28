import { useState } from 'react'
import Input from './Input'
import Button from './Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { AppConstantRoutes } from '@/services/routes/path'

const SearchBar = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='flex items-center justify-between bg-[#121212] py-2 sticky top-0 z-50 h-[64px] px-8'>
      <div className='flex items-center gap-3 '>
        <Button className='bg-[#000000] p-2 rounded-s-full rounded-e-full'>
          <ChevronLeft size={18} className='text-[#FFFFFF]' />
        </Button>
        <Button className='bg-[#000000] p-2 rounded-s-full rounded-e-full'>
          <ChevronRight size={18} className='text-[#FFFFFF]' />
        </Button>
        <div className='relative flex items-center ms-3 h-[40px] w-[364px]'>
          <Input
            type='text'
            placeholder='What do you want to listen to?'
            secondary
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=' rounded-s-full rounded-e-full px-13 py-2 placeholder:text-[14px]'
            showSearchIcon={true}
          />
        </div>
      </div>
      <div className='flex items-center gap-4 '>
        <Button
          onClick={() => navigate(AppConstantRoutes.paths.auth.register)}
          outline
          className='px-4 py-2 rounded-s-full rounded-e-full h-[48px] w-[110px] text-[15px]'
        >
          Sign up
        </Button>
        <Button
          onClick={() => navigate(AppConstantRoutes.paths.auth.login)}
          primary
          className='px-4 py-2 rounded-s-full rounded-e-full h-[48px] w-[110px] text-[15px]'
        >
          Log in
        </Button>
      </div>
    </div>
  )
}

export default SearchBar
