import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext'

import router from './router'
import { PostsContextProvider } from './context/postsContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <RouterProvider  router={router} />
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
