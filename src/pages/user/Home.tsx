import Button from '@/components/common/Button'
import { AppConstantRoutes } from '@/services/routes/path'
import { cleanupAfterLogout } from '@/services/zustand/authStore'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    cleanupAfterLogout()
    queryClient.clear()
    navigate(AppConstantRoutes.paths.auth.login)
  }

  return (
    <div className='flex items-center flex-col justify-center h-screen bg-red-200'>
      <h1 className='text-3xl font-bold'>Home</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Home
