import React from 'react'
import './social-layout.scss'
import { Aside, Header, Navbar } from '../../components'
import { Outlet } from 'react-router-dom'

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