import { useEffect } from 'react'
import { Feed, PostNew } from '../../components'

import './feed-page.scss'

function FeedPage() {

  useEffect(() => {window.scrollTo(0, 0)}, [])

  return (
    <main>
      <PostNew />
      <Feed />
    </main>
  )
}

export default FeedPage