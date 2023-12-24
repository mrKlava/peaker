import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import Post from '../post/Post'

import '../feed/feed.scss'

function Posts({userID = null}) {

  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'], 
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/posts/user/"+userID)
        
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
          :  data.map(post => <Post key={post.post_id} post={post} />)
      }
    </section>
  )
}

export default Posts