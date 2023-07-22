
import  { useState } from 'react';
import './Login.css';
import LoginForm from './LoginForm'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-green-500">
    <h2 className="text-2xl font-bold text-center text-black">Diamond Hand Trading</h2>
    <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword}  />
    </div>
    </>
  );
};

export default LoginPage;
