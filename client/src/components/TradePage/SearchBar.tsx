
import { FC } from "react"
import TickerSearchTable from "./TickerSearchTable"

export interface Props {
    // map(arg0: (symbol: any, name: any) => import("react/jsx-runtime").JSX.Element): unknown
    stockSearchInput: string
    setStockSearchInput: (value: string) => void
    stockResultData: { name: string; symbol: string}[]
    // setStockResultData: (value: string[]) => void

}


const SearchBar: FC<Props> = ({setStockSearchInput,stockSearchInput, stockResultData } ) => {


const handleInputSearch = (e: any) => {
    setStockSearchInput(e.target.value)
    }
    

  return (
    <>
    <div className="content-center">
  
     <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-5 rounded-lg focus:outline-none"
      type="search" name="search" placeholder="Search a ticker or company" value={stockSearchInput}
      onChange={handleInputSearch}></input>
  <button className="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-2 rounded-full">
Search
</button>
</div>
<div>
<TickerSearchTable 
 stockResultData={stockResultData}
 
/>
</div>
</>
  )
}

export default SearchBar