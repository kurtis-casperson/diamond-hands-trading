import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../utils/UserContextMethods'
import MarketNewsTable from './MarketNewsTable'
import { getMarketNews } from '../../utils/MarketNewsMethods'
import PieChart from '../Charts/PieChart'
import { PortfolioDataType } from '../../utils/types'

const HomePage = () => {
  const userContext = useContext(UserContext)
  const userId = userContext?.user?.userID
  const [marketNews, setMarketNews] = useState([])
  const [portfolioValue, setPortfolioValue] = useState<number>()
  const [holdings, setHoldings] = useState<PortfolioDataType>()

  useEffect(() => {
    const fetchMarketNews = async () => {
      const marketNews = await getMarketNews()
      setMarketNews(marketNews)
    }
    fetchMarketNews()
    getPortfolioValue(userId)
  }, [])

  const getPortfolioValue = async (userId: number | undefined) => {
    const response = await axios.post(`/api/stock_data/`, {
      userId: userId,
    })
    const cashResponse = await axios.post(`/api/get_cash/`, {
      userId: userId,
    })

    const cash: any = cashResponse.data.rows[0].available_cash
    const getPortfolioStocks: PortfolioDataType = response.data
    const totalStockValue = getPortfolioStocks.sumData.totalValue
    const totalPortfolioValue = totalStockValue + Number(cash)
    setPortfolioValue(totalPortfolioValue)
    setHoldings(getPortfolioStocks)
  }

  const marketNewsTable = marketNews.map((news) => {
    return <MarketNewsTable key={news['id']} news={news} />
  })

  const renderPieChart = () => {
    return holdings ? <PieChart holdings={holdings} /> : <></>
  }

  return (
    <>
      <h3 className="text-gray-600  text-left pl-10">
        News that's leading the Market
      </h3>
      <div id="newsTable" className="grid lg:grid-cols-4 gap-10 p-6 text-left ">
        {marketNewsTable}
      </div>
      <div className="flex text-center justify-center mt-20">
        <h3 className="text-gray-600 pr-2 ">Portfolio Value </h3>
        <h3 className="text-green-600  ">{portfolioValue?.toFixed(2)}</h3>
      </div>
      <div>{renderPieChart()}</div>
    </>
  )
}

export default HomePage
