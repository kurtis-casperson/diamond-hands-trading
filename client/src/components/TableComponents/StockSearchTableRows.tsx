
import TradeModal from "../TradeModal/TradeModal";

type Props = {
  stockResultData: { name: string; symbol: string}[]
}
const StockSearchTableRows  = ({stockResultData}: Props) => {
  

    return (
      <>
        {stockResultData.map((stock, index) => (
          <tr key={index}>
            <td>{stock.name}</td>
            <td>{stock.symbol}</td>
           <td>
            {/* <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-2 rounded-full"
            // when button is clicked a trading modal appears
            // how to make a modal appear 
            onClick={() => {setShow(true), console.log('click')}}
            ></button>
            {show && <TradeModal/>} */}
            {<TradeModal stockSymbol={stock.symbol}/>}
            </td>
          </tr>
        ))}
      </>
    )
  }
  
  export default StockSearchTableRows
  
  