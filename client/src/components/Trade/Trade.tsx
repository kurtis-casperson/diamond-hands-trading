import { useState } from 'react'


const Trade = () => {
const [stockSearch, setStockSearch] = useState('')

const handleInputSearch = (e: any) => {
setStockSearch(e.target.value)
}


// when the submit button is clicked the request is made for the ticker symbol






// select a symbol, and a modal appears to be able to trade the stock




    return (
<>

      <div>Trade</div>
      <div className="content-center">
        {/* <input
          id="searchBar"
          type="input"
          placeholder="Search a ticker or company"
          name="searchBar"
          value={stockSearch}
          onChange={handleInputSearch}
        ></input> */}
         <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-5 rounded-lg focus:outline-none"
          type="search" name="search" placeholder="Search a ticker or company" value={stockSearch}
          onChange={handleInputSearch}></input>
      <button className="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-2 rounded-full">
  Search
</button>
</div>
</>
    )
  }
  
  export default Trade