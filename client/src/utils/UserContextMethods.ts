import { createContext } from 'react'
import { UserContextType, UserContext } from './types'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'

// const cookies = new Cookies()
// const decodedUserCookie: any = jwt(cookies.get('jwt_authorization'))

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = UserContext.Provider

export { UserContext }
