import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { AuthContextProvider } from './context/authContext'
import { MapContextProvider } from './context/mapContext'
import { PostsContextProvider } from './context/postsContext'

import router from './router'

import './index.scss'


const root = ReactDOM.createRoot(document.getElementById('root'));

// const queryCLient = new QueryClient()

root.render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryCLient}> */}
      <AuthContextProvider>
        <PostsContextProvider>
          <MapContextProvider>
            <RouterProvider router={router} />
          </MapContextProvider>
        </PostsContextProvider>
      </AuthContextProvider>
    {/* </QueryClientProvider> */}
  </React.StrictMode>
)
