import { FC, useState } from 'react'
import SearchBar from './SearchBar'


const TradePage: FC = () => {
const [stockSearchInput, setStockSearchInput] = useState<string>('')
const [stockResultData, setStockResultData] = useState([])


    return (
<>

      <div>Trade</div>
      <SearchBar
      stockSearchInput={stockSearchInput}
      setStockSearchInput={setStockSearchInput}
      stockResultData={stockResultData}
      setStockResultData={setStockResultData}
      />
        
</>
    )
  }
  
  export default TradePage