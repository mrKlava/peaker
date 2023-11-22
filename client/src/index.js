import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext'

import router from './router'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider  router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
