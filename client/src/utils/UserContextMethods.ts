import { createContext } from 'react'
import { UserContextType, UserContext } from './types'

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = UserContext.Provider

export { UserContext }
