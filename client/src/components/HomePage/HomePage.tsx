import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../utils/UserContextMethods'
import MarketNewsTable from './MarketNewsTable'
import { getMarketNews } from '../../utils/MarketNewsMethods'

const HomePage = () => {
  const userContext = useContext(UserContext)
  const userId = userContext?.user?.userID
  const [marketNews, setMarketNews] = useState([])
  const [portfolioValue, setPortfolioValue] = useState<any>()

  let stockPrices: any

  useEffect(() => {
    const fetchMarketNews = async () => {
      const marketNews = await getMarketNews()
      setMarketNews(marketNews)
    }
    fetchMarketNews()
    getPortfolioValue(userId)
  }, [])

  const getPortfolioValue = async (userId: number | undefined) => {
    const res = await axios.post(`/api/portfolio_value/`, {
      userId: userId,
    })
    const getPortfolioStocks: any = res.data.rows

    let sum = 0
    for (const arr of getPortfolioStocks) {
      const symbol = arr.symbol
      const numberShares = arr.shares

      stockPrices = await axios.get(`/api/stock/price/${symbol}`)

      const totalStockValue = stockPrices.data * numberShares
      sum += totalStockValue
    }
    setPortfolioValue(sum.toFixed(2))
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
      <div className="flex text-center justify-center">
        <h3 className="text-black pr-2 ">Portfolio Value: </h3>
        <h3 className="text-green-600  ">{portfolioValue}</h3>
      </div>
    </>
  )
}

export default HomePage
