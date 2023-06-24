import NavBar from './components/NavBar/NavBar'
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
