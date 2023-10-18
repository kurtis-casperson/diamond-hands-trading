import './Login.css'
import LoginForm from './LoginForm'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import { useState, useContext } from 'react'
import { UserContext } from '../../utils/UserContextMethods'

const LoginPage = () => {
  const userContext = useContext(UserContext)
  const setUser = userContext?.setUser

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // initialize cookies package
  const cookies = new Cookies()

  const jwtLogin = (jwt_token: string) => {
    // decode the token
    const decoded: any = jwt(jwt_token)

    //set user state
    setUser(decoded)

    // set cookie
    cookies.set('jwt_authorization', jwt_token, {
      expires: new Date(decoded.exp * 1000),
    })
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-white">
        <h2 className="text-2xl font-bold text-center text-black">
          Diamond Hand Trading
        </h2>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          jwtLogin={jwtLogin}
        />
      </div>
    </>
  )
}

export default LoginPage
