import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { httpRequest } from '../../axios'
import { Button, Card, InputSelect, InputText, InputTextarea, TextError, TitleMain } from '../../UI'
import { ReactComponent as IconClose } from '../../assets/images/icons/IconClose.svg'

import './user-update.scss'

function UserUpdate({ setIsUpdate, user }) {
  const queryClient = useQueryClient()

  const [ error, setError ] = useState(null)
  const [ coverImg, setCoverImg ] = useState(null)
  const [ profileImg, setProfileImg ] = useState(null)
  const [ inputs, setInputs ] = useState(user)

  /* Fetch Countries */

  const { isLoading: isLoadingCountries, data: countries } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["countries"],
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
    refetchOnWindowFocus: false,
    queryKey: ["cities", inputs.country_id],
    queryFn: async () => {
      try {
        const resp = await httpRequest.get("/cities/country?id=" + inputs.country_id)

        return resp.data

      } catch (err) {
        console.log(err)
      }
    }
  })

  /* Handle image */

  const handleImage = (e) => {
    const file = e.target.files[0]

    // check extension 
    if (file.type !== "image/jpeg") {
      setError("Image must be jpg")
      
      e.target.value = null;
      return null
    }
    
    // check if image is less than 4mb
    if (((file.size / 1024) / 1024).toFixed(4) > 4) {
      setError("Image can not be larger than 4mb")

      e.target.value = null;
      return null
    }

    return file
  }

  // const upload = async (file, e) => {
  //   e.preventDefault()

  //   try {
  //     const formData = new FormData()
  //     formData.append("file", file)

  //     console.log(formData)

  //     debugger
  //     const resp = await httpRequest.post("/upload/image", formData)

  //     console.log(resp.data)

  //     return resp.data

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const uploadProfileImg = async () => {
  //   try {
  //     const formData = new FormData()
  //     formData.append("file", profileImg)

  //     console.log(formData)

  //     const resp = await httpRequest.post("/upload/image", formData)

  //     console.log(resp.data)

  //     return resp.data

  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  // const handleUpload = async (e) => {
  //   e.preventDefault()

  //   debugger
  //   // let coverUrl = user.coverImg
  //   let profileUrl = ""

  //   // if (coverImg) coverUrl = await upload()
  //   // if (profileImg) profileUrl = await upload(profileImg, e)
  //   if (profileImg) profileUrl = await uploadProfileImg(e)
  // }

  /* Update user */

  const mutation = useMutation({
    mutationFn: (user) => {
      return httpRequest.put("/users", user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"])
      console.log('success')
    }
  })

  const handleChange = (e) => setInputs(prev => ({ ...prev, ...prepareInput(e) }))

  const prepareInput = (e) => {
    const key = e.target.name
    const value = e.target.value
   
    return {[key]: value}
  }

  const isError = () => {
    const required = ['firstname', 'lastname', 'email', 'username']

    for (const entry of Object.entries(inputs)) {
      if (required.includes(entry[0]) && !entry[1]) {
        setError(`${entry[0]} can not be empty`)

        return true
      }
    }

    return false
  }

  const updateUser = async (e) => {
    e.preventDefault()

    if (error) return

    if (inputs.firstname)

    try {
      mutation.mutate(inputs)

      setIsUpdate(false)
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    if (!isError()) setError(null)
  }, [inputs])

  /* DEBUG */

  useEffect(() => {
    console.log(profileImg)
  }, [profileImg])

  useEffect(() => {
    console.log(coverImg)
  }, [coverImg])

  useEffect(() => {
    console.log(user)
  }, [user])



  return (
    <div className="user-overlay">

      <Card className="user-update">
        <div className="user-update_close">
          <button onClick={() => setIsUpdate(false)}><IconClose /></button>
        </div>

        <TitleMain>Update Info</TitleMain>

        <div>
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
              <input type="file" id="profileImg" name="profileImg" accept="image/jpeg" onChange={(e) => setProfileImg(handleImage(e))} />
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
          {/* <Button onClick={handleUpload}>Upload</Button> */}
        </div>

        <form>

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
                label="Gender"
                name="gender"
                onChange={handleChange}
                value={inputs.gender ? inputs.gender : ''}
              >
                <option value="null" default>Select gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </InputSelect>

              <InputText
                type="date"
                label="Birth date"
                name="birthday"
                onChange={handleChange}
                value={inputs.birthday ? inputs.birthday : ''}
              />

              <InputSelect
                label="Country"
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
                label="City"
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
              label="Email"
              placeholder="Email ..."
              onChange={handleChange}
              value={inputs.email}
              required
            />
            <InputText
              type="text"
              name="username"
              label="Username"
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