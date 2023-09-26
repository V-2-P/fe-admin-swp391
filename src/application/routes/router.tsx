import React, { ReactNode, Suspense, useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { NotFound, Login } from '~/application/pages'
import Loading from '../components/shared/Loading'
import ErrorBoundary from './errorBoundary'

const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

const Router: React.FC = () => {
  return (
    <Wrapper>
      <ErrorBoundary>
        <Suspense fallback={<Loading isLoading={true} />}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Wrapper>
  )
}

export default Router
