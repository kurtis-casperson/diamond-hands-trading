import { createContext } from 'react'
import { UserContextType, UserContext } from './types'

const getUser: any = localStorage.getItem('user')
const user = getUser ? JSON.parse(getUser) : {}

const UserContext = createContext<UserContextType>(user)

export const UserProvider = UserContext.Provider

export { UserContext }
