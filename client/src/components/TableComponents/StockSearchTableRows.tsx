
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
            <TradeModal stockSymbol={stock.symbol}/>
            </td>
          </tr>
        ))}
      </>
    )
  }
  
  export default StockSearchTableRows
  
  