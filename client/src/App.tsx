import NavBar from './components/NavBar/NavBar'
import HomePage from './components/HomePage/HomePage'
import TradePage from './components/TradePage/TradePage'
import Login from './components/Login/LoginPage'
import Portfolio from './components/Portfolio/Portfolio'
// import { UserContextType, jwtUserContext } from '../src/utils/userContextMethods'
import { Route, Routes } from 'react-router-dom'
import { useState, useContext } from 'react'
import './App.css'


function App() {
  // trying to replace this state with context
  // should createContext and useState have the same default values?
const [user, setUser] = useState(null)
// const userfunc = (user: UserContextType) => {}

  return (
    <>
    {/* <jwtUserContext.Provider value={user} > */}
      <NavBar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Login setUser={setUser}/>} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Trade" element={<TradePage user={user}/>} />
        <Route path="/Portfolio" element={<Portfolio />} />
      </Routes>
    {/* </jwtUserContext.Provider> */}
  </>
  )
}

export default App
