import { useContext, useEffect, useState } from 'react'
import { Aside, Header, Navbar } from '../../components'
import { Outlet, useLocation } from 'react-router-dom'

import './social-layout.scss'
import { AuthContext } from '../../context/authContext'
import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { Loading } from '../../UI'

function SocialLayout() {
  const { currentUser } = useContext(AuthContext)

  const id = useLocation().pathname.split("/")[2]
  const [userID, setUserID] = useState(id ? parseInt(id) : currentUser.user_id)

  const { isLoading, error, data } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['user', userID],
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
  }, [id])

  return (
    <>
      <Navbar />
      <Header />
      <div className="container">
        {
          isLoading
            ? <Loading />
            : <div className='main-social'>
            <Aside user={data}/>
            <Outlet />
          </div>

        }

      </div>
    </>
  )
}

export default SocialLayout