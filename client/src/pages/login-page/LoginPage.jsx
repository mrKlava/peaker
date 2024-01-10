import { useContext, useEffect, useState } from "react"
import { Button, Card, InputText, Text, TextError, TitleMain, TitleSection } from "../../UI"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { AuthForm } from "../../components"


function LoginPage() {
  const { login } = useContext(AuthContext)

  const [ error, setError ] = useState(null)
  const [ inputs, setInputs ] = useState({ email: "", password: "" })

  /* Handle Inputs */

  // handle input change
  const handleChange = (e) => setInputs(prev => ({...prev, ...prepareInput(e) }))

  // prepare input object
  const prepareInput = (e) => {
    const key = e.target.name
    const value = e.target.value
   
    return {[key]: value}
  }

  // check if inputs are valid
  const isError = () => {
    const required = ["email", "password"]

    for (const entry of Object.entries(inputs)) {
      if (required.includes(entry[0]) && !entry[1]) {
        setError(`${entry[0]} can not be empty`)

        return true
      }
    }

    return false
  }

  // handle submit 
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isError()) return

    try {
      const resp = await login(inputs)
     setError(resp)
    } catch (err) {
      setError(err)
    }

    setInputs({
      email: "",
      password: ""
    })
  }

  useEffect(() => {
  }, [error])

  return (
    <div>

    <AuthForm>
      <div className="auth-item auth-intro">
        <TitleMain>Welcome</TitleMain>
        <Text className="auth-item_text">Peaker is your place to connect with fellow adventurers, share your outdoor experiences, and discover new places to explore. Whether you"re a seasoned hiker, a budding backpacker, or a casual camper, we"ve got something for everyone. Join the conversation, share your photos and videos, and find inspiration for your next adventure.</Text>
        <TitleSection className="auth-item_tile">Do not have account?</TitleSection>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </div>
      <Card className="auth-item">
        <TitleSection className="auth-item_tile">Login</TitleSection>
        <form className="auth-form">

          <InputText 
            type="email"
            name="email" 
            placeholder="Email..." 
            onChange={handleChange}
            value={inputs.email}
          />

          <InputText 
            type="password"
            name="password" 
            placeholder="Password..." 
            onChange={handleChange}
            value={inputs.password}
          />

          {
            error
              ? <TextError className="form-error" error={error} />
              : null
          }
          <div>
            <Button onClick={handleSubmit}>Login</Button>
          </div>
          
        </form>
      </Card>
    </AuthForm>

    </div>

  )
}

export default LoginPage