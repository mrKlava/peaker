import { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Aside, Header, Navbar } from '../../components'
import { AuthContext } from '../../context/authContext'
import { httpRequest } from '../../axios'
import { Loading } from '../../UI'

import './social-layout.scss'

function SocialLayout() {
  const { currentUser } = useContext(AuthContext)

  const id = useLocation().pathname.split("/")[2]
  const [ userID, setUserID ] = useState(id ? parseInt(id) : currentUser.user_id)

  const { isLoading, data } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["user", userID],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/users/find/" + userID)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  useEffect(() => {
    if (id) {
      setUserID(parseInt(id))
    } else {
      setUserID(currentUser.user_id)
    }
  }, [currentUser.user_id, id])

  return (
    <>
      <Navbar />
      <Header />
      <div className="container">
        {
          isLoading
            ? <Loading />
            : data
              ? <div className="main-social">
                  <Aside user={data} />
                  <Outlet />
                </div>
              : <Navigate to="/" />

        }

      </div>
    </>
  )
}

export default SocialLayout