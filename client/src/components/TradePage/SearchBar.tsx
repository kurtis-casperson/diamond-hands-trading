
import StockTableHeader from "../TableComponents/StockTableHeader";
import axios from "axios";
type Props = {
    stockSearchInput: string
    setStockSearchInput: (value: string) => void
    stockResultData: { name: string; symbol: string}[]
    setStockResultData: React.Dispatch<React.SetStateAction<never[]>>
}

const SearchBar = ({setStockSearchInput,stockSearchInput, stockResultData, setStockResultData }: Props ) => {

const handleInputSearch = (e: any) => {
    setStockSearchInput(e.target.value)
    }
    
const fetchData =  async () => {

    try {
        const response = await axios.get(`/api/stock/search/${stockSearchInput}`)
        setStockResultData(response.data)
        console.log( 'response',response)
      } catch (error) {
  
        console.error(error)
      }


}




  return (
    <>
    <div className="content-center">
  
     <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-5 rounded-lg focus:outline-none"
      type="search" name="search" placeholder="Search a ticker or company" value={stockSearchInput}
      onChange={handleInputSearch}></input>
  <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-2 rounded-full"
  onClick={() => {
    fetchData()
    setStockSearchInput('')
  }}
  >
Search
</button>
</div>
<div>
<StockTableHeader
 stockResultData={stockResultData}
 
/>
</div>
</>
  )
}

export default SearchBar