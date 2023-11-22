import React from 'react'
import './login-page.scss'
import { Link } from 'react-router-dom'

function LoginPage() {
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
              <input type="email" name="email" id="email" placeholder="Email ..." />
            </div>
            <div>
              <input type="password" name="pwd" id="pwd" placeholder="Password ..." />
            </div>
            <div>
              <button>Log In</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default LoginPage