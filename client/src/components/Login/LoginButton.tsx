
import axios from 'axios';

type Props = {
    
    email: string;
    password: string
  
}



const LoginButton = ({email,password }: Props) => {
   
// TODO
// check password against password in db
  
    const handleLogin = async (email: string, password: string, event: any) => {
        event.preventDefault();
        if(userValidation(email, password)){
        try{
      let response =  await axios.post('/api/login', {
        user_email: email,
        // user_password: password
  
      })
      
      if(response.status === 200){
        // redirect to homepage 
        alert('success')
      }
  
        }catch(error:any){
            if(error.response.status === 501){
                alert(`Hey you! you're new! please signup and try again`)
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
    onClick={(event) => handleLogin(email, password, event)}
  >
    Login
  </button>

)
}
export default LoginButton