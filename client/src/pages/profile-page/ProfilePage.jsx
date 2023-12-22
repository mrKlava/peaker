import React from 'react'
import { PostNew, Posts } from '../../components'

import './profile-page.scss'
import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { useLocation } from 'react-router-dom'

function ProfilePage() {
  const userID = useLocation().pathname.split("/")[2]

  const { isLoading, erorr, data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/users/find/" + userID)
        
        console.log(resp.data)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  return (
    <main>
      <PostNew />
      <Posts />
    </main>
  )
}

export default ProfilePage