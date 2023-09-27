import { createContext } from 'react'
import { UserContextType, UserContext } from './types'

const getUser = localStorage.getItem('user')
const user = JSON.parse(getUser || '{}') || null

const UserContext = createContext<UserContextType>(user)

export const UserProvider = UserContext.Provider

export { UserContext }
