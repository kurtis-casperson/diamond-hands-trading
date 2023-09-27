import NavBar from './components/NavBar/NavBar'
import HomePage from './components/HomePage/HomePage'
import TradePage from './components/TradePage/TradePage'
import Login from './components/Login/LoginPage'
import Portfolio from './components/Portfolio/Portfolio'
import { UserContext, UserProvider } from '../src/utils/UserContextMethods'
import { Route, Routes } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import './App.css'

function App() {
  const userContext = useContext(UserContext)

  const [user, setUser] = useState(userContext ? userContext.user : null)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <>
      <UserProvider value={{ user, setUser }}>
        <NavBar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Trade" element={<TradePage />} />
          <Route path="/Portfolio" element={<Portfolio />} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
