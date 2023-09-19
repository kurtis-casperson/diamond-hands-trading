import { createContext } from 'react'

export type UserContext = {
  email: string
  password: string
  id: number
  exp: number
}

export type UserContextType = {
  user: UserContext | null
  setUser: React.Dispatch<React.SetStateAction<UserContextType | null>>
}

const UserContext = createContext<UserContextType | null>(null)

export { UserContext }
