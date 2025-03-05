import { Outlet, useLocation } from 'react-router';

import { AppConstantRoutes } from '@/services/routes/path';
import Sidebar from '../navbar/Sidebar';

const LayoutWithAuth = () => {
  const location = useLocation();
  
  return (
    <div>
      {location.pathname !== AppConstantRoutes.paths.profile && <Sidebar />}
      <main className={location.pathname !== AppConstantRoutes.paths.profile ? 'ml-[240px]' : ''}>
      <Sidebar />
      <main className='ml-[240px] bg-zinc-400/20 p-5 min-h-screen'>
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutWithAuth
