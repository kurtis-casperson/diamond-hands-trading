import './Login.css'
import LoginForm from './LoginForm'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import { useState, useContext, useEffect } from 'react'
import { UserContextType, UserContext } from '../../utils/UserContextMethods'

const LoginPage = () => {
  const [user, setUser] = useState(useContext(UserContext))

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // set up useeffect to watch user value

  // initialize cookies package
  const cookies = new Cookies()
  console.log('LoginUser', user)

  //     jwtLogin()

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

  useEffect(() => {
    console.log('login effect', user)
  }, [user])

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-green-500">
        <h2 className="text-2xl font-bold text-center text-black">
          Diamond Hand Trading
        </h2>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          jwtLogin={jwtLogin}
          user={user}
        />
      </div>
    </>
  )
}

export default LoginPage
