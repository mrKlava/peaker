import { useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext'
import { Author, Card, InputText, Quantity, Text } from '../../UI'
import { Comments } from '../../components'
import { httpRequest } from '../../axios'

import { ReactComponent as IconLike } from '../../assets/images/icons/IconLike.svg'
import { ReactComponent as IconComment } from '../../assets/images/icons/IconComment.svg'
import { ReactComponent as IconSend } from '../../assets/images/icons/IconSend.svg'
import { ReactComponent as IconDelete } from '../../assets/images/icons/IconDelete.svg'
// import { ReactComponent as IconShare } from '../../assets/images/icons/IconShare.svg'

import './post.scss'


function Post({ post }) {
  const queryClient = useQueryClient()

  const { currentUser } = useContext(AuthContext)

  const [ isCommentsVisible, setIsCommentsVisible ] = useState(false)
  const [ commentText, setCommentText ] = useState("")

  /* Post logic */

  const mutationPost = useMutation({
    mutationFn: (postID) => {
      return httpRequest.delete("/posts/" + postID)
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
  })

  const handleDelete = () => {
    mutationPost.mutate(post.post_id)
  }


  /* Comment logic */

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', post.post_id], 
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/comments?postID=" + post.post_id)
       
        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  const mutationComment = useMutation({
    mutationFn: (commentText) => {
      return httpRequest.post("/comments", commentText)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"])
    }
  })

  const handleChange = (e) => {
    setCommentText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (commentText) {
      mutationComment.mutate({text: commentText, postId: post.post_id})
      setCommentText("")
    }
  } 


  /* Like logic */

  const { data: likes = [] } = useQuery({
    queryKey: ['likes', post.post_id], 
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/likes?postID=" + post.post_id)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  const mutationLike = useMutation({
    mutationFn: async (isLiked) => {
      if (isLiked) return await httpRequest.delete('/likes?postID=' + post.post_id)

      return await httpRequest.post('/likes', { postID: post.post_id })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"])
    }
  })

  const handleLike = () => {
    mutationLike.mutate(likes.includes(currentUser.user_id))
  }

  return (
    <Card className="post" article={true}>
      <div className="post-head">
        <Author author={post} />
        { post.user_id === currentUser.user_id && <button className="svg-action" onClick={handleDelete}><IconDelete /></button> }
      </div>
      <div className="post-body">
        <Text className='post-body_text'>{post.text}</Text>

        {/* {
          post.images
            ? (
              <div className="post-images">
                {post.images.map((img, index) => {
                  return <div key={index} className="post-images_image"><img src={`./assets/images/${img}`} alt="" /></div>
                })}
              </div>
            ) : null
        } */}

      </div>
      <div className="post-footer">
        <ul className="post-footer_actions">
          <li className="post-footer_action">
            <button className="svg-action" onClick={handleLike}>
              {
                likes.includes(currentUser.user_id)
                ? <IconLike className="liked" />
                : <IconLike />
              }
            </button>
            { likes && <Quantity number={likes.length } /> }
          </li>
          {/* <li className="post-footer_action">
            <button><IconShare /></button>
          </li> */}
          <li className="post-footer_action" onClick={() => {setIsCommentsVisible(!isCommentsVisible)}}>
            <button className="svg-action"  >
              <IconComment />
            </button>
            { comments && <Quantity number={comments.length } /> }
          </li>
        </ul>
        <div className="post-footer_comment">
          <InputText 
            type="text" 
            onChange={handleChange} 
            value={commentText} 
            placeholder="What do you think? ..."
          >
          <button className="svg-action" onClick={handleSubmit}><IconSend /></button>
          </InputText>
        </div>
      </div>
      {isCommentsVisible &&  <Comments comments={comments} />}
    </Card>
  )
}

export default Post