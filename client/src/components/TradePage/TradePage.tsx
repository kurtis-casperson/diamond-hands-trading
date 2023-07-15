import { FC, useState } from 'react'
import SearchBar from './SearchBar'
import StockTableHeader from '../TableComponents/StockTableHeader'


const TradePage: FC = () => {
const [stockSearchInput, setStockSearchInput] = useState<string>('')
const [stockResultData, setStockResultData] = useState([])
const [portfolioValue, setPortfolioValue] = useState(100000)

    return (
<>

      <div>Trade</div>
      <SearchBar
      stockSearchInput={stockSearchInput}
      setStockSearchInput={setStockSearchInput}
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