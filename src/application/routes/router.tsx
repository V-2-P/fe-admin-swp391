import React, { ReactNode, Suspense, useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import {
  NotFound,
  Login,
  Dashboard,
  BirdList,
  CustomerList,
  AddBird,
  Profile,
  OrderList,
  StaffList,
  Delivery,
  FeedbackList,
  UpdateCustomer,
  UpdateStaff
} from '~/application/pages'
import Loading from '../components/shared/Loading'
import ErrorBoundary from './errorBoundary'
import CommonLayout from '../layouts/common'
import PrivateRoute from '../components/route/PrivateRoute'
import PublicRoute from '../components/route/PublicRoute'

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
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path='/' element={<Login />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route element={<CommonLayout />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/birdlist' element={<BirdList />} />
                <Route path='/customerlist' element={<CustomerList />} />
                <Route path='/addbird' element={<AddBird />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/orderlist' element={<OrderList />} />
                <Route path='/stafflist' element={<StaffList />} />
                <Route path='/delivery' element={<Delivery />} />
                <Route path='/feedbacklist' element={<FeedbackList />} />
                <Route path='/updatecustomer' element={<UpdateCustomer />} />
                <Route path='/updatecustomer/:id' element={<UpdateCustomer />} />
                <Route path='/updatestaff' element={<UpdateStaff />} />
                <Route path='/updatestaff/:id' element={<UpdateStaff />} />
              </Route>
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Wrapper>
  )
}

export default Router
