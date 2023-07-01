import NavBar from './components/NavBar/NavBar'
import HomePage from './components/HomePage/HomePage'
import TradePage from './components/TradePage/TradePage'
import Login from './components/Login/Login'
import { Route, Routes } from 'react-router-dom'

import './App.css'

function App() {


  return (
    <>
    <div >
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Trade" element={<TradePage />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  </>
  )
}

export default App
