import { FC } from "react"



// why do I have errors using interface?
export interface Props {
  map(arg0: (symbol: any, name: any) => import("react/jsx-runtime").JSX.Element): unknown
  stockResultData: { name: string; symbol: string}[]

  // stockResultData: Object[]
  // setStockResultData: (value: string[]) => void

}
type NewProps = {
  stockResultData: { name: string; symbol: string}[]
  // setStockResultData: (value: string[]) => void

}
const TickerSearchTable  = ({stockResultData}: NewProps) => {

// make table rows selectable

    return (
      <>
        {stockResultData.map((stock, index) => (
          <tr key={index}>
            <td>{stock.name}</td>
            <td>{stock.symbol}</td>
           <td>
            <button
            
            
            ></button>
            </td>
          </tr>
        ))}
      </>
    )
  }
  
  export default TickerSearchTable
  