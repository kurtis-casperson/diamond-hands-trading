
import TradeModal from "../TradeModal/TradeModal";

type Props = {
  stockResultData: { name: string; symbol: string}[]
  portfolioValue: number
  setPortfolioValue: (value: number) => void
}
const StockSearchTableRows  = ({stockResultData, portfolioValue, setPortfolioValue }: Props) => {
  

    return (
      <>
        {stockResultData.map((stock, index) => (
          <tr key={index}>
            <td>{stock.name}</td>
            <td>{stock.symbol}</td>
           <td>
            <TradeModal stockSymbol={stock.symbol} portfolioValue={portfolioValue} setPortfolioValue={setPortfolioValue}/>
            </td>
          </tr>
        ))}
      </>
    )
  }
  
  export default StockSearchTableRows
  
  