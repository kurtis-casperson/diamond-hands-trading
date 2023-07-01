import { FC, useState } from 'react'
import SearchBar from './SearchBar'


const TradePage: FC = () => {
const [stockSearchInput, setStockSearchInput] = useState<string>('')
const [stockResultData, setStockResultData] = useState([])


// when the submit button is clicked the request is made for the ticker symbol





// select a symbol, and a modal appears to be able to trade the stock




    return (
<>

      <div>Trade</div>
      <SearchBar
      stockSearchInput={stockSearchInput}
      setStockSearchInput={setStockSearchInput}
      stockResultData={stockResultData}
      // setStockResultData={setStockResultData}
      />
        
</>
    )
  }
  
  export default TradePage