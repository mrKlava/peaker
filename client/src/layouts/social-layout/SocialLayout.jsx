import React from 'react'
import { Aside, Header, Navbar } from '../../components'
import { Outlet } from 'react-router-dom'

import './social-layout.scss'

function SocialLayout() {
  return (
    <>
      <Navbar />
      <Header />
      <div className="container">
        <div className='main-social'>
          <Aside />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default SocialLayout