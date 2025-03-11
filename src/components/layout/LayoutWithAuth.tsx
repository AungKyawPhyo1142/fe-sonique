import { Outlet, useLocation } from 'react-router'

import { AppConstantRoutes } from '@/services/routes/path'
import clsx from 'clsx'
import Sidebar from '../navbar/Sidebar'

const LayoutWithAuth = () => {
  const location = useLocation()

  return (
    <div>
      {location.pathname !== AppConstantRoutes.paths.profile && <Sidebar />}
      <main
        className={clsx(
          'bg-zinc-400/2 min-h-screen',
          location.pathname !== AppConstantRoutes.paths.profile && 'ml-[240px]',
          !location.pathname.startsWith(
            AppConstantRoutes.paths.songDetailPage(''),
          ) && 'p-5',
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutWithAuth
