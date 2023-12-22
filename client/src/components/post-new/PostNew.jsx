import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { httpRequest } from '../../axios'

import './post-new.scss'

import { ReactComponent as IconSend } from '../../assets/images/icons/IconSend.svg'
import { ReactComponent as IconSmile } from '../../assets/images/icons/IconSmile.svg'
import { ReactComponent as IconImage } from '../../assets/images/icons/IconImage.svg'
import { ReactComponent as IconLocation } from '../../assets/images/icons/IconLocation.svg'

function PostNew() {  
  const [post, setPost] = useState({
    text: "",
    location: ""
  })

  const [ file, setFile ] = useState(null)


  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return httpRequest.post('/posts', newPost)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
    }
  })

  const handleChange = (e) => setPost({ ...post, text: e.target.value })

  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const resp = await httpRequest.post("/upload/post-image", formData)
      return resp.data

    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let imgUrl = ""
    if (file) imgUrl = await upload()

    console.log(imgUrl)

    mutation.mutate({text: post.text})

    setPost({
      text: "",
      location: ""
    })
  }

  const removeImage = () => setFile(null)



  return (
    <section className="post-new">
      <div className="post-new_body">
        <textarea onChange={handleChange} value={post.text}></textarea>
      { file && 
      <div className="post-new_upload">
        <img onClick={removeImage}  alt='' src={URL.createObjectURL(file)} />
      </div>
      }
      </div>
      <div className="post-new_footer">
        <ul className="post-footer_actions">
          <li className="post-footer_action">
            <button><IconSmile /></button>
          </li>
          <li className="post-footer_action">
            <label htmlFor="file"><IconImage /></label>
            <input type="file" id="file" name="file" style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])}/>
          </li>
          <li className="post-footer_action">
            <button><IconLocation /></button>
          </li>
        </ul>
        <button onClick={handleSubmit}><IconSend /></button>
      </div>
    </section>
  )
}

export default PostNew 