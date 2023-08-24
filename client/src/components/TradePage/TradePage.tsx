import { FC, useState } from 'react'
import SearchBar from './SearchBar'
import StockTableHeader from '../TableComponents/StockTableHeader'



const TradePage: FC = () => {
const [searchQuery, setSearchQuery] = useState<string>('')
const [stockResultData, setStockResultData] = useState([])
const [portfolioValue, setPortfolioValue] = useState(100000)

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