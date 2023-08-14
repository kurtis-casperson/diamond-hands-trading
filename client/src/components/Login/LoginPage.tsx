
import  { useState } from 'react';
import './Login.css';
import LoginForm from './LoginForm'
import Cookies from "universal-cookie"
import jwt from "jwt-decode"




const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
// initialize cookies package
  const cookies = new Cookies();

const logout = () => {
setUser(null);
cookies.remove("jwt_authorization");
}

const login = (jwt_token: string) => {

// decode the token
const decoded: any = jwt(jwt_token)

//set user state
setUser(decoded)

// set cookie
cookies.set("jwt_authorization", jwt_token, {
  expires: new Date(decoded.exp * 1000),
});

}



  return (
    <>
    <div className="flex justify-center items-center h-screen bg-green-500">
    <h2 className="text-2xl font-bold text-center text-black">Diamond Hand Trading</h2>
    <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} login={login} logout={logout} />
    </div>
    </>
  );
};

export default LoginPage;
