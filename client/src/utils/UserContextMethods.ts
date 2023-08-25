import { createContext } from 'react'

export type UserContextType = {
  email: string
  password: string
  id: number
}

const jwtUserContext = createContext<UserContextType>({
  email: '',
  password: '',
  id: 0,
})

export { jwtUserContext }
