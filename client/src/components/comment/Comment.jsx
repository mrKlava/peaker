import React from 'react'
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'

import { Avatar } from '../../UI'

function Comment({comment}) {
  return (
    <div className='comment'>
      <div className="post-head">
        <Avatar img={comment.author_img} />
        <div className="post-head_stamp">
          <span>{comment.firstname} {comment.lastname}</span>
          <span>{ moment(comment.created).fromNow() }</span>
        </div>
      </div>
      <div>
        {comment.text}
      </div>
    </div>
  )
}

export default Comment