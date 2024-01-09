import { Comment } from '../../components'
import { Text } from '../../UI'

import './comments.scss'

function Comments({ comments }) {
  return (
    <div className="comments">
    { 
      comments.length
      ? comments.map(comment => <Comment key={comment.comment_id} comment={comment} />)
      : <Text className="comments-empty">No comments found</Text>
    }
    </div>
  )
}

export default Comments