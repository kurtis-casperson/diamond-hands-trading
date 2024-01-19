import NavBar from './components/NavBar/NavBar'
import HomePage from './components/HomePage/HomePage'
import TradePage from './components/TradePage/TradePage'
import Login from './components/Login/LoginPage'
import Portfolio from './components/Portfolio/Portfolio'
import ProtectedRoute from './components/PrivateRoutes/ProtectedRoute'
import { UserContext, UserProvider } from '../src/utils/UserContextMethods'
import { Route, Routes } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import './App.css'

function App() {
  const user = useContext(UserContext)
  // const server = 'http://diamond-hand-trading.com:4321'
  const server = 'http://localhost:4321'
  // const [user, setUser] = useState(userContext ? userContext.user : null)

  useEffect(() => {
    // localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('server', server)
  }, [user])

  return (
    <>
      <UserProvider value={user}>
        <NavBar />

        <Routes>
          {<Route path="/" element={<Login />} />}
          <Route
            path="/Home"
            element={
              <ProtectedRoute user={user}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Trade"
            element={
              <ProtectedRoute user={user}>
                <TradePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Portfolio"
            element={
              <ProtectedRoute user={user}>
                <Portfolio />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
