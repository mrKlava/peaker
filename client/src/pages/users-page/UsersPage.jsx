import React, { useEffect, useState } from 'react'
import './user-page.scss'
import { UsersCards, UsersFilter } from '../../components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { Loading } from '../../UI'
import { useSearchParams } from 'react-router-dom'

function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryClient = useQueryClient()
 
  const setEndpoint = () => {
    const params = []
    for (const entry of searchParams.entries()) {
      if (entry[1]) {
        params.push(`${entry[0]}=${entry[1]}`)
      }
    }
  
    return '/users' + (params.length ? '/filter?' + params.join('&') : '')
  }
 
  const endPoint = setEndpoint()

  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get(endPoint)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  const mutation = useMutation({
    mutationFn: () => {
      return httpRequest.get(endPoint)
    },
    onSuccess: () => {
      console.log(data)
      queryClient.invalidateQueries(["users"])
    }
  })

  useEffect(() => {
    console.log(endPoint)
    mutation.mutate()
  }, [searchParams])
  
  return (
    <main className="users-main">
      <UsersFilter setSearchParams={setSearchParams}/>
      {
        isLoading 
        ? <Loading />
        : <UsersCards users={data} />
      }

        {/* <Loading />
        <UsersCards users={data} /> */}
    </main>
  )
}

export default UsersPage