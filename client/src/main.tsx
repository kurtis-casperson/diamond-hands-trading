import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import LoginPage from './components/Login/LoginPage.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    <LoginPage/>
    </BrowserRouter>
  </React.StrictMode>,
)
