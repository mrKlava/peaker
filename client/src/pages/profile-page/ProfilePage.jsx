import React from 'react'
import { Aside, Header, Navbar, PostNew, Posts } from '../../components'

import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { useLocation } from 'react-router-dom'

import './profile-page.scss'

function ProfilePage() {
  const userID = parseInt(useLocation().pathname.split("/")[2])

  return (
    <>
      <Navbar />
      <Header />
      <div className="container">
        <div className='main-social'>
          <Aside userID={userID} />
          <main>
            <PostNew />
            <Posts userID={userID} />
          </main>
        </div>
      </div>
    </>

  )
}

export default ProfilePage