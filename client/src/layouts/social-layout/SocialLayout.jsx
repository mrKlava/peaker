import { useContext, useEffect, useState } from 'react'
import { Aside, Header, Navbar } from '../../components'
import { Outlet, useLocation } from 'react-router-dom'

import './social-layout.scss'
import { AuthContext } from '../../context/authContext'
import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '../../axios'

function SocialLayout() {
  const {currentUser} = useContext(AuthContext)
  
  const id = useLocation().pathname.split("/")[2]
  const [userID, setUserID] = useState(id ? parseInt(id) : currentUser.user_id)

  const { isLoading, error, data } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/users/find/" + id)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  const { isLoading: isLoadingFollowing, data: following } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['following', id],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/follow?userID=" + id)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  const { isLoading: isLoadingFollowers, data: followers } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['followers', id],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/follow/ers?userID=" + id)

        console.log("/follow/ers?userID=" + id)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  console.log(userID)

  useEffect(() => {window.scrollTo(0, 0)}, [])

  return (
    <>
      <Navbar />
      <Header />
      <div className="container">
        <div className='main-social'>
          <Aside user={data} followers={followers} following={following} />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default SocialLayout