import React, { useEffect, useState } from 'react'
import { UsersCards, UsersFilter } from '../../components'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { Button, Loading, TitleMain } from '../../UI'
import { useSearchParams } from 'react-router-dom'

import './user-page.scss'

function UsersPage() {
  const { ref, inView } = useInView() 

  const [searchParams, setSearchParams] = useSearchParams();

  const setEndpoint = () => {
    const params = []
    for (const [key, value] of searchParams.entries()) {
      if (value) {
        params.push(`${key}=${value}`)
      }
    }
  
    return '/filter?' + (params.length ? params.join('&') + '&' : '') + 'page=' 
  }
 
  const endPoint = setEndpoint()

  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users', endPoint],
    queryFn: async ({pageParam}) => {
      try {
        const resp = await httpRequest.get('/users' + endPoint + pageParam)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  return (
    <main className="users-main">
      <UsersFilter setSearchParams={setSearchParams}/>
      {
        status === 'pending'
        ? <Loading />
        : data.pages[0]
          ? <>
              <section className="users-cards">
                { data.pages.map((page, i) => <UsersCards key={i} users={page.data} />) }
              </section>
              <div className="users-main_load">
              {
                isFetchingNextPage
                ? <Loading />
                : hasNextPage
                  ? <Button
                      forwardRef={ref}
                      onClick={() => fetchNextPage()}
                      disabled={!hasNextPage || isFetchingNextPage}
                    >
                    Load More
                    </Button>
                  : null
              }
              </div>
          </>
          : <TitleMain>No users found</TitleMain>
      }
    </main>
  )
}

export default UsersPage