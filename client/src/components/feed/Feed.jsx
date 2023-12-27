import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import Post from '../post/Post'

import './feed.scss'

function Feed() {

  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'], 
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/posts")
        console.log(resp)
        return resp.data

      } catch (err) {
        console.log(err)
      }

    }
  })
  
  return (
    <section className='post-feed'>
      {
        isLoading
        ? 'loading'
        : error
          ? 'error'
          : data.length ? data.map(post => <Post key={post.post_id} post={post} />) : <h1>No posts</h1>
      }
    </section>
  )
}

export default Feed