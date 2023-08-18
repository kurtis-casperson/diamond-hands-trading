
import axios from 'axios';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


type Props = {
    
    email: string;
    password: string
    jwtLogin: (jwt_token: string) => void;
    
}

const LoginButton = ({email,password, jwtLogin}: Props) => {


  const navigate = useNavigate(); 
  const handleLogin = async (email: string, password: string, event: any) => {
  
    event.preventDefault();
    if(userValidation(email, password)){
      try{
        let response =  await axios.post('/api/login', {
          user_email: email,
          user_password: password
          
        })
      
        jwtLogin(response.data.token)
    
        if(response.status == 200 ){

        navigate('/Home');
        
      } 
        }catch(error:any){
          console.error(error)
            if(error){
                alert(`Oops.. check your login details, or singup to create an account`)
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

    <button
    className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring mr-4"
    onClick={(event) => {handleLogin(email, password, event) }}
  >
    Login
  </button>

)
}
export default LoginButton