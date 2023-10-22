import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../utils/UserContextMethods'
import MarketNewsTable from './MarketNewsTable'
import { getMarketNews } from '../../utils/MarketNewsMethods'

const HomePage = () => {
  const userContext = useContext(UserContext)
  const userId = userContext?.user?.userID
  const [marketNews, setMarketNews] = useState([])
  const [portfolioValue, setPortfolioValue] = useState(100000)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMarketNews = async () => {
      const marketNews = await getMarketNews()
      setMarketNews(marketNews)
    }
    fetchMarketNews()
    getPortfolioValue(userId)
  }, [])

  const getPortfolioValue = async (userId: number | undefined) => {
    // debugger
    const res = await axios.post(`/api/portfolio_value/`, {
      userId: userId,
    })
    const getPortfolioStocks: any = res.data.rows
    const getNumberShares: number = res.data.rows

    getPortfolioStocks.map(async (arr: any) => {
      const symbol = arr.symbol
      const apiUrl = await axios.get(`/api/stock/price/${symbol}`)
      console.log('apiUrl', [apiUrl.data])
    })

    console.log('portfolio stock response', getPortfolioStocks)
    console.log('# shares response', getNumberShares)

    // setPortfolioValue(getportfolioStocks)
  }

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
