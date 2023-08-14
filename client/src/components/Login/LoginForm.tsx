import SignupButton from './signupButton';
import LoginButton from './LoginButton';


type Props = {
    // EventHandler:  React.SyntheticEvent<any, Event> = (event: E) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string
    setPassword: (value: string) => void;
    login: (jwt_token: string) => void;
    logout: () => void;
}

// Need to add an ID to each user when added to DB... is this done on server

const LoginForm = ({email,setEmail,password,setPassword, login, logout }: Props) => {
   

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
    
   }

   function handlePasswordChange(event:  React.ChangeEvent<HTMLInputElement>) {
   setPassword(event.target.value)
     
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
  {<LoginButton email={email} password={password} login={login} logout={logout} />}
 
  {<SignupButton email={email} password={password}/>}
  </div>
</form>
</div>
)
}
export default LoginForm