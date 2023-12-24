import axios from 'axios'

async function getMarketNews() {
  const server = localStorage.getItem('server')
  try {
    const response = await axios.get(server + '/api/marketNews')

    return response.data
  } catch (error) {
    console.error(error)
  }
}
export { getMarketNews }
