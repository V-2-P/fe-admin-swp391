import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '~/application/hooks/reduxHook'

type PublicRouteProps = {
  redirectPath?: string
  children?: React.ReactNode
}

const PublicRoute: React.FC<PublicRouteProps> = ({ redirectPath = '/dashboard', children }) => {
  const { isLogin, role } = useAppSelector((state) => state.account)
  if (isLogin) {
    return <Navigate to={role === 'ROLE_ADMIN' || role === 'ROLE_MANAGER' ? redirectPath : '/profile'} replace />
  }

  return children ? children : <Outlet />
}

export default PublicRoute
