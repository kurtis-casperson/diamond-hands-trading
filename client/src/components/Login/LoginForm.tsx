



type Props = {
    email: string;
    setEmail: (value: string) => void;
    password: string
    setPassword: (value: string) => void;
}

// Need to add an ID to each user when added to DB... is this done on server

const LoginForm = ({email,setEmail,password,setPassword }: Props) => {
   

    
    const handleLogin = (email: string, password: string) => {
      // event.preventDefault();
      // Handle login logic here
      console.log(' email:', email, ' password:', password);
    };
  
    const handleSignup = ({email, password}: Props) => {
      // event.preventDefault();
      // Handle signup logic here
      // post request with email and password
      console.log('signup email:', email, 'signup password:', password);
    };


    function handleEmailChange(event: any) {
       setEmail(event.target.value)
       
      }

      function handlePasswordChange(event: any) {
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
    <button
      className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring mr-4"
      onClick={handleLogin}
    >
      Login
    </button>
    <button
      className="bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
      onClick={handleSignup}
    >
      Sign Up
    </button>
  </div>
</form>
</div>
)
}
export default LoginForm