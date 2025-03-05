import { Outlet } from 'react-router'

import Sidebar from '../navbar/Sidebar'

const LayoutWithAuth = () => {
  return (
    <div>
      <Sidebar />
      <main className='ml-[240px] bg-zinc-400/20 p-5 min-h-screen'>
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutWithAuth
