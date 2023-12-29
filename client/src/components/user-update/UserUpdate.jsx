import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { Button, Card, InputSelect, InputText, InputTextarea, Loading, TextError, TitleMain } from '../../UI'
import { ReactComponent as IconClose } from '../../assets/images/icons/IconClose.svg'
import moment from "moment"


import './user-update.scss'

function UserUpdate({ setIsUpdate, user }) {
  const [error, setError] = useState(null)
  const [coverImg, setCoverImg] = useState(null)
  const [profileImg, setProfileImg] = useState(null)
  const [inputs, setInputs] = useState(user)

  const queryClient = useQueryClient()


  /* Fetch Countries */
  const { isLoading: isLoadingCountries, data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/countries")

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  /* Fetch Cities */
  const { isLoading: isLoadingCities, data: cities } = useQuery({
    queryKey: ['cities', inputs.country_id],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/cities/country?id=" + inputs.country_id)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })


  /* handle image */
  const handleImage = (e) => {
    const file = e.target.files[0]

    console.log(e.target.files)
    
    // check if image is less than 4mb
    if (file.type !== "image/jpeg") {
      setError('Image must jpg')
      
      e.target.value = null;
      return null 
    }
    if (((file.size/1024)/1024).toFixed(4) > 4) {
      setError('Image can not be larger than 4mb')
      
      e.target.value = null;
      return null
    }
    
    return file
  }

  const upload = async (file) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      console.log(formData)

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
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const updateUser = async (e) => {
    e.preventDefault()

    // let coverUrl = user.coverImg
    let profileUrl = user.profileImg

    // if (coverImg) coverUrl = await upload()
    if (profileImg) profileUrl = await upload(profileImg)

    console.log(profileUrl)


    mutation.mutate({ ...inputs, user_img: profileUrl ? profileUrl : inputs.user_img })
    // mutation.mutate({...inputs, coverImg, user_img: profileUrl, cover_img: coverUrl})

    setIsUpdate(false)
  }


  /* DEBUG */

  useEffect(() => {
    console.log(profileImg)
  }, [profileImg])

  useEffect(() => {
    console.log(coverImg)
  }, [coverImg])


  useEffect(() => {
    console.log(inputs)
  }, [inputs])



  return (
    <div className="user-overlay">

      <Card className="user-update">
        <div className='user-update_close'>
          <button onClick={() => setIsUpdate(false)}><IconClose /></button>
        </div>

        <TitleMain>Update Info</TitleMain>

        <form>
          <div className="user-images">

            <div className="user-images_item">
              <label htmlFor="bio">Profile picture</label>
              <div className="user-image">
                {
                  profileImg
                    ? <img src={URL.createObjectURL(profileImg)} alt="" />
                    : <img src={`/assets/images/${inputs.user_img}`} alt="" />
                }
              </div>
              <input type="file" id="profileImg" name="profileImg" accept="image/jpeg" onChange={ (e) => setProfileImg(handleImage(e)) } />
            </div>

            <div className="user-images_item">
              <label htmlFor="bio">Cover picture</label>
              <div className="user-image">
                {
                  coverImg
                    ? <img src={URL.createObjectURL(coverImg)} alt="" />
                    : <img src={`/assets/images/${inputs.user_img}`} alt="" />
                }
              </div>
              <input type="file" id="coverImg" name="coverImg" accept="image/jpeg" onChange={(e) => setCoverImg(handleImage(e))} />
            </div>

          </div>

          <div className="form-row">
            <InputText
              type="text"
              label='Firstname'
              name="firstname"
              placeholder='Firstname ...'
              onChange={handleChange}
              value={inputs.firstname ? inputs.firstname : ''}
              required
            />
            <InputText
              type="text"
              name="middlename"
              label='Middlename'
              placeholder='Middlename ...'
              onChange={handleChange}
              value={inputs.middlename ? inputs.middlename : ''}
            />
            <InputText
              type="text"
              name="lastname"
              label='Lastname'
              placeholder='Lastname ...'
              onChange={handleChange}
              value={inputs.lastname ? inputs.lastname : ''}
              required
            />
          </div>

          <div className="form-row break">
            <InputTextarea
              name="bio"
              label="Few words about you"
              onChange={handleChange}
              value={inputs.bio ? inputs.bio : ''}
            />

            <div>
              <InputSelect
                label='Gender'
                name="gender"
                onChange={handleChange}
                value={inputs.gender ? inputs.gender : ''}
              >
                <option value="null" default>Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </InputSelect>

              <InputText
                type="date"
                label='Birth date'
                name="birthday"
                onChange={handleChange}
                value={inputs.birthday ? inputs.birthday : ''}
              />

              <InputSelect
                label='Country'
                name="country_id"
                onChange={handleChange}
                value={inputs.country_id ? inputs.country_id : ''}
              >
                <option value="null" default>Select country</option>
                {
                  isLoadingCountries
                  ? null
                  : countries.map((country) => <option key={country.country_id} value={country.country_id}>{country.name}</option>)
                }
              </InputSelect>

              <InputSelect
                label='City'
                name="city_id"
                onChange={handleChange}
                value={inputs.city_id ? inputs.city_id : ''}
              >
                <option value="null" default>Select city</option>
                {
                  isLoadingCities
                  ? null
                  : cities.map((city) => <option key={city.city_id} value={city.city_id}>{city.name}</option>)
                }
              </InputSelect>
            </div>
          </div>

          <div className="form-row">
            <InputText
              type="email"
              name="email"
              label='Email'
              placeholder="Email ..."
              onChange={handleChange}
              value={inputs.email}
              required
            />
            <InputText
              type="text"
              name="username"
              label='Username'
              placeholder="Username ..."
              onChange={handleChange}
              value={inputs.username}
              required
            />
          </div>

          <div className="form-row">
            <InputText
              type="password"
              label="Password"
              name="password"
              placeholder="Password ..."
              onChange={handleChange}
              value={inputs.password ? inputs.password : ''}
            />
            <InputText
              type="password"
              label="Confirm Password"
              name="rePassword"
              placeholder="Re-Password ..."
              onChange={handleChange}
              value={inputs.rePassword ? inputs.rePassword : ''}
            />
          </div>

          <TextError error={error} />

          <Button onClick={updateUser}>Update</Button>
        </form>
      </Card>
    </div>

  )
}

export default UserUpdate