import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { Card, TextError } from '../../UI'
import { ReactComponent as IconSend } from '../../assets/images/icons/IconSend.svg'
import { ReactComponent as IconSmile } from '../../assets/images/icons/IconSmile.svg'
import { ReactComponent as IconImage } from '../../assets/images/icons/IconImage.svg'
import { ReactComponent as IconLocation } from '../../assets/images/icons/IconLocation.svg'

import './post-new.scss'


function PostNew() {  
  const [error, setError] = useState(null)
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


    /* handle image */
    const handleImage = (e) => {
      const file = e.target.files[0]
  
      // check if image is less than 4mb
      if (file.type !== "image/jpeg") {
        setError('Image must be jpg')
  
        e.target.value = null;
        return null
      }
      if (((file.size / 1024) / 1024).toFixed(4) > 4) {
        setError('Image can not be larger than 4mb')
  
        e.target.value = null;
        return null
      }
  
      return file
    }


  const upload = async () => {
    try {
      
      const formData = new FormData()
      formData.append("file", file)
      
      const resp = await httpRequest.post("/upload/image", formData)
      return resp.data

    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (file || post.text) {
      let imgUrl = ""
      if (file) imgUrl = await upload()
  
      console.log(imgUrl)
  
      mutation.mutate({text: post.text})
  
      setPost({
        text: "",
        location: ""
      })
    }

  }

  const removeImage = () => setFile(null)



  return (
    <Card className="post-new" light={true}>
      <div className="post-new_body">
        <textarea onChange={handleChange} value={post.text}></textarea>
        <TextError error={error} className='dark' />
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
            <input type="file" id="file" name="file" style={{display: "none"}} onChange={(e) => setFile(handleImage(e))} accept="image/jpeg" />
          </li>
          <li className="post-footer_action">
            <button><IconLocation /></button>
          </li>
        </ul>
        <button onClick={handleSubmit}><IconSend /></button>
      </div>
    </Card>
  )
}

export default PostNew 