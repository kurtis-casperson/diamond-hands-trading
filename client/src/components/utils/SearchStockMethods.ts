import axios from 'axios'

class StockDataMethods {
  searchStock = async (searchQuery: string) => {
    try {
      const response = await axios.get(`/api/stock/search/${searchQuery}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}
export default StockDataMethods
