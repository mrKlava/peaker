import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { Button } from '../../UI'

import './user-update.scss'

function UserUpdate({ setIsUpdate, user }) {
  const [coverImg, setCoverImg] = useState(null)
  const [profileImg, setProfileImg] = useState(null)
  const [inputs, setInputs] = useState(user)

  const queryClient = useQueryClient()

  const upload = async (file) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const resp = await httpRequest.post("/upload/post-image", formData)
      return resp.data

    } catch (err) {
      console.log(err)
    }
  }

  const mutation = useMutation({
    mutationFn: (user) => {
      return httpRequest.put("/users", user)
    },
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries(["users"])
    }
  })

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: [e.target.value] }))
  }

  const updateUser = async (e) => {
    e.preventDefault()

    // let coverUrl = user.coverImg
    let profileUrl = user.profileImg

    // if (coverImg) coverUrl = await upload()
    if (profileImg) profileUrl = await upload()


    mutation.mutate({...inputs})
    // mutation.mutate({...inputs, coverImg, user_img: profileUrl, cover_img: coverUrl})

    setIsUpdate(false)
  }

  return (
    <div className="user-update">
      <button onClick={() => setIsUpdate(false)}>x</button>
      <form>
        <input type="file" id="coverImg" name="coverImg" onChange={(e) => setCoverImg(e.target.files[0])} />
        <input type="file" id="profileImg" name="profileImg" onChange={(e) => setProfileImg(e.target.files[0])} />

        <input type="text" name="firstname" onChange={handleChange} value={inputs.firstname} />
        <input type="text" name="middlename" onChange={handleChange} value={inputs.middlename} />
        <input type="text" name="lastname" onChange={handleChange} value={inputs.lastname} />
        <input type="text" name="gender" onChange={handleChange} value={inputs.gender} />
        <input type="email" name="email" onChange={handleChange} value={inputs.email} />
        <input type="text" name="username" onChange={handleChange} value={inputs.username} />
        
        <Button className="" onClick={updateUser}>Update</Button>
      </form>
    </div>
  )
}

export default UserUpdate