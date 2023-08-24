import NavBar from './components/NavBar/NavBar'
import HomePage from './components/HomePage/HomePage'
import TradePage from './components/TradePage/TradePage'
import Login from './components/Login/LoginPage'
import Portfolio from './components/Portfolio/Portfolio'
import { Route, Routes } from 'react-router-dom'
import { useState, createContext } from 'react'
import './App.css'

export const jwtContext = createContext()


function App() {
  const [user, setUser] = useState(null)

  return (
    <>
    <jwtContext.Provider value={user} >
      <NavBar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Login setUser={setUser}/>} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Trade" element={<TradePage user={user}/>} />
        <Route path="/Portfolio" element={<Portfolio />} />
      </Routes>
    </jwtContext.Provider>
  </>
  )
}

export default App
