import React from 'react'
import './user-page.scss'
import { UsersCards, UsersFilter } from '../../components'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { Loading } from '../../UI'

function UsersPage() {
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/users/")

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })
  
  return (
    <main className="users-main">
      <UsersFilter />
      {
        isLoading 
        ? <Loading />
        : <UsersCards users={data} />
      }
    </main>
  )
}

export default UsersPage