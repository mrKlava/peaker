import { useContext, useState } from 'react'
import { Button } from '../../UI'
import { Link } from 'react-router-dom'
import './login-page.scss'
import { AuthContext } from '../../context/authContext'

function LoginPage() {
  const [error, setError] = useState(null)
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs( prev => ({
      ...prev, 
      [e.target.name]: e.target.value,
    }) )
  }

  const handleSubmit = async (e) => { 
    e.preventDefault()
    
    try {
      await login(inputs)
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <main className='login'>
      <div className='card'>
        <div className='card-item'>
          <h1>Welcome</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras semper at lectus eu vulputate. Quisque laoreet neque ac felis accumsan molestie. Donec id ex velit. Cras nec est et purus maximus laoreet. Nulla sit amet facilisis ex, at tempus eros. Vivamus dictum enim ipsum, ac malesuada dolor auctor eu. Sed vel lacinia lectus</p>
          <p>Do not have account?</p>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className='card-item'>
          <h1>Login</h1>
          <form>
            <div>
              <input type="email" name="email" onChange={handleChange} value={inputs.email} placeholder="Email ..." />
              <input type="password" name="password" onChange={handleChange} value={inputs.password} placeholder="Password ..." />
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

export default LoginPage