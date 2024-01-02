import { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { httpRequest } from '../../axios'
import { Button, Loading, TitleMain } from '../../UI'
import { Post } from '../../components'

import '../feed/feed.scss'

function Posts({ userID }) {
  const { ref, inView } = useInView()

  const [id, setId] = useState(userID)

  const {
    status,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users', id],
    queryFn: async ({ pageParam }) => {
      try {
        const resp = await httpRequest.get("/posts/user/" + id + '?page=' + pageParam)

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

  useEffect(() => {setId(userID)}, [userID])

  return (
    <section className='post-feed'>
      {
        status === 'pending'
          ? <Loading />
          : data.pages[0]
            ? <>
              <section className="users-cards">
                {
                  data.pages.map((page) => {
                    return page ? page.data.map((post) => <Post key={post.post_id} post={post} />) : null
                  })
                }
              </section>
              <div className="post-feed_load">
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
            : <TitleMain>No Posts found</TitleMain>
      }
    </section>
  )
}

export default Posts