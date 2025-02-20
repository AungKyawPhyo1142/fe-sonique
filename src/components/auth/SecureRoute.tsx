import { useIsUserAuthenticated } from '@/services/network/lib/auth'
import { AppConstantRoutes } from '@/services/routes/path'
import {
  cleanupAfterLogout,
  initAfterLogin,
} from '@/services/zustand/authStore'
import { JSX, useEffect } from 'react'
import { Navigate } from 'react-router'

// This is the middleware route that checks the user is logged in or not
// If the user is not logged in, it will redirect to the login page
// ** Any routes that are wrapped with this component will be protected with authentication

type Props = {
  children: JSX.Element
}

const SecureRoute = ({ children }: Props) => {
  // note that theses: data, isError, isSuccess are destructured from the useIsUserAuthenticated hook
  // basically they care coming from React Query
  const { data: response, isError, isSuccess } = useIsUserAuthenticated()

  useEffect(() => {
    if (isSuccess) {
        console.log('success', response)
      initAfterLogin({ ...response }, true)
    }
  }, [isSuccess, response])

  if (isError) {
    cleanupAfterLogout()
    return <Navigate to={AppConstantRoutes.paths.auth.login} replace />
  }

  if (isSuccess) {
    if (response.status === 'SUCCESS') {
      return children
    }
  } else {
    return <Navigate to='/' replace />
  }

  return null
}

export default SecureRoute
