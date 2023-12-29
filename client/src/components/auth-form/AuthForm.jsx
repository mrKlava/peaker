import './auth-form.scss'

function AuthForm({children, reverse=false}) {
  return (
    <main className='auth'>
      {
        reverse 
        ? <div className='auth-inner reverse'> {children} </div>
        : <div className='auth-inner'> {children} </div>
      }
    </main>
  )
}

export default AuthForm