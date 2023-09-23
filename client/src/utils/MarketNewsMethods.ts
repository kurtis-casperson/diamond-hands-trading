import axios from 'axios'

async function getMarketNews() {
  try {
    const response = await axios.get('/api/marketNews')

    return response.data
  } catch (error) {
    console.error(error)
  }
}
export { getMarketNews }
