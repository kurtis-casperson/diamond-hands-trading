import axios from 'axios'

const searchStock = async (searchQuery: string) => {
  try {
    const response = await axios.get(`/api/stock/search/${searchQuery}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const fetchStockPrice = async (stockSymbol: string) => {
  try {
    const response = await axios.get(`/api/stock/price/${stockSymbol}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export { searchStock, fetchStockPrice }
