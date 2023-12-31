import { Navigate, createBrowserRouter } from 'react-router-dom'
import { useContext } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import {
  FeedPage
  , LandingPage
  , LoginPage
  , ProfilePage
  , RegisterPage
  , ExplorePage
  , UsersPage,
  NotFound
} from './pages'
import { SocialLayout } from './layouts'
import { AuthContext } from './context/authContext'
import { MapContextProvider } from './context/mapContext'

const queryCLient = new QueryClient()

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) return <Navigate to='/login' />

  return children
}

const AuthRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  if (currentUser) return <Navigate to='/' />

  return children
}

const router = createBrowserRouter([
  {
    path: '/', element: (
      <ProtectedRoute>
        <QueryClientProvider client={queryCLient}>
          <SocialLayout />
        </QueryClientProvider>
      </ProtectedRoute>),
    children: [
      { path: '/', element: <FeedPage /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/profile/:id',   element: <ProfilePage /> },
    ]
  },
  // {
  //   path: '/profile/:id', element: (
  //     <ProtectedRoute>
  //       <QueryClientProvider client={queryCLient}>
  //         <ProfilePage />
  //       </QueryClientProvider>
  //     </ProtectedRoute>
  //   )
  // },
  { path: '/landing', element: <LandingPage /> },
  { path: '/login', element: <AuthRoute><LoginPage /></AuthRoute> },
  { path: '/register', element: <AuthRoute><RegisterPage /></AuthRoute> },
  { path: '/explore', element: <MapContextProvider><ExplorePage /></MapContextProvider> },
  { path: '*', element: <Navigate to='/' /> },
])

export default router