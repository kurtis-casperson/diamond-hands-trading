import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MarketNewsTable from './MarketNewsTable'
import { UserContext } from '../../utils/UserContextMethods'
import { useContext } from 'react'

const HomePage = () => {
  const [marketNews, setMarketNews] = useState([])
  const userContext = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
    async function getMarketNews() {
      try {
        const response = await axios.get('/api/marketNews')

        setMarketNews(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getMarketNews()
  }, [])
  console.log(userContext, ' context home page')
  const marketNewsTable = marketNews.map((news) => {
    return <MarketNewsTable key={news['id']} news={news} />
  })

  return (
    <>
      <div>HomePage</div>
      <h3 className="text-gray-600  text-left pl-10">
        News that's leading the Market
      </h3>
      <div id="newsTable" className="grid lg:grid-cols-4 gap-10 p-6 text-left ">
        {marketNewsTable}
      </div>
      <button
        className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring mr-4"
        onClick={() => {
          navigate('/Trade')
        }}
      >
        Navigate
      </button>
    </>
  )
}

export default HomePage
