import {
  Navigate
  ,createBrowserRouter
} from 'react-router-dom'

import { 
  FeedPage
  ,LandingPage
  ,LoginPage
  ,ProfilePage
  ,RegisterPage 
  ,ExplorePage 
} from './pages'
import { SocialLayout } from './layouts'
import { useContext } from 'react'
import { AuthContext } from './context/authContext'


const ProtectedRoute = ({children}) => {
  const {currentUser} = useContext(AuthContext)

  if (!currentUser) return <Navigate to='/login' />

  return children
}
const AuthRoute = ({children}) => {
  const {currentUser} = useContext(AuthContext)

  if (currentUser) return <Navigate to='/' />

  return children
}

const router = createBrowserRouter([
  { path: '/',            element: <ProtectedRoute><SocialLayout /></ProtectedRoute>, children: [
    { path: '/',              element: <FeedPage /> },
    { path: '/profile/:id',   element: <ProfilePage /> },
  ]},
  { path: '/landing',     element: <LandingPage /> },
  { path: '/login',       element: <AuthRoute><LoginPage /></AuthRoute> },
  { path: '/register',    element: <AuthRoute><RegisterPage /></AuthRoute> },
  { path: '/explore',     element: <ExplorePage /> },
])

export default router