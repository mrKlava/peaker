import React, { useEffect } from 'react'
import Post from '../post/Post'

import './feed.scss'

function Feed({posts}) {

  useEffect(() => {}, [posts])
  
  return (
    <section className='post-feed'>
      {posts.map(post => <Post key={post.id} post={post} />)}
    </section>
  )
}

export default Feed