import { Aside, Header, Navbar, PostNew, Posts } from '../../components'

import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { useLocation } from 'react-router-dom'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'

import './profile-page.scss'

function ProfilePage() {


  // const [userID, setUserID] = useState(parseInt(useLocation().pathname.split("/")[2]))
  const {currentUser} = useContext(AuthContext)

  const userID = parseInt(useLocation().pathname.split("/")[2])
  

  // NEED TO PUT ALL LOGIC OF GETTING USER OVER HERE AND PASS DOWN TO COMPONENTS
  
  
  useEffect(() => {
    // setUserID()
    console.log('changed user id')
  }, [userID]) 

  useEffect(() => {window.scrollTo(0, 0)}, [])

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