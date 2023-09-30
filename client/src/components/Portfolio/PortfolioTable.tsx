import { Table } from 'react-bootstrap'
import { TableData } from './type'
// import { PortfolioTableRows } from './PortfolioTableRows.tsx'
type Props = {
  tableData: TableData
}

const PortfolioTable = ({ tableData }: Props) => {
  return (
    <>
      <Table id="tableCharacterData" striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company</th>
            <th>Shares</th>
            <th>Value</th>
            <th>Change +/-</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((portfolioData: string | number, index) => (
            <tr key={index}>
              <td>{portfolioData.symbol}</td>
              <td>{portfolioData.company}</td>
              <td>{portfolioData.shares}</td>
              <td>{portfolioData.amount}</td>
              <td></td>
            </tr>
          ))}
          {/* <PortfolioTableRows tableData={tableData} /> */}
        </tbody>
      </Table>
    </>
  )
}

export default PortfolioTable
