import { createContext } from 'react'

export type UserContextType = {
  email: string
  password: string
  id: number
}

const UserContext = createContext<UserContextType | null>(null)

export { UserContext }
