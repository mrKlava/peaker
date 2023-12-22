import React, { useContext, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '../../context/authContext'
import moment from 'moment'

import { ReactComponent as IconLike } from '../../assets/images/icons/IconLike.svg'
import { ReactComponent as IconComment } from '../../assets/images/icons/IconComment.svg'
import { ReactComponent as IconShare } from '../../assets/images/icons/IconShare.svg'
import { ReactComponent as IconSend } from '../../assets/images/icons/IconSend.svg'
import { Avatar } from '../../UI'
import { Comments } from '../../components'
import { httpRequest } from '../../axios'

import './post.scss'

function Post({ post }) {
  const {currentUser} = useContext(AuthContext)
  const [isCommentsVisible, setIsCommentsVisible] = useState(false)
  const [commentText, setCommentText] = useState("")

  const queryClient = useQueryClient()

  const { isLoading, error, data = [] } = useQuery({
    queryKey: ['likes', post.post_id], 
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/likes?postID="+post.post_id)
        // console.log(resp.data)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  const mutationComment = useMutation({
    mutationFn: (commentText) => {
      return httpRequest.post('/comments', commentText)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"])
    }
  })

  const mutationLike = useMutation({
    mutationFn: async (isLiked) => {
      // if (isLiked) return httpRequest.delete('/likes?postID='+post.post_id)
      // return httpRequest.post('/likes?postID='+post.post_id)

      if (isLiked) return await httpRequest.delete('/likes?postID='+post.post_id)
      return await httpRequest.post('/likes', {postID: post.post_id})
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"])
    }
  })





  const handleLike = () => {
    mutationLike.mutate(data.includes(currentUser.user_id))
  }

  const handleChange = (e) => {
    setCommentText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    mutationComment.mutate({text: commentText, postId: post.post_id})

    setCommentText("")
  } 

  return (
    <article className="post">
      <div className="post-head">
        <Avatar img={post.author_img} />
        <div className="post-head_stamp">
          <span>{post.firstname} {post.lastname}</span>
          <span>{ moment(post.created).fromNow() } {post.location ? `- ${post.location}` : null} </span>
        </div>
      </div>
      <div className="post-body">
        {post.text}
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
            <button onClick={handleLike}>
              {
                data.includes(currentUser.user_id)
                ? <IconLike className="liked" />
                : <IconLike />
              }
            </button>
            <span>{ data && data.length }</span>
          </li>
          <li className="post-footer_action">
            <button><IconShare /></button>
            {/* <span>{ post.shares }</span> */}
          </li>
          <li className="post-footer_action" onClick={() => {setIsCommentsVisible(!isCommentsVisible)}}>
            <button>
              <IconComment />
            </button>
            {/* <span>{ post.comments}</span> */}
          </li>
        </ul>
        <div className="post-footer_comment">
          <input type="text" onChange={handleChange} value={commentText} placeholder="What do you think? ..." />
          <button onClick={handleSubmit}><IconSend /></button>
        </div>
      </div>
      {isCommentsVisible && <Comments postId={post.post_id} />}

      {/* <Comments postId={post.post_id} /> */}
    </article>
  )
}

export default Post