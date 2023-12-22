import React from 'react'
import { httpRequest } from '../../axios'
import { useQuery } from '@tanstack/react-query'

import './comments.scss'
import Comment from '../comment/Comment'

function Comments({postId}) {

  const { isLoading, error, data } = useQuery({
    queryKey: ['comments'], 
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/comments?postID="+postId)
        console.log(resp)
        return resp.data

      } catch (err) {
        console.log(err)
      }

    }
  })
  return (
    <div className='comments'>
    {
      isLoading 
      ? 'Loading'
      : data.length
        ? data.map(comment => <Comment key={comment.comment_id} comment={comment} />)
        : <p>No comments found</p>
    }
    </div>
  )
}

export default Comments