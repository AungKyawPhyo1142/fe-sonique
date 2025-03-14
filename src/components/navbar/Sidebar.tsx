import { apiClient } from '@/services/network/apiClient'
import { ApiConstantRoutes } from '@/services/network/path'
import { AppConstantRoutes } from '@/services/routes/path'
import { cleanupAfterLogout, useAuthStore } from '@/services/zustand/authStore'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { Heart, House, Library, Plus, PowerOff, Search } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import Button from '../common/Button'
import Player from '../common/Player'
import Seperator from '../common/Seperator'

interface SidebarItemProps {
  icon?: React.ReactNode
  title?: string
  onClick?: () => void
  className?: string
  active?: boolean
  activeColor?: string
  hoverColor?: string
}

interface UserTileProps {
  name?: string
  userName?: string
  avatar?: string
  className?: string
}

export const UserTile: React.FC<UserTileProps> = ({
  name,
  userName,
  avatar,
  className,
}) => {
  const navigate = useNavigate()
  const handleProfileClick = () => {
    navigate(AppConstantRoutes.paths.profile)
  }
  return (
    <div className={clsx('flex items-center space-x-2', className)}>
      <img
        src={avatar}
        alt={name}
        className='rounded-full size-15 hover:underline cursor-pointer object-cover'
        onClick={handleProfileClick}
      />
      <div>
        <h1
          className='hover:underline cursor-pointer'
          onClick={handleProfileClick}
        >
          {name}
        </h1>
        <p className='text-xs text-gray-500'>{userName}</p>
      </div>
    </div>
  )
}

export const SideBarItem: React.FC<SidebarItemProps> = ({
  icon,
  title,
  onClick,
  className,
  active,
  activeColor,
  hoverColor,
}) => {
  return (
    <li
      onClick={onClick}
      className={clsx(
        `w-full ${hoverColor || 'hover:bg-zinc-400/20'} flex items-center space-x-2 cursor-pointer transition-all duration-150 ease-linear rounded-lg px-4 py-2`, // Adjusted padding
        active && `${activeColor || 'bg-zinc-400/20'}`,
        className,
      )}
    >
      {icon}
      <span>{title}</span> {/* Ensure text expands properly */}
    </li>
  )
}

// TODO: add more sidebar items later if needed
// TODO: change the item path for Search, Library later
const SidebarItems = [
  {
    icon: <House />,
    title: 'Home',
    path: AppConstantRoutes.paths.home,
  },
  {
    icon: <Search />,
    title: 'Search',
    path: AppConstantRoutes.paths.searchPage,
  },
  {
    icon: <Library />,
    title: 'Your Library',
    path: '/',
  },
]

const Sidebar: React.FC = () => {
  const userId = useAuthStore((state) => state.auth.userId)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { pathname } = useLocation()
  const { data: user } = useQuery({
    queryKey: ['getUser', userId], // Include userId to refetch when it changes
    retry: 1,
    queryFn: async () => {
      const response = await apiClient.get(
        ApiConstantRoutes.paths.auth.getUser(userId),
      )
      return response // Ensure only `data` is returned
    },
    enabled: !!userId, // Only run query if userId is defined
  })

  const handleLogout = () => {
    cleanupAfterLogout()
    queryClient.clear()
    navigate(AppConstantRoutes.paths.auth.login)
  }

  return (
    <div className='h-screen bg-black text-white w-[240px] z-10 fixed'>
      <div className='flex items-center justify-start text-3xl font-bold p-5'>
        <h1>Sonique</h1>
      </div>
      <nav className=''>
        <ul className='space-y-5 mt-5 mb-10 p-5'>
          {SidebarItems.map((sidebar_item) => (
            <SideBarItem
              key={sidebar_item.title}
              icon={sidebar_item.icon}
              title={sidebar_item.title}
              active={pathname === sidebar_item.path}
              onClick={() => navigate(sidebar_item.path)}
            />
          ))}
        </ul>

        <ul className='space-y-5 mt-5 p-5'>
          <SideBarItem
            icon={<Plus className='border-0 bg-white text-black p-1' />}
            title='Create Playlist'
            onClick={undefined}
          />
          <SideBarItem
            icon={<Heart className='border-0 bg-white text-black p-1' />}
            title='Liked Songs'
            onClick={undefined}
          />
        </ul>
        <div className='felx flex row items-center justify-center'>
          <Seperator className=' !w-[80%] ' />
        </div>
        {/*Player will be here*/}
        {!pathname.includes(AppConstantRoutes.paths.songDetailPage('')) && (
          <Player />
        )}
        <ul className='absolute bottom-0 w-full'>
          <UserTile
            name={`${user?.data.firstName} ${user?.data.lastName}`}
            userName={`@${user?.data.username}`}
            avatar={
              user?.data.profile_image ||
              'https://robohash.org/default-avatar.png'
            }
            className='ml-5 mb-5'
          />
          <Seperator className='my-4 w-full px-3' />

          <Button
            onClick={handleLogout}
            className='flex items-center justify-center gap-x-2 px-5 ms-5'
          >
            <PowerOff size={20} />
            <span>Logout</span>
          </Button>

          {/* <SideBarItem
            icon={<PowerOff size={20} />}
            title='Logout'
            onClick={handleLogout}
            className='m-5'
          /> */}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
