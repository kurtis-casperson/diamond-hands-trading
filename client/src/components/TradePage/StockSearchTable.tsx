



// why do I have errors using interface?
// export interface Props {
//   map(arg0: (symbol: any, name: any) => import("react/jsx-runtime").JSX.Element): unknown
//   stockResultData: { name: string; symbol: string}[]

//   // stockResultData: Object[]
//   setStockResultData: (value: string[]) => void

// }
type Props = {
  stockResultData: { name: string; symbol: string}[]
  
}
const StockSearchTable  = ({stockResultData}: Props) => {

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
  
  export default StockSearchTable
  