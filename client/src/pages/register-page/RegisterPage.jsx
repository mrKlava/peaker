import React, { useState } from 'react'
import axios from 'axios'
import { Button } from '../../UI'
import { Link } from 'react-router-dom'
import './register-page.scss'


function RegisterPage() {
  const [error, setError] = useState(null)
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    rePassword: "",
  })
   
  const handleChange = (e) => {
    setInputs( prev => ({
      ...prev, 
      [e.target.name]: e.target.value,
    }) )
  }

  const handleSubmit = async (e) => { 
    e.preventDefault()
    try {
      const resp = await axios.post("http://localhost:2280/api/auth/register", {...inputs, registered: new Date().toISOString()})

      console.log(resp)

    } catch (err) {
      console.log(err )
      setError(err.response.data)
    }
  }


  return (
    <main className='register'>
      <div className='card'>
      <div className='card-item'>
          <h1>Welcome</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper at lectus eu vulputate. Quisque laoreet neque ac felis accumsan molestie. Donec id ex velit. Cras nec est et purus maximus laoreet. Nulla sit amet facilisis ex, at tempus eros. Vivamus dictum enim ipsum, ac malesuada dolor auctor eu. Sed vel lacinia lectus</p>
          <p>Have account?</p>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
        <div className='card-item'>
          <h1>Register</h1>

          <form>
            <div>
              <input type="text" name="firstname" onChange={handleChange} value={inputs.firstname} placeholder="Name ..." />
              <input type="text" name="lastname" onChange={handleChange} value={inputs.lastname} placeholder="Surname ..." />
            </div>
            <div>
              <input type="email" name="email" onChange={handleChange} value={inputs.email} placeholder="Email ..." />
              <input type="text" name="username" onChange={handleChange} value={inputs.username} placeholder="Username ..." />
            </div>
            <div>
              <input type="password" name="password" onChange={handleChange} value={inputs.password} placeholder="Password ..." />
              <input type="password" name="rePassword" onChange={handleChange} value={inputs.rePassword} placeholder="Confirm Password ..." />
            </div>
            {
              error
              ? <h4 className="form-error">{error}</h4>
              : null
            }
            <div>
              <Button onClick={handleSubmit}>Register</Button>
            </div>
          </form>

        </div>
      </div>
    </main>
  )
}

export default RegisterPage