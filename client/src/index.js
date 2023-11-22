import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import {
  Navigate,
  RouterProvider
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



const currentUser = true

const ProtectedRoute = ({children}) => {
  if (!currentUser) return <Navigate to='/login' />

  return children
}
const AuthRoute = ({children}) => {
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider  router={router} />
  </React.StrictMode>
);
