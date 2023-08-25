import axios from 'axios'

const login = async (email: string, password: string) => {
  try {
    let response = await axios.post('/api/login', {
      user_email: email,
      user_password: password,
    })
    return response.data.token
  } catch (error) {
    console.error(error)
    if (error) {
      alert(`Oops.. check your login details, or singup to create an account`)
    }
  }
}

export { login }
