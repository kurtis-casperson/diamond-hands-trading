import NavBar from './components/NavBar/NavBar'
import HomePage from './components/HomePage/HomePage'
import Trade from './components/Trade/Trade'
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
        <Route path="/Trade" element={<Trade />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  </>
  )
}

export default App
