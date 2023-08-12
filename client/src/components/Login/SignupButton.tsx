
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {
    
    email: string;
    password: string
  
}



const SignupButton = ({email,password }: Props) => {
  const navigate = useNavigate(); 
  
    const handleSignup = async (email: string, password: string, event: any) => {
      event.preventDefault();
      if(userValidation(email, password)){
      try{
        let response =  await axios.post('/api/signup', {
          user_email: email,
          user_password: password
          
        })
        if(response.status === 201){
          alert('success, you signed up successfully')
          navigate('/Home');
        }
       
      } catch(error: any){
        if(error.response.status === 501){
          alert('signup error, user already exists')
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

    <button
      className="bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
      onClick={(event) => handleSignup(email, password, event)}
    >
      Sign Up
    </button>

)
}
export default SignupButton