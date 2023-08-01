// import {EventHandler } from 'react'
import axios from 'axios';




type Props = {
    // EventHandler:  React.SyntheticEvent<any, Event> = (event: E) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string
    setPassword: (value: string) => void;
}

// Need to add an ID to each user when added to DB... is this done on server

const LoginForm = ({email,setEmail,password,setPassword }: Props) => {
   

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
    
   }

   function handlePasswordChange(event:  React.ChangeEvent<HTMLInputElement>) {
   setPassword(event.target.value)
     
    }

 
    const handleLogin = async (email: string, password: string) => {

      try{
    let response =  await axios.post('/api/login', {
user_email: email,
user_password: password

    })
    console.log(response.data)
    console.log(' email:', email, ' password:', password);

      }catch(error){
console.log('login error', error)
      }
    };
  
    const handleSignup = async (email: string, password: string, event: any) => {
      event.preventDefault();
      debugger
      if(userValidation(email, password)){
      try{
        let response =  await axios.post('/api/signup', {
          user_email: email,
          user_password: password
          
        })
        
        console.log('response',response)
      } catch(error: any){
        if(error.response.status === 501){
          alert('signup error')
        }
    
      }
      
    };

  }
const userValidation = (email: string, password: string) => {
  if (!email) {
    return false
   
  }
  if (email.includes(' ')) {
    return false
    // {status: false, msg:'Please remove all spaces from the email' };
  }
  if(!email.includes('@')) {
    console.log('error')
    return false
    // {status: false, msg:'Please enter a standard email format' };
  }
  if (!password) {
    return false
    // {status: false, msg: 'Please provide a password'};
  }
  if (password.includes(' ')) {
      return false
      //  {status: false, msg: 'Please remove all spaces from the password' };
    }
  return {status: true, msg: 'valid' };
}
     


return(
<div className="bg-white p-8 rounded shadow-md w-96">
<form>
  <div className="mb-4">
    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
    <input
      type="email"
      id="email"
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-black"
      value={email}
      onChange={handleEmailChange}
      required
    />
  </div>
  <div className="mb-4">
    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
    <input
      type="password"
      id="password"
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-black"
      value={password}
      onChange={handlePasswordChange}
      required
    />
  </div>
  <div className="flex justify-center">
    <button
      className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring mr-4"
      onClick={() => handleLogin(email, password)}
    >
      Login
    </button>
    <button
      className="bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
      onClick={() => handleSignup(email, password, event)}
    >
      Sign Up
    </button>
  </div>
</form>
</div>
)
}
export default LoginForm