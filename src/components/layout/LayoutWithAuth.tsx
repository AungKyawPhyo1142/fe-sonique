import { Outlet } from 'react-router'
import Navbar from '../navbar/Navbar'

const LayoutWithAuth = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default LayoutWithAuth
