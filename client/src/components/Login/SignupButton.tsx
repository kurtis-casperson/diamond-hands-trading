import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type Props = {
  email: string
  password: string
  setErrorMessage: (value: string) => void
}

const SignupButton = ({ email, password, setErrorMessage }: Props) => {
  const navigate = useNavigate()
  const server = localStorage.getItem('server')
  const handleSignup = async (email: string, password: string, event: any) => {
    event.preventDefault()
    if (userValidation(email, password)) {
      try {
        let response = await axios.post(server + '/api/signup', {
          user_email: email,
          user_password: password,
        })
        if (response.status === 201) {
          setErrorMessage('you signed up successfully')
          navigate('/')
        }
      } catch (error: any) {
        if (error.response.status === 501) {
          setErrorMessage('signup error, user already exists')
        }
        if (error.response.status === 500) {
          setErrorMessage('server error, please try again')
        }
      }
    }
  }
  const userValidation = (email: string, password: string) => {
    if (!email) {
      setErrorMessage('Email is required')
      return false
    }
    if (email.includes(' ')) {
      setErrorMessage('Invalid Email, Remove Spaces')

      return false
    }
    if (!email.includes('@')) {
      setErrorMessage('Invalid Email')

      return false
    }
    if (!password) {
      setErrorMessage('Password Required')

      return false
    }
    if (password.includes(' ')) {
      setErrorMessage('Invalid Password, Remove Spaces')

      return false
    }
    return { status: true, msg: 'valid' }
  }

  return (
    <button
      className="bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
      onClick={(event) => handleSignup(email, password, event)}
    >
      Sign Up
    </button>
  )
}
export default SignupButton
