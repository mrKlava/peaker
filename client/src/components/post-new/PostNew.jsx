import React, { useContext, useState } from 'react'
import { ReactComponent as IconSend } from '../../assets/images/icons/IconSend.svg'
import { ReactComponent as IconSmile } from '../../assets/images/icons/IconSmile.svg'
import { ReactComponent as IconImage } from '../../assets/images/icons/IconImage.svg'
import { ReactComponent as IconLocation } from '../../assets/images/icons/IconLocation.svg'
import { PostsContext } from '../../context/postsContext'

function PostNew() {
  const {posts, setPosts} = useContext(PostsContext)
  const [newpost, setNewpost] = useState({
    text: "",
    images: [],
    location: ""
  })

  const createPost = () => {
    setPosts([
      {
        ...newpost,
        created: new Date().toJSON(),
        id: Date.now(),
        likes: 12345,
        shares: 12345,
        comments: 12345,
        author: "Name Surname",
        author_img: "user-photo.jpg",
      },
      ...posts])

    setNewpost({
      text: "",
      images: [],
      location: ""
    })
  }

  const handleChange = (e) => setNewpost({ ...newpost, text: e.target.value })

  return (
    <section className="post-new">
      <div className="post-new_body">
        <textarea onChange={handleChange} value={newpost.text}></textarea>
      </div>
      <div className="post-new_footer">
        <ul className="post-footer_actions">
          <li className="post-footer_action">
            <button><IconSmile /></button>
          </li>
          <li className="post-footer_action">
            <button><IconImage /></button>
          </li>
          <li className="post-footer_action">
            <button><IconLocation /></button>
          </li>
        </ul>
        <button onClick={createPost}><IconSend /></button>
      </div>
    </section>
  )
}

export default PostNew