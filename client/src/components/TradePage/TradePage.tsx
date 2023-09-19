import { FC, useState } from 'react'
import SearchBar from './SearchBar'
import StockTableHeader from '../TableComponents/StockTableHeader'
import { UserContext } from '../../utils/UserContextMethods'
import { useContext } from 'react'

const TradePage: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [stockResultData, setStockResultData] = useState([])
  const [portfolioValue, setPortfolioValue] = useState(100000)
  const userContext = useContext(UserContext)

  console.log(userContext, ' context trade page')

  return (
    <>
      <div>Trade</div>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        stockResultData={stockResultData}
        setStockResultData={setStockResultData}
      />
      <StockTableHeader
        stockResultData={stockResultData}
        portfolioValue={portfolioValue}
        setPortfolioValue={setPortfolioValue}
      />
    </>
  )
}

export default TradePage
