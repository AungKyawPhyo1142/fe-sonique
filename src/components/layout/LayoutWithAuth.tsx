import { Outlet } from 'react-router'

import Sidebar from '../navbar/Sidebar'

const LayoutWithAuth = () => {
  return (
    <div>
      <Sidebar />
      <main className='ml-[240px]'>
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutWithAuth
