import NavBar from './components/NavBar/NavBar'
import HomePage from './components/HomePage/HomePage'
import TradePage from './components/TradePage/TradePage'
import Login from './components/Login/LoginPage'
import Portfolio from './components/Portfolio/Portfolio'
import { Route, Routes } from 'react-router-dom'

import './App.css'


function App() {

// I want to conditionally render the nav bar to only show on pages that are 
// not the login page
// or just easier to return on each page?
  return (
    <>
    <div >
      <NavBar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Trade" element={<TradePage />} />
        <Route path="/Portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  </>
  )
}

export default App
