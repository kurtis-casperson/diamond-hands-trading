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

export type PortfolioDataType = {
  tableData: {}
  sumData: {
    stockValue: number[]
    totalValue: number
    stockSymbol: number[]
  }
}
