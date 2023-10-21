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
      <div className="justify-center ">
        <h2 className="text-2xl font-bold text-center pt-20 text-black">
          Diamond Hand Trading
        </h2>
        <p className="text-gray-600 pt-10">
          Simulate your trades without the pressure of losing money!
          <br></br>
          Learn how to trade, without the risk!
        </p>
      </div>
      <div className="flex justify-center items-center h-screen bg-white row">
        <div className="col-md-3">
          <p>Start with 10000</p>
          <h4 className="text-green-600">Portfolio</h4>
        </div>
        <div>
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            jwtLogin={jwtLogin}
          />
        </div>
      </div>
    </>
  )
}

export default LoginPage
