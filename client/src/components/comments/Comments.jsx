import { httpRequest } from '../../axios'
import { useQuery } from '@tanstack/react-query'
import { Comment } from '../../components'
import { Loading, Text } from '../../UI'

import './comments.scss'

function Comments({postId}) {

  const { isLoading, error, data } = useQuery({
    queryKey: ['comments'], 
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/comments?postID=" + postId)
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
      ? <Loading />
      : data.length
        ? data.map(comment => <Comment key={comment.comment_id} comment={comment} />)
        : <Text className="comments-no">No comments found</Text>
    }
    </div>
  )
}

export default Comments