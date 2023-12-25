import { Aside, Header, Navbar, PostNew, Posts, UserUpdate } from '../../components'

import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { useLocation } from 'react-router-dom'

import './profile-page.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

function ProfilePage() {
  const userID = parseInt(useLocation().pathname.split("/")[2])
  const {currentUser} = useContext(AuthContext)


  return (
    <>
      <Navbar />
      <Header />
      <div className="container">
        <div className='main-social'>
          <Aside userID={userID} />
          <main>
            { userID === currentUser.user_id && <PostNew />}
            <Posts userID={userID} />
          </main>
        </div>
      </div>
    </>

  )
}

export default ProfilePage