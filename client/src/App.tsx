import NavBar from './components/NavBar/NavBar'
import HomePage from './components/HomePage/HomePage'
import TradePage from './components/TradePage/TradePage'
import Login from './components/Login/LoginPage'
import Portfolio from './components/Portfolio/Portfolio'
import { UserContextType, UserContext } from '../src/utils/UserContextMethods'
import { Route, Routes } from 'react-router-dom'
import { useState, useContext } from 'react'
import './App.css'

function App() {
  // trying to replace this state with context
  // should createContext and useState have the same default values?

  const [user, setUser] = useState(useContext(UserContext))
  {
    /* <UserContext.Provider value={user} > */
  }

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <NavBar />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Trade" element={<TradePage />} />
          <Route path="/Portfolio" element={<Portfolio />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
