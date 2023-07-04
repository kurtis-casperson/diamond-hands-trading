

type Props = {
  stockResultData: { name: string; symbol: string}[]
  
}
const StockSearchTableRows  = ({stockResultData}: Props) => {

// make table rows selectable

    return (
      <>
        {stockResultData.map((stock, index) => (
          <tr key={index}>
            <td>{stock.name}</td>
            <td>{stock.symbol}</td>
           <td>
            <button
            // when button is clicked a trading modal appears
            
            ></button>
            </td>
          </tr>
        ))}
      </>
    )
  }
  
  export default StockSearchTableRows
  
  