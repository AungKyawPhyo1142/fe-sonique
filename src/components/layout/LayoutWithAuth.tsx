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
          'bg-zinc-400/20 p-5 min-h-screen',
          location.pathname !== AppConstantRoutes.paths.profile && 'ml-[240px]',
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutWithAuth
