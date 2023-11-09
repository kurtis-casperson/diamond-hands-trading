import './Login.css'
import LoginForm from './LoginForm'
import jwt from 'jwt-decode'
import { useState, useContext } from 'react'
import { UserContext } from '../../utils/UserContextMethods'

const LoginPage = () => {
  const userContext = useContext(UserContext)

  const setUser = userContext?.setUser

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const jwtLogin = (jwt_token: string) => {
    // decode the token
    const decoded: any = jwt(jwt_token)

    //set user state
    setUser(decoded)
  }

  return (
    <>
      <div className="justify-center ">
        <h2 className="text-4xl tracking-widest font-extrabold text-center pt-20 text-black">
          Diamond Hand Trading
        </h2>
        <p className="text-gray-600 pt-2 pb-10 mb-10">
          Simulate your trades without the pressure of losing money!
          <br></br>
          Learn how to trade, without the risk!
        </p>
      </div>
      <p className="text-2xl font-extrabold justify-center text-green-400 pb-10 ">
        We're giving you 100k to paper trade with!
      </p>
      <div className="flex justify-center h-screen bg-white row">
        <div className="col-md-3 text-left pt-15">
          <h4 className="text-green-600">Market News</h4>
          <p className="text-black">
            Stay plugged in with our market news updates{' '}
          </p>
          <h4 className="text-green-600">Portfolio</h4>
          <p className="text-black">
            Get an up-to-date view of your portfolio and track your progress{' '}
          </p>
          <h4 className="text-green-600">Trade</h4>
          <p className="text-black">
            Live price updates for your favorite stocks!{' '}
          </p>
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
