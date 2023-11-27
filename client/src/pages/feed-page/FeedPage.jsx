import React, { useContext } from 'react'
import { Feed, PostNew } from '../../components'
import { PostsContext } from '../../context/postsContext'

import './feed-page.scss'

function FeedPage() {
  const {posts} = useContext(PostsContext)

  return (
    <main>
      <PostNew />
      <Feed posts={posts}/>
    </main>
  )
}

export default FeedPage