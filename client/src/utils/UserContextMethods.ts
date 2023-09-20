import { createContext } from 'react'

export type UserContext = {
  email: string
  password: string
  userID: number
  exp: number
}

export type UserContextType = {
  user: UserContext | null
  setUser: React.Dispatch<React.SetStateAction<UserContext | null>>
}

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = UserContext.Provider

export { UserContext }
