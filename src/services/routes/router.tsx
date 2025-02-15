import { createBrowserRouter, Navigate } from 'react-router'
import { AppConstantRoutes } from './path'
import Login from '@/pages/auth/Login'

/*
  This file is where you define the routes
*/

export const getDefaultRoute = () => {
  // TODO: return the default route (home?)
  return AppConstantRoutes.paths.auth.default
}

// Define a default route handler
// if the user is already logged in, redirect to the dashboard
// otherwise, redirect to the login page
const handleDefaultRoute = () => {
  // TODO: replace this with the actual logic to check if the user is logged in
  return <Navigate to={AppConstantRoutes.paths.auth.login} />
}

export const router = createBrowserRouter([
  {
    path: '*',
    element: handleDefaultRoute(),
  },
  {
    path: AppConstantRoutes.paths.auth.login,
    element: <Login />,
  },
])
