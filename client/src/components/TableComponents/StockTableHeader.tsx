import StockSearchTableRows from './StockSearchTableRows'
import { Table } from 'react-bootstrap'

type Props = {
  stockResultData: { name: string; symbol: string}[]
  portfolioValue: number
  setPortfolioValue: (value: number) => void
}

const StockTableHeader = ({ stockResultData, portfolioValue, setPortfolioValue }: Props) => {
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
          <StockSearchTableRows stockResultData={stockResultData} portfolioValue={portfolioValue} setPortfolioValue={setPortfolioValue}  />
        </tbody>
      </Table>
    </>
  )
}

export default StockTableHeader
