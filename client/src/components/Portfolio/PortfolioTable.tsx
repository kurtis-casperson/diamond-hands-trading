
import { Table } from 'react-bootstrap'

type Props = {
  stockResultData: { name: string; symbol: string}[]
  
}

const PortfolioTable = ({ stockResultData }: Props) => {
  return (
    <>
      <Table id="tableCharacterData" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
        {stockResultData.map((stock, index) => (
          <tr key={index}>
            <td>{stock.name}</td>
            <td>{stock.symbol}</td>
           <td>
           
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </>
  )
}

export default PortfolioTable
