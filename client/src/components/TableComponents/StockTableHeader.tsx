import StockSearchTableRows from './StockSearchTableRows'
import { Table } from 'react-bootstrap'

type Props = {
  stockResultData: { name: string; symbol: string}[]
  
}

const StockTableHeader = ({ stockResultData }: Props) => {
  return (
    <>
      <Table id="tableCharacterData" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Trade</th>
          </tr>
        </thead>

        <tbody>
          <StockSearchTableRows stockResultData={stockResultData} />
        </tbody>
      </Table>
    </>
  )
}

export default StockTableHeader
