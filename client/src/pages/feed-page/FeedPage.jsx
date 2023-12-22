import React from 'react'
import { Feed, PostNew } from '../../components'

import './feed-page.scss'

function FeedPage() {
  return (
    <main>
      <PostNew />
      <Feed />
    </main>
  )
}

export default FeedPage