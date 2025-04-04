import { Outlet, useLocation } from 'react-router'

import { AppConstantRoutes } from '@/services/routes/path'
import clsx from 'clsx'

import Sidebar from '../navbar/Sidebar'
import Toaster from '../common/Toaster'

const LayoutWithAuth = () => {
  const location = useLocation()

  return (
    <div>
      {location.pathname !== AppConstantRoutes.paths.profile && <Sidebar />}
      <main
        className={clsx(
          'bg-zinc-400/20 min-h-screen',
          location.pathname !== AppConstantRoutes.paths.profile && 'ml-[240px]',
          !location.pathname.startsWith(
            AppConstantRoutes.paths.songDetailPage(''),
          ) && 'p-5',
        )}
      >
        <Outlet />
        <Toaster />
      </main>
    </div>
  )
}

export default LayoutWithAuth
