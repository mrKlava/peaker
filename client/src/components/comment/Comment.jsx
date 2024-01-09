import { Author, Text } from '../../UI'

import './comment.scss'

function Comment({ comment }) {
  return (
    <div className="comment">
      <div className="comment-head">
        <Author author={comment} small={true} />
      </div>
      <div className="comment-body">
        <Text>{comment.text}</Text>
      </div>
    </div>
  )
}

export default Comment