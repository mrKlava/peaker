import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/authContext'

import router from './router'
import { PostsContextProvider } from './context/postsContext'


const root = ReactDOM.createRoot(document.getElementById('root'));

// const queryCLient = new QueryClient()

root.render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryCLient}> */}
      <AuthContextProvider>
        <PostsContextProvider>
          <RouterProvider router={router} />
        </PostsContextProvider>
      </AuthContextProvider>
    {/* </QueryClientProvider> */}
  </React.StrictMode>
);
