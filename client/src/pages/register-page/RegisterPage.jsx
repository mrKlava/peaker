import { useState } from 'react'
import { httpRequest } from '../../axios'
import { Button, Card, InputText, Text, TextError, TitleMain, TitleSection } from '../../UI'
import { AuthForm } from '../../components'
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
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await httpRequest.post("http://localhost:2280/api/auth/register", { ...inputs, registered: new Date().toISOString() })
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <AuthForm reverse={true}>
      <div className='auth-item auth-intro'>
        <TitleMain>Time to join</TitleMain>
        <Text className="auth-item_text">Peaker is your place to connect with fellow adventurers, share your outdoor experiences, and discover new places to explore. Whether you're a seasoned hiker, a budding backpacker, or a casual camper, we've got something for everyone. Join the conversation, share your photos and videos, and find inspiration for your next adventure.</Text>
        <TitleSection className="auth-item_tile">Already have account?</TitleSection>
        <Link to='/login'>
          <Button>Login</Button>
        </Link>
      </div>
      <Card className='auth-item'>
        <TitleSection className="auth-item_tile">Register</TitleSection>
        <form className='auth-form'>

          <div className="form-row">
            <InputText
              type='text'
              name='firstname'
              placeholder='Firstname ...'
              onChange={handleChange}
              value={inputs.firstname}
            />
            <InputText
              type='text'
              name='lastname'
              placeholder='Lastname...'
              onChange={handleChange}
              value={inputs.lastname}
            />
          </div>

          <div className="form-row">
            <InputText
              type='email'
              name='email'
              placeholder='Email ...'
              onChange={handleChange}
              value={inputs.email}
            />
          </div>

          <div className="form-row">
            <InputText
              type='text'
              name='username'
              placeholder='Username ...'
              onChange={handleChange}
              value={inputs.username}
            />
          </div>

          <div className="form-row">
            <InputText
              type='password'
              name='password'
              placeholder='Password ...'
              onChange={handleChange}
              value={inputs.password}
            />
            <InputText
              type='password'
              name='rePasswordnp,'
              placeholder='Re-Password ...'
              onChange={handleChange}
              value={inputs.rePassword}
            />
          </div>

          <TextError error={error} />
          
          <div>
            <Button onClick={handleSubmit}>Register</Button>
          </div>
        </form>
      </Card>
    </AuthForm>
  )
}

export default RegisterPage