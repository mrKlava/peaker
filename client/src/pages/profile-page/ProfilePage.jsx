import { Aside, Header, Navbar, PostNew, Posts } from '../../components'

import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { useLocation } from 'react-router-dom'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'

import './profile-page.scss'

function ProfilePage() {
  const { currentUser } = useContext(AuthContext)

  const id = useLocation().pathname.split("/")[2]
  const [userID, setUserID] = useState(id ? parseInt(id) : currentUser.user_id)


  useEffect(() => { window.scrollTo(0, 0) }, [])

  useEffect(() => {
    if (id) {
      setUserID(parseInt(id))
    } else {
      setUserID(currentUser.user_id)
    }
  }, [id])

  return (
    <main>
      {userID === currentUser.user_id && <PostNew />}
      <Posts userID={userID} />
    </main>
  )
}

export default ProfilePage