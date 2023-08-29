import axios from 'axios'

const login = async (email: string, password: string, jwtLogin: any) => {
  try {
    let response = await axios.post('/api/login', {
      user_email: email,
      user_password: password,
    })
    console.log(jwtLogin(response.data.token))
    return jwtLogin(response.data.token)
  } catch (error) {
    console.error(error)
    if (error) {
      alert(`Oops.. check your login details, or singup to create an account`)
    }
  }
}

export { login }
